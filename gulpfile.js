const gulp = require('gulp')
const sass = require('gulp-sass')
const path = require('path')
const rename = require('gulp-rename')


gulp.task('build:scss', function () {
  return gulp.src(path.join(__dirname, 'common/components/icon/index.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(rename("index.wxss"))
    .pipe(gulp.dest(path.join(__dirname, 'common/components/icon')))
})

