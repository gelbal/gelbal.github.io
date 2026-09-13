# ABOUTME: Audits the generated Jekyll site for routing, metadata, and accessibility regressions.
# ABOUTME: Writes a Kosh-shaped severity report and fails the build when any check fails.
# frozen_string_literal: true

require "cgi"
require "fileutils"
require "find"
require "json"
require "nokogiri"
require "pathname"
require "time"
require "uri"

ROOT_DIR = File.expand_path("..", __dir__)
DEFAULT_SITE_DIR = File.join(ROOT_DIR, "_site")
SEVERITIES = %w[critical high medium low].freeze
# Pages whose footer omits the search trigger, matching the condition in _layouts/default.html.
FOOTER_SEARCH_EXEMPT_PAGES = %w[/about/ /search/].freeze

def add_issue(issues, severity, category, message, page)
  issues.fetch(severity) << {
    "category" => category,
    "issue" => message,
    "impact" => "The generated site would publish a user-facing or machine-readable regression.",
    "device" => "both",
    "pages" => [page]
  }
end

def page_url(site_dir, file)
  relative = Pathname(file).relative_path_from(Pathname(site_dir)).to_s
  return "/" if relative == "index.html"

  "/#{relative.sub(%r{/index\.html\z}, "/")}"
end

def target_exists?(site_dir, raw_url)
  uri = URI.parse(raw_url)
  return true if uri.host || uri.path.nil? || uri.path.empty? || !uri.path.start_with?("/")

  path = CGI.unescape(uri.path).delete_prefix("/")
  return false if path.split("/").include?("..")

  candidates = [File.join(site_dir, path)]
  candidates << File.join(site_dir, path, "index.html")
  candidates << File.join(site_dir, "#{path}.html") if File.extname(path).empty?
  candidates.any? { |candidate| File.file?(candidate) }
rescue URI::InvalidURIError
  false
end

args = ARGV.dup
site_dir = File.expand_path(args.first&.start_with?("--") ? DEFAULT_SITE_DIR : (args.shift || DEFAULT_SITE_DIR))
report_index = args.index("--report")
report_path = report_index ? File.expand_path(args.fetch(report_index + 1), ROOT_DIR) : nil
issues = SEVERITIES.to_h { |severity| [severity, []] }
visited_pages = []

unless File.directory?(site_dir)
  warn "Site directory does not exist: #{site_dir}"
  exit 1
end

Dir.glob(File.join(site_dir, "**", "*.html")).sort.each do |file|
  document = Nokogiri::HTML(File.read(file, encoding: "utf-8"))
  url = page_url(site_dir, file)
  visited_pages << { "url" => url, "title" => document.at_css("title")&.text.to_s }

  h1_count = document.css("h1").length
  add_issue(issues, "high", "Accessibility", "Expected one h1; found #{h1_count}.", url) unless h1_count == 1

  heading_levels = document.css("h1,h2,h3,h4,h5,h6").map { |heading| heading.name.delete_prefix("h").to_i }
  if heading_levels.each_cons(2).any? { |current, following| following > current + 1 }
    add_issue(issues, "medium", "Accessibility", "Heading hierarchy skips a level.", url)
  end

  ids = document.css("[id]").map { |node| node["id"] }
  duplicate_ids = ids.tally.select { |_id, count| count > 1 }.keys
  unless duplicate_ids.empty?
    add_issue(issues, "high", "Accessibility", "Duplicate IDs: #{duplicate_ids.join(", ")}.", url)
  end

  document.css("img").each do |image|
    add_issue(issues, "medium", "Accessibility", "Image is missing an alt attribute.", url) unless image.key?("alt")
  end

  dialog_ids = document.css('[role="dialog"]').map { |dialog| dialog["id"] }.compact
  document.css("[data-search-trigger]").each do |trigger|
    next if trigger.name == "button" && dialog_ids.include?(trigger["aria-controls"])

    add_issue(issues, "high", "Search", "Search trigger is not a button controlling a dialog on the page.", url)
  end

  footer_search_triggers = document.css("footer [data-search-trigger]").length
  expected_footer_search_triggers = FOOTER_SEARCH_EXEMPT_PAGES.include?(url) ? 0 : 1
  unless footer_search_triggers == expected_footer_search_triggers
    add_issue(issues, "medium", "Search", "Expected #{expected_footer_search_triggers} footer search triggers; found #{footer_search_triggers}.", url)
  end

  canonicals = document.css('link[rel~="canonical"]')
  add_issue(issues, "high", "Metadata", "Expected one canonical URL; found #{canonicals.length}.", url) unless canonicals.length == 1

  json_ld = document.css('script[type="application/ld+json"]')
  add_issue(issues, "medium", "Metadata", "Expected one JSON-LD graph; found #{json_ld.length}.", url) unless json_ld.length == 1
  json_ld.each do |node|
    JSON.parse(node.text)
  rescue JSON::ParserError => error
    add_issue(issues, "high", "Metadata", "Invalid JSON-LD: #{error.message}.", url)
  end

  document.css("a[href], link[href], img[src], script[src]").each do |node|
    attribute = node.key?("href") ? "href" : "src"
    target = node[attribute]
    next if target.nil? || target.empty? || target.start_with?("#", "mailto:", "tel:", "data:", "javascript:")

    unless target_exists?(site_dir, target)
      add_issue(issues, "high", "Routing", "Missing internal target: #{target}.", url)
    end
  end
