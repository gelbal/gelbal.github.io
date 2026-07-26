# ABOUTME: Build and serve commands for the Jekyll site.
# ABOUTME: Handles the full pipeline including markdown generation for AI agents.

PORT ?= 4000
HOST ?= 127.0.0.1

.PHONY: audit build serve clean

build:
	bundle exec jekyll build
	ruby _scripts/generate_markdown.rb

audit: build
	bundle exec ruby _scripts/audit_site.rb _site --report reports/data/site-audit.json

serve: build
	@echo "Serving at http://$(HOST):$(PORT)"
	python3 -m http.server $(PORT) --bind $(HOST) --directory _site

clean:
	rm -rf _site
