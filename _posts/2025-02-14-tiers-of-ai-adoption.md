---
title: "Tiers of AI Adoption: A Personal Journey"
thumbnail: "/assets/images/2025-02-14-tiers-of-ai-adoption/fge-vangogh.png"
category: "essay"
tags: ["favourite", "AI agents", "AI adoption"]
date: 2025-02-14
excerpt: "I illustrate the progressive integration of AI into my workflows through four tiers. From exploring AI tools to optimizing coding tasks and envisioning proactive AI agents"
---

Hello there! Here's my journey integrating AI into my work, broken down into adoption levels. Each tier builds upon the last, unlocking new capabilities and opportunities. I find myself in multiple tiers simultaneously – using AI for organizing blog taxonomy (T3) while still generating cat memes (T1). Growth is not linear, but directional.

Let me share my journey across these tiers, and perhaps it will resonate with your own exploration of AI.

![Tiers](/assets/images/2025-02-14-tiers-of-ai-adoption/tiers.png)


## The Tiers of AI Adoption

In broad strokes, I identified the following tiers of AI adoption:

1. Sandbox Era (Where curiosity builds castles)

2. Swiss Army Knife Phase (When AI becomes my versatile multitool)

3. Code Conversationalist (Teaching machines to speak my workflow)

4. Invisible Intern (3AM problem-solver)

### Tier 1: Sandbox Era

This tier is about trying out the shiny new AI tools that everyone is talking about. For me, the fascination started before ChatGPT, with the emergence of image style transfer models. I found it magical to apply the styles of Van Gogh or Monet to images effortlessly – something that wasn’t possible before, not at this speed, or for non-professionals like me.

I became obsessed with making my laptop paint like the masters. This led to a week of digital archaeology - digging through academic papers and trying to resurrect Python repositories with vague instructions. I learned three things:
    - AI papers resemble IKEA manuals missing half the pages.
    - "Open source" often means "Here's a .zip from where I last ran the code. Good luck."
    - Coding errors are modern-day Rorschach tests.

When I finally got a Frankenstein’s monster of dependencies running, the magic moment came: I watched my face morph into a Van Gogh-inspired Starry Night animation. Jumping in my bedroom with excitement, I sent it to friends. Their replies?

“Cool filter! Which Instagram preset is this?”

The revolution arrived disguised as a party trick. A major draw of apps like Instagram was the ability to manipulate images creatively, and now it was within reach for anyone.

![fge to Van Gogh](/assets/images/2025-02-14-tiers-of-ai-adoption/fge-vangogh.png)

The release of ChatGPT and Claude's conversational AI interfaces fueled my curiosity. The ability to have a coherent dialogue with a language model was captivating. As I used these tools more, I found myself brainstorming new ways to integrate them into my workflows.

I still generate cat astronauts (because joy matters), but last year something shifted. While the AI crafted a rainbow-maned lion for my partner, it also restructured my SQL code and fixed the bugs.

That's when I realized the same engine painting digital daydreams could streamline tedious coding tasks.

The toy became a tool not because it changed, but because I learned to re-imagine how it could assist me at work.

### Tier 2: Swiss Army Knife Phase

In this tier, I started integrating AI into my workflows or replacing traditional tools with AI-powered alternatives. The encouragement from colleagues and friends, and offerings like Automattic's free Perplexity Pro subscription, nudged me towards this tier.

After installing GitHub Copilot, I gradually transitioned to Cursor - a VS Code fork that eased my adaptation through familiar interfaces. Nowadays, I rarely use Google, since Claude and Perplexity answer most of my daily questions accurately. I stopped googling 'Python pandas merge error' and started asking Claude to diagnose my exact dataframe. I provide the problem, the failing tests, and my draft code. Claude / Cursor gives me solutions within my context.

My error resolution time dropped from 22 mins (Googling) to 2 mins (Claude). But the real win? Context preservation – no more losing my place in tabs.

It’s great to see many P2 posts promoting Cursor, Copilot, and similar tools. I learn from a12s how they use these from the prompt structure to advanced settings with custom rules.

