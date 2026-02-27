# ABOUTME: Build and serve commands for the Jekyll site.
# ABOUTME: Handles the full pipeline including markdown generation for AI agents.

PORT ?= 4000

.PHONY: build serve clean

build:
	bundle exec jekyll build
	ruby _scripts/generate_markdown.rb

serve: build
	@echo "Serving at http://localhost:$(PORT)"
	python3 -m http.server $(PORT) --directory _site

clean:
	rm -rf _site
