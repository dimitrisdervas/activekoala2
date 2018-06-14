var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var prefix       = require('gulp-autoprefixer');
var cp           = require('child_process');
var sourcemaps   = require('gulp-sourcemaps');
var concat       = require('gulp-concat');
var nano         = require('gulp-cssnano');
var util         = require('gulp-util');
var gulpif       = require('gulp-if');
var plumber      = require('gulp-plumber');
var uglify       = require('gulp-uglify');
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var fs           = require('fs');
var request      = require('request');
var handlebars   = require('gulp-compile-handlebars');
var nunjucks     = require('gulp-nunjucks');
var nunjucksRender = require('gulp-nunjucks-render');
var data         = require('gulp-data');
var rename       = require('gulp-rename');
var download     = require('gulp-download2');

var mainBowerFiles = require('gulp-main-bower-files');
var postcss      = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var sorting      = require('postcss-sorting');
var assets       = require('postcss-assets');
var responsive   = require('gulp-responsive');
var shell        = require("gulp-shell");
var baby         = require('babyparse');
var Papa         = require("papaparse")
var translit     = require('speakingurl');
var gulp         = require('gulp');
var webshot      =require('gulp-webshot');

var requireDir = require('require-dir');
var tasks      = requireDir('./gulp/tasks', {recurse: true}); // eslint-disable-line

// include paths file
var paths      = require('./gulp/paths');