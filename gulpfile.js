var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    stripDebug = require('gulp-strip-debug'),
    sizereport = require('gulp-sizereport'),
    browserSync = require('browser-sync').create();

// ERROR HANDLING
// ---------------
function handleError() {
  this.emit('end');
}


gulp.task('browser-sync', function() {
    browserSync.init({
        ghostMode: {
            scroll: true
        },
        proxy:true,
        server:true,
        open:false,
        callbacks: {
            ready: function (err, bs) {
              var port = bs.options.get("port");
              require("opn")("http://localhost:"+port+"/index.html");
            }
        }
    });
});


gulp.task('build', function() {
  gulp.src('src/*.js')
    .pipe(concat('jquery.favico-spinner.dev.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
      .on('error', handleError)
      .on('error', notify.onError())
    .pipe(gulp.dest('./'))
    .pipe(rename(function (path) {
      path.basename = path.basename.replace('.dev','');
    }))
    .pipe(stripDebug())
    .pipe(uglify({
      mangle: {
        sort: true,
        toplevel:true
      }
    }))
    .pipe(gulp.dest('./'))
    .pipe(sizereport({
        gzip: true
    }))
    .pipe(browserSync.stream({once: true}));
});


gulp.task('watch', function() {
  gulp.watch(['src/**/*.js'], ['build']);
});


// Default Task
gulp.task('default', ['browser-sync','build','watch']);