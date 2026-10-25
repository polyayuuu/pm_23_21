const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// Таск для компіляції SCSS у мінімізований CSS
function styles() {
    // Зверни увагу на шлях: src/app/scss/main.scss
    return gulp.src('src/app/scss/main.scss') 
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS()) // Мінімізація
        .pipe(rename('index.min.css')) // Перейменування
        .pipe(gulp.dest('dist/css')); // Збереження у dist/css
}

exports.default = function() {
    gulp.watch('src/app/scss/**/*.scss', styles);
};