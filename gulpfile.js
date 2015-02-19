'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var cfg = require('./package.json');

var pureConfig = {
  exports: capitalise(cfg.name),
  external: {
    lodash: {amd: 'lodash', global: '_'},
    react: {amd: 'react', global: 'React'},
    baconjs: {amd: 'baconjs', global: 'Bacon'}
  }
};

function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getBundleName() {
  return cfg.name + '-' + cfg.version;
};

gulp.task('clean', function () {
  return gulp.src('dist', { read: false }).pipe($.clean());
});

gulp.task('build', function () {
  return gulp.src(cfg.main)
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.pureCjs(pureConfig))
    .pipe($.rename({ suffix: '-' + cfg.version }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['build']);
