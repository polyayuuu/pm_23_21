const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

const paths = {
    html: { src: 'src/app/**/*.html', dest: 'dist/' },
    styles: { src: 'src/app/scss/**/*.scss', dest: 'dist/css/' },
    scripts: { src: 'src/app/js/**/*.js', dest: 'dist/js/' },
    images: { src: 'src/app/imgs/**/*.{jpg,jpeg,png,svg,gif}', dest: 'dist/imgs/' }
};

function html() {
    return gulp.src(paths.html.src)
        .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

function images() {
    return gulp.src(paths.images.src, { encoding: false })
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

function bootstrapCSS() {
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('dist/css/'));
}

function bootstrapJS() {
    return gulp.src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
        .pipe(gulp.dest('dist/js/'));
}

function serve() {
    browserSync.init({ server: { baseDir: './dist' },
    notify: false,
    browser: 'chrome'
    });
    
}

function watch() {
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.src, images);
}

const build = gulp.series(gulp.parallel(html, styles, scripts, images, bootstrapCSS, bootstrapJS), gulp.parallel(serve, watch));
exports.build=build;
exports.default=build;
