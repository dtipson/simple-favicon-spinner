var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sizereport = require('gulp-sizereport'),
    browserSync = require('browser-sync').create();

// ERROR HANDLING
// ---------------
function handleError() {
  this.emit('end');
}


gulp.task('browser-sync', function() {
    browserSync.init({
        port:3004,
        ghostMode: {
            scroll: true
        },
        open:false,
        callbacks: {
            ready: function (err, bs) {
                require("opn")("http://localhost:3004/example.html");//"http://client-demo-b.dev:3001"
            }
        }
    });
});


gulp.task('build', function() {
  gulp.src('src/*.js')
    .pipe(concat('jquery.favico-spinner.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
      .on('error', handleError)
      .on('error', notify.onError())
    .pipe(uglify())
    .pipe(gulp.dest('./'))
    .pipe(sizereport({
        gzip: true
    }))
    .pipe(browserSync.stream({match: '*.js'}));
});


gulp.task('watch', function() {
  gulp.watch(['src/**/*.js'], ['build']);
});


// Default Task
gulp.task('default', ['browser-sync','build','watch']);