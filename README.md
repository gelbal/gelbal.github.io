# Personal Website

A Jekyll-based personal website designed for timeless content presentation, combining essays, visual work, code projects, and music reviews.

## Features

- **Homepage Sections**: Latest, Favourites, and Topics for content discovery
- **Category Pages**: Organized by Essays, Visuals, Code, and Music
- **Responsive Design**: Mobile-first CSS Grid layout (1/2/3 columns)
- **Data Visualization**: Client-side charts with vanilla JavaScript
- **Tag-Based Organization**: Flexible content categorization
- **Clean Typography**: System fonts with generous whitespace

## Local Development

### Prerequisites

- Ruby (version 2.7 or higher)
- Bundler gem

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/yourdomain.com.git
cd yourdomain.com

# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# With live reload
bundle exec jekyll serve --livereload
```

The site will be available at `http://localhost:4000`.

## Content Management

### Adding Posts

Create new markdown files in `_posts/` with this front matter structure:

```yaml
---
title: "Your Post Title"
thumbnail: "/assets/images/thumbnail.jpg"
category: "essay"  # Options: essay, visual, code, music
tags: ["latest", "favourite", "topic1", "topic2"]
date: 2024-01-15
excerpt: "Brief description for content cards..."
---
```

### Homepage Control

Configure homepage sections in `_config.yml`:

```yaml
homepage_latest_count: 3     # Number of posts in Latest section
homepage_favourites_count: 3 # Number of posts in Favourites section
```

### Data Visualizations

Add visualizations to posts using Jekyll includes:

```markdown
{% include viz/example-chart.html data="dataset.json" id="chart1" title="Chart Title" %}
```

Store data files in `assets/data/` directory.

## Site Structure

```
├── _config.yml              # Jekyll configuration
├── _data/navigation.yml     # Site navigation menu
├── _includes/               # Reusable components
│   ├── content-card.html    # Post card component
│   └── viz/                 # Data visualization components
├── _layouts/                # Page templates
├── _posts/                  # All content
├── _sass/                   # Stylesheet architecture
├── assets/
│   ├── css/main.scss        # Main stylesheet
│   ├── images/              # Post thumbnails
│   └── data/                # Visualization data
└── about.md                 # About page
```

## Deployment

### GitHub Pages

1. Push to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Select "Deploy from a branch" and choose `main`
4. Configure custom domain if desired

### Custom Domain

1. Add `CNAME` file with your domain
2. Update `url` in `_config.yml`
3. Configure DNS with your domain provider

## Configuration

### Site Metadata

Update `_config.yml`:

```yaml
title: "Your Name"
description: "Your site description"
url: "https://yourdomain.com"
```

### Navigation

Edit `_data/navigation.yml` to customize menu items.

### Styling

Modify SASS files in `_sass/`:
- `_base.scss`: Typography and colors
- `_layout.scss`: Component styles
- `_responsive.scss`: Media queries

## License

This project is open source. Feel free to use as a template for your own site.

## Support

For questions about using this template, check the documentation or open an issue.