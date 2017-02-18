var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');

gulp.task('scss', function () {

  return gulp.src('assets/css/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(concat('stylesheet.css'))
  // .pipe(cssnano())
  .pipe(gulp.dest(''));
});

gulp.task('watch', function(){
  gulp.watch('css/**/*.scss', ['scss']);
  // Other watchers
})

gulp.task('images', function(){
  return gulp.src('imgs/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('imgs'))
});

gulp.task('default', ['scss', 'watch']);
