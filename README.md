# Personal Website

Fırat Gelbal's personal website featuring essays, visual work, and code projects. Built with Jekyll and deployed via GitHub Pages.

## Content

- **Essays**: Technical writing and personal reflections
- **Visuals**: Creative projects and data visualizations  
- **Code**: Open source projects and development work

## Technical Setup

### Development
```bash
bundle install
bundle exec jekyll serve --livereload
```

### Architecture
- **Jekyll**: Static site generator with Liquid templating
- **SCSS**: Modular stylesheets with responsive design
- **GitHub Actions**: Automated deployment to GitHub Pages
- **Content**: Markdown files in `_posts/` with YAML frontmatter

### Key Files
- `_config.yml`: Site configuration and homepage settings
- `_sass/`: SCSS modules for styling
- `_layouts/`: Page templates
- `_includes/`: Reusable components
- `assets/`: Images, data files, and compiled CSS

### Adding Content
Posts use category (`essay`, `visual`, `code`) and tags (`latest`, `favourite`, topic tags) for organization. Homepage sections are controlled by special tags and counts set in `_config.yml`.

## Deployment

Automated via GitHub Actions workflow (`.github/workflows/pages.yml`) on push to main branch. Site available at fgelbal.com.