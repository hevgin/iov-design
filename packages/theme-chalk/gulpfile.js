'use strict';

const { series, src, dest } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({
      // 使用 overrideBrowserslist 避免 Autoprefixer 的
      // "Replace Autoprefixer browsers option to Browserslist config" 告警
      overrideBrowserslist: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('./lib'));
}

function copyfont() {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('./lib/fonts'));
}

exports.build = series(compile, copyfont);
