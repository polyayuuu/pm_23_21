const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');

// 1. Збірка HTML
function html() {
    return gulp.src('src/app/index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

// 2. Компіляція SCSS
function styles() {
    return gulp.src('src/app/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename('index.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

// 3. Копіювання картинок
function images() {
    return gulp.src('src/app/imgs/**/*', { encoding: false })
        .pipe(gulp.dest('dist/imgs'));
}

// 4. Копіювання JS файлів (script.js та accordion.js)
function scripts() {
    return gulp.src('src/app/js/**/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}

// 5. Копіювання JSON файлу (data.json) - ОСЬ ЙОГО НЕ ВИСТАЧАЛО
function data() {
    return gulp.src('src/app/*.json')
        .pipe(gulp.dest('dist'));
}

// 6. Сервер
function serve() {
    browserSync.init({
        server: { baseDir: "dist" },
        browser: "chrome",
        startPath: "index.html"
    });
}

// 7. Відстеження змін
function watchFiles() {
    gulp.watch('src/app/scss/**/*.scss', styles);
    gulp.watch('src/app/partials/**/*.html', html); // ТУТ PARTIALS
    gulp.watch('src/app/index.html', html);
    gulp.watch('src/app/js/**/*.js', scripts);
    gulp.watch('src/app/*.json', data);
}

// Запускаємо все
exports.default = gulp.series(html, styles, images, scripts, data, gulp.parallel(serve, watchFiles));