
var gulp = require("gulp");
var browserify = require("browserify");
var minifyCSS = require('gulp-minify-css');
var stringify = require('stringify');
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var gutil = require("gulp-util");
var del = require("del");

//generic error handler
function error(err)
{
    delete err.stream;
    console.log(err);
}

gulp.task("default", ["build"]);
gulp.task("build", ["javascript", "css"]);

gulp.task("javascript", function() {

    var b = browserify({
        entries: "./js/main.js",
        debug: true
    });

    b.transform(stringify([".html"]));

    return b.bundle()
            .on("error", error)
            .pipe(source("bundle.js"))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest("./site/"));
});

gulp.task("css", function() {
    var files = [
        "node_modules/reset.css/reset.css",
        "css/prism_custom.css",
        "css/type.css",
        "css/style.css",
        "css/article.css",
        "css/animation.css",
        "css/mode-project.css",
    ];

    gulp.src(files)
        .on("error", error)
        .pipe(concat("style.css"))
        .pipe(minifyCSS())
        .pipe(gulp.dest("./site/"))
});

gulp.task("clean", function() {
    return del([
        "./site/bundle.js",
        "./site/style.css",
    ]);
});

gulp.task("watch", function() {
    gulp.watch("js/**/*.js", ["javascript"]);
    gulp.watch("css/**/*.css", ["css"]);
});
