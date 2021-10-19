var gulp            = require('gulp');
var Papa            = require("papaparse");
var fs              = require('fs');
var nunjucks     = require('gulp-nunjucks');
var nunjucksRender  = require('gulp-nunjucks-render');
var translit        = require('speakingurl');
var rename          = require('gulp-rename');
var shell           = require('shelljs');
var runSequence     = require('run-sequence');
var del             = require('del');
var gulpSequence = require('gulp-sequence')


var categoriesPath = {};
categoriesPath.collection = 'content/categories';
categoriesPath.csv        = 'csv/google/categories';
categoriesPath.template   = '_gulp-templates/nunjucks/categories.html';
categoriesPath.templateyml   = '_gulp-templates/nunjucks/categoriesyml.html';
module.exports = categoriesPath;


gulp.task('download:categories', done => {
    shell.exec('python3 sheetsAll.py');
    done();
});



gulp.task('md:categories', function() {

    fs.readFile('./'+ categoriesPath.csv +'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < (rows.length)-1; i++) {
            var items = rows[i]

         // https://gist.github.com/antonreshetov/c41a13cfb878a3101196c3a62de81778
            var categoryTranslit = translit(items[1], {
                lang: 'en'
              })

            var templateData = {
title : items[1],
schools : items[2],
subcategory : items[3],
slug : items[4],
slugsubcategory : items[5],
countschools : items[6],
            };


            gulp.src(categoriesPath.template)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: categoriesPath.collection + "/" + templateData.slug,
                    basename: "_index",
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });

});

gulp.task('yml:categories', function() {

    fs.readFile('./'+ categoriesPath.csv +'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < (rows.length)-1; i++) {
            var items = rows[i]

         // https://gist.github.com/antonreshetov/c41a13cfb878a3101196c3a62de81778
            var categoryTranslit = translit(items[2], {
                lang: 'en'
              })

            var templateData = {
title : items[1],
schools : items[2],
subcategory : items[3],
slug : items[4],
slugsubcategory : items[5],
countschools : items[6],
            };


            gulp.src(categoriesPath.templateyml)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: "data/yml/categories",
                    basename: templateData.slug,
                    extname: ".yml"}))
                .pipe(gulp.dest('.'));
            }
      });

});

gulp.task('del:categories', function () {
  return del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'content/categories/**/*',
    'data/yml/categories/**/*'
  ]);
});

// DELETE FOLDER
// DOWNLAOD CSV
// CREATE SCHOOLS MS FILES
// DEL UNDEFINE-.MD - NOT WORKING
gulp.task('create:categories', gulpSequence( 
    'del:categories',
    'download:categories',
    'md:categories',
    'yml:categories'
    ));

gulp.task('recreate:categories', gulpSequence( 
    'del:categories',
    'md:categories',
    'yml:categories'
    ));