After over a year of integrating AI into my workflows, I realized we could do much (so much!) more with the latest language models and AI tech. The true metamorphosis awaits in Tier 3.

### Tier 3: Code Conversationalist

2024 brought a paradigm shift in using AI models. Earlier systems could only read a few pages of text (8K tokens), but now they can digest 200K tokens in one sitting. Here's why that matters: tokens are like word pieces (about ¾ of a word each), meaning 200K tokens = ~150 pages. Imagine handing the AI the complete Sherlock Holmes collection plus your meeting notes and saying "analyze this." — within a single prompt (in 1 request to AI). That's the scale we're working with now.

AI improved at conforming to schemas and responding in structured formats. These advancements allowed us to pass substantial context to AI and receive specific responses.

For instance, I wrote a script to [clean up the taxonomy of data.blog](https://data.blog/2025/03/21/organizing-data-blog-content-via-nlp-and-llm/) (View the Python code: [WordPress.com Blog Metadata Organizer](https://github.com/gelbal/wordpress-blog-metadata-organize)). I asked AI to select from pre-defined categories and tags, and it adhered to the provided lists while suggesting new, relevant ones that I hadn't initially considered. I also sent multiple blog posts and asked AI to generate internal links between semantically related posts. Internal linking improves user experience by making content more discoverable and boosts SEO. AI suggested contextually relevant links, anchor text, and placement within the source post. All this happens within the code flow. We can envision building plugins that periodically perform such tasks, seamlessly incorporating AI output into the code flow.

Another example is from my recent support rotation: What I Learned from 10,000 Odie Chats. Together with Claude, we analyzed thousands of real conversations between users and our AI support system. I was able to pass 10,000 messages within one single prompt and ask AI to classify these in the 30 categories HEs defined.

Here's the key insight: context starvation breeds hallucinations (inaccurate responses). When starved of relevant information, even sophisticated AI models fabricate responses. With highly relevant and large enough context, AI stops hallucinating. Together with the structured response and deterministic ways to validate the schema, we can prevent and retry the hallucinated response.

At this tier, I realize the non-deterministic responses of AI are a powerful feature. We can ask AI to generate multiple outputs based on the same input, and then compare and consolidate them. These hallucinations aren't flaws — they're brainstorming sessions. Now, I prompt: 'Give 3 correct answers and 2 creative alternatives'.

### Tier 4: Invisible Intern

Today I manually adjust blog tags. Why settle for manual adjustments when my ideal agent could report: ‘Hey, monthly taxonomy audit is done. I merged 7 redundant tags. Approve changes?’

Current tools react when prompted. My ideal agent? A teammate who knows our codebase so well, they file PRs saying: 'Noticed you'll need these API changes next week. Drafted them.' Proactive > reactive.

This is the tier I find myself in currently. I'm eager to start building AI agents to assist me with my daily work and routine tasks, which is the path to scaling our capabilities. As Einstein said, "We cannot solve our problems with the same level of thinking we used when we created them."

We need to elevate our thinking to a higher level. What better way to do so than by embracing the AI revolution?

I'm more excited about building agents to help with my work than doing the work myself. It's an opportunity to enjoy the ride while pushing the boundaries of what's possible.

## Overcoming Conceptual Hurdles

Throughout this journey, I have referred to these technologies as "AI," though terms like "language model," "LLM," or "super knowledge" could also apply. But why does terminology matter? I stick with "AI" as it's the most common and accessible term. One of the frictions hindering AI adoption is the conceptual hangups surrounding it. I prefer to focus on the practical aspects of AI and how it can enhance our workflows.
- Tier 1's hurdle: Believing AI isn't just for tech bros.
- Tier 2's hurdle: Trusting AI more than StackOverflow.
- Tier 3’s hurdle: Non-deterministic generative responses is a feature, not a bug.
- Tier 4’s hurdle: Agents aren't about automation. They're about focusing on solving the higher level problems.
