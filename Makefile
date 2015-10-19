
# NOTE: this needs to be run in an NPM environment for access to module bins

CSS = node_modules/reset.css/reset.css \
      css/prism_custom.css \
      css/type.css \
      css/style.css \
      css/header.css \
      css/article.css \
      css/animation.css \
      css/mode-home.css \
      css/mode-project.css

JS = js/main.js \
     js/layout.js

JS_ENTRY = js/main.js


.PHONY: all
all: site/index.html

site/index.html: bundle.js style.css
	mustache -p bundle.js -p style.css package.json index.mustache > $@
	html-minifier --output $@ --remove-comments $@

bundle.js: $(JS)
	browserify --entry $(JS_ENTRY) --transform stringify | uglifyjs > $@

style.css: $(CSS)
	cat $^ | cleancss > $@

.PHONY: clean
clean:
	rm -f site/index.html bundle.js style.css
