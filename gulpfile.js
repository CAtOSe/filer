const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));

function compileSCSS() {
  return gulp.src('./styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
}

exports.default = () => {
  gulp.watch('./styles/**/*.*', compileSCSS);
};

exports.build = compileSCSS;
