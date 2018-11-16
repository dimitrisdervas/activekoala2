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



var thesscategoriesPath = {};
thesscategoriesPath.collection = 'content/categoriesthessaloniki';
thesscategoriesPath.csv        = 'csv/google/categories';
thesscategoriesPath.template   = '_gulp-templates/nunjucks/categoriesthessaloniki.html';
thesscategoriesPath.templateyml   = '_gulp-templates/nunjucks/categoriesthessalonikiyml.html';
module.exports = thesscategoriesPath;


gulp.task('download:thesscategories', done => {
    shell.exec('python3 sheetsAll.py');
    done();
});



gulp.task('md:thesscategories', function() {

    fs.readFile('./'+ thesscategoriesPath.csv +'.csv', 'utf8', function(err, data){
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
                category: items[1],
                Courses: items[2],
                slugCategory: items[5],
                city: items[13],
                SchoolsUID : items[14],
                subcategory : items[15],
                slugSubcategories: items[16],
                schoolscount: items[17],
            };


            gulp.src(thesscategoriesPath.template)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: thesscategoriesPath.collection + "/" + templateData.slugCategory,
                    basename: "_index",
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });

});

gulp.task('yml:thesscategories', function() {

    fs.readFile('./'+ thesscategoriesPath.csv +'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < rows.length; i++) {
            var items = rows[i]

         // https://gist.github.com/antonreshetov/c41a13cfb878a3101196c3a62de81778
            var categoryTranslit = translit(items[2], {
                lang: 'en'
              })

            var templateData = {
                category: items[1],
                subcategory : items[4],
                slugCategory: items[5],
                slugSubcategories: items[6],
            };


            gulp.src(thesscategoriesPath.templateyml)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: "data/yml/categoriesthessaloniki",
                    basename: templateData.slugCategory,
                    extname: ".yml"}))
                .pipe(gulp.dest('.'));
            }
      });

});

gulp.task('del:thesscategories', function () {
  return del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'content/categoriesthessaloniki/**/*',
    'data/yml/categoriesthessaloniki/**/*'
  ]);
});

// DELETE FOLDER
// DOWNLAOD CSV
// CREATE SCHOOLS MS FILES
// DEL UNDEFINE-.MD - NOT WORKING
gulp.task('create:thesscategories', function(){ return runSequence(
    'del:thesscategories',
    'download:thesscategories',
    'md:thesscategories',
    'yml:thesscategories'
    )});

gulp.task('recreate:thesscategories', function(){ return runSequence(
    'del:thesscategories',
    'md:thesscategories',
    'yml:thesscategories'
    )});