
# NOTE: this needs to be run in an NPM environment for access to module bins

# files --------------------------------

HTML = html/*.html

CSS = node_modules/reset.css/reset.css \
      css/vars.css \
      css/prism.css \
      css/style.css \
      css/header.css \
      css/article.css \
      css/animation.css \
      css/mode-home.css \
      css/mode-project.css

JS = js/main.js \
     js/layout.js

JS_ENTRY = js/main.js

# flags --------------------------------

BROWSERIFY_FLAGS = --transform [ stringify --minify true ]
UGLIFY_FLAGS = --compress --mangle
LESS_FLAGS = --strict-math=on --strict-units=on
HTML_MIN_FLAGS = --remove-comments

# targets ------------------------------

.PHONY: all
all: site/index.html

site/index.html: index.mustache bundle.js style.css grid.png.b64
	mustache $(foreach f, $^, -p $(f) ) package.json index.mustache > $@
	html-minifier --output $@ $(HTML_MIN_FLAGS) $@

bundle.js: $(JS) $(HTML)
	browserify --entry $(JS_ENTRY) $(BROWSERIFY_FLAGS) | uglifyjs $(UGLIFY_FLAGS) > $@

style.css: $(CSS)
	cat $^ | lessc $(LESS_FLAGS) - | cleancss > $@

grid.png.b64: site/assets/grid.png
	cat $^ | base64 --wrap 0 > $@

.PHONY: clean
clean:
	rm -f site/index.html bundle.js style.css *.b64
