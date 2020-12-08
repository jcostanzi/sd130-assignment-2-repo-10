const {src, dest, series, parallel} = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;

// this should clean all the stuff
function cleanTask() {
  return del('dist');
}

function pagesTask() {
  return src('src/index.html')
    .pipe(dest('dist'))
}

function scriptsTask() {
  return src('src/scripts/**/*.js')
    .pipe(uglify())
    .pipe(dest('dist/js'));
}

function stylesTask() {
  return src(['src/styles/**/!(override).css', 'src/styles/**/override.css'])
    .pipe(concat('styles.css'))
    .pipe(dest('dist/css'))
}

function imagesTask() {
  return src('src/images/**/*')
    .pipe(dest('dist/images'))
}

exports.default = series(cleanTask, parallel(pagesTask,imagesTask, scriptsTask, stylesTask));
