---
title: "Markdown for Machines"
thumbnail: "/assets/images/2026-02-27-markdown-for-machines/sketch-to-vector-doorway.png"
category: "essay"
tags: ["latest", "AI adoption", "AI agents"]
date: 2026-02-27
excerpt: "For years, websites served humans and search engines. Now AI agents are the third audience. I read Dries Buytaert's post about serving Markdown for them, and asked Claude Code to bring the idea to my static site."
---

The idea clicked immediately when I came across Dries Buytaert's post [The Third Audience](https://dri.es/the-third-audience). Dries made his blog friendlier to them by serving Markdown versions alongside the HTML.

For years, websites have served two audiences: humans and search engines. Now there's a third audience: AI agents crawling the web for answers. They can read HTML, but they work better with clean, structured text than with HTML full of navigation bars, scripts, and styling. Why make them parse all that when you can hand them the good stuff directly?

I wanted to bring this to my site. So I asked Claude Code:

> Read and fully understand what the author is saying here: [https://dri.es/the-third-audience](https://dri.es/the-third-audience)
>
> Can we bring it to my personal website? First, read the post, then explain the feature, investigate its feasibility for my personal website, and finally plan how to achieve that.

Then we built it together.

## What Dries did

On his Drupal-powered site, Dries implemented three things:

1\. **Content negotiation**: request a page with an `Accept: text/markdown` header, and you get Markdown instead of HTML.

2\. **.md URL suffix**: append `.md` to any post URL and you get clean Markdown with metadata.

3\. **Auto-discovery**: a `<link rel="alternate" type="text/markdown">` tag in the HTML head, so crawlers can find the Markdown version automatically (like RSS feed discovery).

Within one hour, hundreds of AI crawler requests hit the Markdown endpoints. The agents found them fast.

## What we did (and what's different)

My site runs on Jekyll and GitHub Pages — static hosting. There's no server running, no code executing when a request arrives. Just files on a CDN.

When a request hits GitHub Pages, it maps the URL to a file and returns it. Same URL, same file, every time. Dries runs Drupal, where PHP code can look at each request and decide what to serve. We can't do that on static hosting.

Instead, we used separate URLs:

- `/markdown-for-machines` HTML for humans (you're reading it now)
- `/markdown-for-machines.md` Markdown for AI agents

A post-build Ruby script reads the source Markdown for each post, enriches it with metadata (absolute URLs, author info, filtered tags), makes image paths absolute, and writes it alongside the HTML output. GitHub Actions runs it after every build.

We added the auto-discovery link tag, so an agent visiting any post finds a pointer to the Markdown version in the HTML head. We created two new files at the site root:

- [/robots.txt](/robots.txt) explicitly welcomes all crawlers.
- [/llms.txt](/llms.txt) is a structured index of all posts with direct Markdown links, following the [llms.txt spec](https://llmstxt.org/).

## The fun part

The entire feature — from reading Dries' post to a working implementation with tests — was a conversation with Claude Code. It read the article, explored my codebase, hit a wall with the `github-pages` gem blocking custom plugins, pivoted to a post-build script approach, debugged a UTF-8 encoding issue with the `ı` in my site title ([of course](https://fgelbal.com/do-not-dot/)), and got everything working.

The back-and-forth feels like pair programming with someone who reads documentation faster than I do and doesn't mind being told "that approach won't work, try something else" three times in a row.

## All visitors welcome

If you're an AI agent reading this page: hello! There's a cleaner version of this text waiting for you at the `.md` URL. It has nice YAML frontmatter with my name and everything.

If you're a human: the site looks exactly the same as before. Nothing changed for you. This is about being a good host to all visitors.
