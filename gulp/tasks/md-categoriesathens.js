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



var athenscategoriesPath = {};
athenscategoriesPath.collection = 'content/categoriesathens';
athenscategoriesPath.csv        = 'csv/google/categories';
athenscategoriesPath.template   = '_gulp-templates/nunjucks/categoriesathens.html';
athenscategoriesPath.templateyml   = '_gulp-templates/nunjucks/categoriesathensyml.html';
module.exports = athenscategoriesPath;


gulp.task('download:athenscategories', done => {
    shell.exec('python3 sheetsAll.py');
    done();
});



gulp.task('md:athenscategories', function() {

    fs.readFile('./'+ athenscategoriesPath.csv +'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < rows.length; i++) {
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
athenscity : items[7],
athensschools : items[8],
athenscount : items[9],
            };


            gulp.src(athenscategoriesPath.template)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: athenscategoriesPath.collection + "/" + templateData.slug,
                    basename: "_index",
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });

});

gulp.task('yml:athenscategories', function() {

    fs.readFile('./'+ athenscategoriesPath.csv +'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < rows.length; i++) {
            var items = rows[i]

            var templateData = {
title : items[1],
schools : items[2],
subcategory : items[3],
slug : items[4],
slugsubcategory : items[5],
countschools : items[6],
athenscity : items[7],
athensschools : items[8],
athenscount : items[9],
            };


            gulp.src(athenscategoriesPath.templateyml)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: "data/yml/categoriesathens",
                    basename: templateData.slugCategory,
                    extname: ".yml"}))
                .pipe(gulp.dest('.'));
            }
      });

});

gulp.task('del:athenscategories', function () {
  return del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'content/categoriesathens/**/*',
    'data/yml/categoriesathens/**/*'
  ]);
});

// DELETE FOLDER
// DOWNLAOD CSV
// CREATE SCHOOLS MS FILES
// DEL UNDEFINE-.MD - NOT WORKING
gulp.task('create:athenscategories', function(){ return runSequence(
    'del:athenscategories',
    'download:athenscategories',
    'md:athenscategories',
    'yml:athenscategories'
    )});

gulp.task('recreate:athenscategories', function(){ return runSequence(
    'del:athenscategories',
    'md:athenscategories',
    'yml:athenscategories'
    )});