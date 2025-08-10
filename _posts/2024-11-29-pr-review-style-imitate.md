---
title: "PR Review Style Imitator"
thumbnail: "/assets/images/2024-11-29-pr-review-style-imitate/diagram.png"
category: "code"
tags: ["Python", "AI agents", "Semantic Search"]
date: 2024-12-01
excerpt: "A tool that learns a reviewer's PR style from historical comments and generates new reviews that match their voice and focus."
---

Pipeline diagram showing the flow from PR metadata through style analysis to final review generation:
![Pipeline](/assets/images/2024-11-29-pr-review-style-imitate/diagram.png)

I built this to make code reviews more consistent without losing each reviewer’s personality. The pipeline pulls PR metadata, diffs, comments, and past reviews, runs a quick local pass with Qwen 2.5 (via Ollama) to filter out anything sensitive, and then has Claude 3.5 Sonnet extract the reviewer’s tone, recurring themes, and technical focus areas into a crisp set of instructions. Under the hood it’s orchestrated with Haystack so components can be swapped easily.

From there, I can feed a new PR’s metadata and diff through the notebooks to generate a draft review that sounds like the target reviewer while staying technically accurate. There’s a small helper script (`fetch_pr_diffs.py`) that works off a local clone to grab diffs efficiently. Notebooks cover three steps—classify, learn style, apply style—so it’s easy to audit each phase. Repo: [pr-review-style-imitate](https://github.com/gelbal/pr-review-style-imitate).
