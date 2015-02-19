'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gutil = require('gulp-util');
var fs = require('fs');

gulp.task('clean', function () {
  return gulp.src('build', { read: false }).pipe($.clean());
});

gulp.task('build', function (cb) {
});

gulp.task('default', ['build']);
