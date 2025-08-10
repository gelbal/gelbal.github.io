---
title: "WordPress Author Style Imitator"
thumbnail: "/assets/images/2024-10-24-author-style-imitate/mimic_author_style.png"
category: "code"
tags: ["Python", "AI agents", "Natural Language Processing"]
date: 2024-12-01
excerpt: "A tool that analyzes an author's writing style from their WordPress.com blog posts and helps generate new content that mimics their unique voice."
---

Pipeline diagram showing the flow from WordPress.com API through style analysis to final content generation:
![Data flow](/assets/images/2024-10-24-author-style-imitate/mimic_author_style.png)

I built this as a practical way to capture a writer’s voice and reuse it on demand. The pipeline pulls posts and engagement stats from the WordPress.com API, does a quick local pass with Ollama (Qwen 2.5) to screen out anything sensitive, and then asks Claude 3.5 to distill tone, structure, and recurring language patterns into clear style instructions. Think of it as a lightweight, auto‑generated style guide per author.

Once the style is captured, I can drop in a rough draft and a few example posts and have Claude rewrite the piece so it keeps the technical accuracy while sounding like the original author. Everything runs in straightforward Jupyter notebooks, making it easy to audit each step or swap models. The code and notebooks are in the repo: [wordpress-author-style-imitate](https://github.com/gelbal/wordpress-author-style-imitate).
