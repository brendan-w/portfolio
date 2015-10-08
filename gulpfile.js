
var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var gutil = require("gulp-util");
var del = require("del");

gulp.task("default", ["build"]);
gulp.task("build", ["javascript", "css"]);

gulp.task("javascript", function() {

    // set up the browserify instance on a task basis
    var b = browserify({
        entries: "./js/main.js",
        debug: true
    });

    return b.bundle()
            .pipe(source("bundle.js"))
            .pipe(buffer())
            .pipe(uglify())
            .on("error", gutil.log)
            .pipe(gulp.dest("./dist/"));
});

gulp.task("css", function() {
    var files = [
        "node_modules/reset.css/reset.css",
        "css/type.css",
        "css/style.css",
    ];

    gulp.src(files)
        .pipe(concat("style.css"))
        .pipe(gulp.dest("./dist/"))
});

gulp.task("clean", function() {
    return del([
        "./dist/bundle.js",
        "./dist/style.css",
    ]);
});