end

search_index = File.join(site_dir, "search.json")
begin
  JSON.parse(File.read(search_index, encoding: "utf-8"))
rescue Errno::ENOENT, JSON::ParserError => error
  add_issue(issues, "high", "Search", "Invalid search index: #{error.message}.", "/search.json")
end

Dir.glob(File.join(ROOT_DIR, "_posts", "*.md")).sort.each do |post|
  slug = File.basename(post).sub(/\A\d{4}-\d{2}-\d{2}-/, "").sub(/\.md\z/, "")
  markdown_path = File.join(site_dir, "#{slug}.md")
  add_issue(issues, "critical", "Machine Readability", "Missing Markdown alternative.", "/#{slug}.md") unless File.file?(markdown_path)
end

llms_path = File.join(site_dir, "llms.txt")
if File.file?(llms_path)
  File.read(llms_path, encoding: "utf-8").scan(%r{https://fgelbal\.com(/[^)\s]+)}).flatten.each do |target|
    add_issue(issues, "high", "Machine Readability", "llms.txt target is missing: #{target}.", "/llms.txt") unless target_exists?(site_dir, target)
  end
else
  add_issue(issues, "critical", "Machine Readability", "llms.txt is missing.", "/llms.txt")
end

forbidden_names = %w[.DS_Store .mcp.json AGENTS.md CLAUDE.local.md DESIGN.md PRODUCT.md package-lock.json]
Find.find(site_dir) do |path|
  relative = Pathname(path).relative_path_from(Pathname(site_dir)).to_s
  next unless forbidden_names.include?(File.basename(path)) || relative.start_with?(".agents/", ".codex/", ".serena/")

  add_issue(issues, "critical", "Privacy", "Local project file was published: #{relative}.", "/#{relative}")
end

issue_count = issues.values.sum(&:length)
score = [100 - issues["critical"].length * 25 - issues["high"].length * 10 -
  issues["medium"].length * 4 - issues["low"].length, 0].max
report = {
  "url" => "https://fgelbal.com",
  "websiteName" => "Fırat Gelbal",
  "timestamp" => Time.now.utc.iso8601,
  "environment" => "Jekyll post-build artifact",
  "testMethodology" => "Static inspection of every generated HTML page and machine-readable route.",
  "visitedPages" => visited_pages,
  "summary" => { "score" => score, "pages" => visited_pages.length, "issues" => issue_count },
  "issues" => issues
}

if report_path
  FileUtils.mkdir_p(File.dirname(report_path))
  File.write(report_path, JSON.pretty_generate(report) + "\n")
end

puts "Site audit: #{score}/100, #{visited_pages.length} pages, #{issue_count} issues"
issues.each_value do |entries|
  entries.each { |issue| puts "- #{issue["category"]}: #{issue["issue"]} (#{issue["pages"].join(", ")})" }
end

exit(issue_count.zero? ? 0 : 1)
