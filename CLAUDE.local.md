# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Local Development
```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve --livereload

# Build for production
bundle exec jekyll build
```

### Testing and Validation
- No automated tests are configured - this is a content-focused Jekyll site
- Validate by running `bundle exec jekyll serve` and checking site functionality
- Site builds automatically via GitHub Actions on push to main

## Architecture Overview

This is a Jekyll-based personal website for Fırat Gelbal (fgelbal.com) with a content-centric architecture designed for essays, visual work, code projects, and music reviews.

### Content Organization
- **Posts** (`_posts/`): All content with frontmatter specifying `category` (essay/visual/code/music) and `tags` (latest/favourite/topic-tags)
- **Homepage sections** controlled by tags: "latest" and "favourite" tags determine homepage display
- **Topic pages** auto-generated from all tags excluding "latest" and "favourite"
- **Category pages** filter posts by the `category` frontmatter field

### Layout System
- **Default layout** (`_layouts/default.html`): Base template with header/footer
- **Home layout** (`_layouts/home.html`): Homepage with Latest, Favourites, Topics, and Music sections
- **Card components** in `_includes/`: Different card styles for various contexts
  - `horizontal-card-compact.html`: Two-column layout (content left, image right) for homepage
  - `content-card.html` and `content-card-compact.html`: For category pages
  - `visual-card-compact.html`: For visual content

### Styling Architecture
- **SCSS structure** in `_sass/`:
  - `_base.scss`: Typography, colors, CSS variables
  - `_layout.scss`: Component and layout styles
  - `_responsive.scss`: Media queries and responsive design
- **CSS Grid** used for responsive layouts (1/2/3 columns)
- **CSS custom properties** for theming and consistency

### Key Configuration
- **Homepage display counts** controlled by `_config.yml`:
  - `homepage_latest_count: 3`
  - `homepage_favourites_count: 3`
- **Navigation** defined in `_data/navigation.yml`
- **Deployment** via GitHub Actions (`.github/workflows/pages.yml`)

### Content Creation Patterns
- **Post frontmatter** requires: `title`, `category`, `tags`, `date`, `thumbnail`, `excerpt`
- **Visual posts** should include appropriate thumbnails in `assets/images/[post-date-slug]/`
- **Data visualizations** use includes from `_includes/viz/` with data in `assets/data/`

### Recent Development Focus
Recent commits show ongoing work on homepage layout improvements, particularly implementing horizontal two-column card layouts and responsive design refinements. The site emphasizes visual consistency and clean typography for content presentation.