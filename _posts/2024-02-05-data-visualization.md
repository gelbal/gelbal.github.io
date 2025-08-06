---
title: "Data Visualization"
thumbnail: "/assets/images/data-viz-thumb.jpg"
category: "visual"
tags: ["data", "visualization", "web-development"]
date: 2024-02-05
excerpt: "Exploring the power of client-side data visualization using vanilla JavaScript and JSON data sources."
---

Data visualization is a powerful tool for communicating complex information in an accessible and engaging way. This post explores how to embed interactive visualizations within Jekyll posts using reusable components.

## Programming Language Usage

The following chart shows relative usage of different programming languages in web development projects:

{% include viz/example-chart.html data="example-data.json" id="chart1" title="Programming Language Usage" %}

## Implementation Approach

The visualization system uses:

- **Jekyll includes** for reusable components
- **JSON data files** stored in `/assets/data/`
- **Vanilla JavaScript** for rendering (no external dependencies)
- **Responsive design** that adapts to screen size

### Benefits

1. **No Build Step**: Visualizations render client-side with no additional build complexity
2. **Reusable Components**: Create once, use in multiple posts
3. **Data Separation**: Keep data in separate JSON files for easy updates
4. **Lightweight**: No heavy JavaScript libraries required

This approach provides a good balance between functionality and simplicity, making it easy to add data-driven content to any Jekyll post.
