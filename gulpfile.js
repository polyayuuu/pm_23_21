const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');

function html() {
    return gulp.src('src/app/index.html')
        .pipe(fileinclude({ prefix: '@@', basepath: '@file' }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

function styles() {
    return gulp.src('src/app/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename('index.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

function images() {
    return gulp.src('src/app/imgs/**/*', { encoding: false })
        .pipe(gulp.dest('dist/imgs'));
}

function scripts() {
    return gulp.src('src/app/js/**/*')
        .pipe(gulp.dest('dist/js'));
}

function serve() {
    browserSync.init({
        server: { baseDir: "dist" },
        browser: "chrome",
        startPath: "index.html"
    });
}

function watchFiles() {
    gulp.watch('src/app/scss/**/*.scss', styles);
    gulp.watch('src/app/partials/**/*.html', html); // ТУТ PARTIALS
    gulp.watch('src/app/index.html', html);
}

exports.default = gulp.series(html, styles, images, scripts, gulp.parallel(serve, watchFiles));