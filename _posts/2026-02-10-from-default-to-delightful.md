---
title: "From Default to Delightful: AI-Assisted Data Visualization"
thumbnail: "/assets/images/2026-02-10-from-default-to-delightful/evolution_iteration_5_storytelling.png"
category: "essay"
tags: ["latest", "Data Visualization", "AI agents"]
date: 2026-02-10
excerpt: "I can never remember the exact syntax for Plotly. AI changes this. Now I describe what I want in natural language, iterate in conversation, and let the model handle the boilerplate. Five prompts transformed default charts into a visual story of WordPress's 20-year evolution."
---

*This post was originally published at [data.blog](https://data.blog/2026/02/10/from-default-to-delightful-ai-assisted-data-visualization/).*

<div style="display: flex; gap: 2rem; align-items: flex-start;">
<div>
<p>Default:</p>
<img src="/assets/images/2026-02-10-from-default-to-delightful/evolution_iteration_1_defaults.png" alt="Default Plotly chart" style="width:100%;" />
</div>
<div>
<p>Delightful:</p>
<img src="/assets/images/2026-02-10-from-default-to-delightful/evolution_iteration_5_storytelling.png" alt="Delightful storytelling chart" style="width:100%;" />
</div>
</div>

The same data. The same library. Five prompts and a couple of visualization principles transformed one into the other.

* * *

I can never remember the exact syntax for Plotly. Or Matplotlib. Or any other visualization library.

That used to mean choosing between two poor options: wrestle with documentation, or settle for drag-and-drop tools that can't do what I actually want.

AI changes this. Now I describe what I want in plain language, iterate through ideas in conversation, and let the model handle the boilerplate. I focus on the design while AI handles the API.

This post walks through that process. I used [Claude](https://claude.ai/) and [Plotly](https://plotly.com/), but the approach works with any capable coding assistant visualization library. Starting from defaults and progressively applying data visualization best practices, all through natural language prompts. The complete code is [available on GitHub](https://github.com/gelbal/repo-history-analyze).

The data is the [WordPress.org](https://wordpress.org/) open source project [code changes history](https://core.trac.wordpress.org/) (2003–2025), tracking contributors and lines of code changed.

WordPress credits contributors via "Props" tags in commit messages—crediting not just committers, but reviewers, testers, bug reporters, and patch authors. "Contributors" means everyone credited via Props.

## Iteration 0: Raw Weekly Data Won't Work

Raw weekly data is useful for operational monitoring, but not so effective for storytelling. Single large commits create spikes. Holidays create gaps. The signal gets lost in noise.

![Raw weekly data chart](/assets/images/2026-02-10-from-default-to-delightful/evolution_iteration_0_weekly.png)

A 12-week rolling window smooths this noise, revealing sustained patterns rather than one-off events. Now we can see trends and tell a story.

## Iteration 1: Plotly Defaults

AI Prompt: "Create line charts showing contributors over time in one chart, and lines added and deleted in a second chart."

This is what Plotly gives us out of the box.

![Plotly defaults chart](/assets/images/2026-02-10-from-default-to-delightful/evolution_iteration_1_defaults.png)

### What's wrong with the defaults?

- No title.
- Generic axis labels (just column names).
- Cluttered background with dark gridlines.
- Default colors don't tell a story.
- Legend placement takes up space.
- No context about what the data means.

Let's improve this, step-by-step.

## Iteration 2: Declutter and Structure

AI Prompt: "Clean up these charts by removing visual clutter. Make the background white, reduce gridline prominence. Draw the charts in 2 rows instead of 2 columns, so the x-axis is shared."

![Decluttered chart](/assets/images/2026-02-10-from-default-to-delightful/evolution_iteration_2_decluttered.png)

### What has improved?

- White background removes visual noise.
- Subtle gridlines guide the eye without distraction.
- Vertical stacking aligns time axes for easy comparison.
- Shared x-axis makes temporal comparison intuitive.
- Semantic colors: green for growth, red for removal. The metaphor is immediate. Previous defaults were misleading.

Better. But still generic. Let's make it _WordPress_.

## Iteration 3: WordPress Brand Colors, No Gridlines, Peak Annotations

AI Prompt: "Apply official WordPress.org brand colors and remove gridlines completely for a cleaner look. Add inline annotations showing the peak number of contributors at key intervals so the viewer can see the growth trajectory without needing to trace to the y-axis."

![WordPress brand colors chart](/assets/images/2026-02-10-from-default-to-delightful/evolution_iteration_3_brand_colors.png)

### What has improved?

- WordPress brand colors and typography create a visual identity.
- Gridlines removed for a cleaner, less cluttered look.
- Peak annotations with dates show growth trajectory. The reader can see exact values and timing.

Now the chart communicates identity and trajectory. But there's a story hiding in the data that we haven't shown yet: what happens when code gets _deleted_?

## Iteration 4: Add Net Growth Panel with Area Fills

AI Prompt: "Add net code growth as a third panel. Use area fills to show magnitude more clearly. Add inline labels to all charts. Remove the legend. Left-align titles. Make all the text 50% larger."

![Net growth panel chart](/assets/images/2026-02-10-from-default-to-delightful/evolution_iteration_4_net_growth.png)

### What has improved?

- Three panels show contributors, code churn, and net growth. Three dimensions of project health, visible at once.
- Area fills show magnitude more clearly than lines alone. You _feel_ the difference between 50K lines and 200K lines.
- Net growth panel shows when WordPress grew vs churned code. The dips below zero are _cleanup_. Major releases often trigger refactoring: paying down technical debt, removing deprecated code.
- Inline labels replace the legend for a cleaner look.
- The peaks tell a story: 2005 (+197K) marks WordPress 1.5's expansion, 2017 (-39K) shows post-release cleanup, and 2018 (+118K) is Gutenberg's arrival.

We're close. The data is clear, the design is clean. But we're still showing _what happened_. Let's tell the reader _what it means_.

## Iteration 5: Add Storytelling

AI Prompt: "Transform this from a data display into a data story. Add a takeaway title that states the key insight. Remove chart titles since inline labels provide context. Add WordPress milestone annotations."

![Storytelling chart](/assets/images/2026-02-10-from-default-to-delightful/evolution_iteration_5_storytelling.png)

The title now tells something beyond being descriptive. The milestone annotations (WP 1.0, WP 2.0, Gutenberg) give readers orientation. We see a project's evolution, not just lines. The negative net growth periods are a healthy codebase breathing: expanding with new solutions, contracting with cleanup.

That's the story. Here's how an open source project grows, matures, and sustains itself.

### The Complete Transformation

Compare Iteration 1 (Plotly defaults) with Iteration 5 (storytelling):

| Aspect | Before | After |
|--------|--------|-------|
| Title | Generic subplot labels | Insight-driven headline |
| Colors | Random defaults | WordPress brand palette |
| Legend | External box | Inline labels at line ends |
| Context | None | Milestone annotations |
| Layout | Side-by-side | Vertically aligned, shared x-axis |
| Chart titles | Generic | Removed (inline labels suffice) |
| Message | "Here's data" | "Here's what the data means" |

* * *

The same data tells a different story when presented effectively.

The barrier used to be _technical_: you needed to know library APIs, fight with positioning code, and remember obscure parameters. Now you describe what you want and iterate in conversation. The AI handles syntax; you handle meaning.

This shifts the valuable skill. Memorizing `fig.update_layout()` parameters matters less. What matters more is _why_ to remove gridlines, _when_ to use area fills, and _how_ to write a takeaway title.

Data visualization best practices haven't changed. But now anyone can apply them.

* * *

Built with [Claude](https://claude.ai/), [Plotly](https://plotly.com/), and [marimo](https://marimo.app). Full code and data pipeline can be found at [github.com/gelbal/repo-history-analyze](https://github.com/gelbal/repo-history-analyze).

Thanks to [Shannon](https://gravatar.com/functionalrhyme) and [Jeffrey](https://gravatar.com/apartness) for the reviews and suggestions!
