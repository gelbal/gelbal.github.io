#!/usr/bin/env ruby
# frozen_string_literal: true

# ABOUTME: Post-build script that generates .md versions of all posts for AI agents.
# ABOUTME: Run after `jekyll build` to create /:title.md files in the _site directory.

require "date"
require "yaml"
require "fileutils"

POSTS_DIR = File.join(__dir__, "..", "_posts")
SITE_DIR = File.join(__dir__, "..", "_site")
CONFIG_FILE = File.join(__dir__, "..", "_config.yml")

config = YAML.safe_load(File.read(CONFIG_FILE, encoding: "utf-8"))
site_url = config["url"] || "https://fgelbal.com"
def extract_frontmatter_and_content(file_path)
  raw = File.read(file_path, encoding: "utf-8")
  match = raw.match(/\A---\s*\n(.*?\n)---\s*\n(.*)\z/m)
  return [nil, nil] unless match

  frontmatter = YAML.safe_load(match[1], permitted_classes: [Date, Time])
  content = match[2]
  [frontmatter, content]
end

def slug_from_filename(filename)
  # _posts/2026-02-10-from-default-to-delightful.md -> from-default-to-delightful
  filename.sub(/\A\d{4}-\d{2}-\d{2}-/, "").sub(/\.md\z/, "")
end

def make_paths_absolute(content, site_url)
  content
    .gsub(/(\]\()(\/)/, "\\1#{site_url}/")
    .gsub(/(src=["'])(\/)/, "\\1#{site_url}/")
    .gsub(/(href=["'])(\/)/, "\\1#{site_url}/")
end

def build_enriched_frontmatter(fm, slug, site_url)
  internal_tags = %w[latest favourite]
  public_tags = (fm["tags"] || []).reject { |t| internal_tags.include?(t) }

  date = fm["date"]
  date_str = date.is_a?(Date) || date.is_a?(Time) ? date.strftime("%Y-%m-%d") : date.to_s

  enriched = {
    "url" => "#{site_url}/#{slug}/",
    "title" => fm["title"],
    "author" => { "name" => "Firat Gelbal", "url" => "#{site_url}/about" },
    "date" => date_str,
    "category" => fm["category"],
    "tags" => public_tags,
    "excerpt" => fm["excerpt"]&.to_s&.strip
  }

  enriched.delete("tags") if public_tags.empty?
  enriched.delete("excerpt") if enriched["excerpt"].to_s.empty?

  enriched.to_yaml + "---\n\n"
end

# Process all posts
post_files = Dir.glob(File.join(POSTS_DIR, "*.md")).sort
count = 0

post_files.each do |post_path|
  filename = File.basename(post_path)
  slug = slug_from_filename(filename)

  fm, content = extract_frontmatter_and_content(post_path)
  next unless fm && content

  enriched_fm = build_enriched_frontmatter(fm, slug, site_url)
  absolute_content = make_paths_absolute(content, site_url)

  output = enriched_fm + absolute_content
  output_path = File.join(SITE_DIR, "#{slug}.md")

  File.write(output_path, output)
  count += 1
end

puts "Generated #{count} markdown files for AI agents."
