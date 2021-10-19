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


var subcategoriesPath = {};
subcategoriesPath.collection = 'content/subcategories';
subcategoriesPath.csv        = 'csv/google/subcategories';
subcategoriesPath.template   = '_gulp-templates/nunjucks/subcategories.html';
subcategoriesPath.templateyml   = '_gulp-templates/nunjucks/subcategoriesyml.html';
subcategoriesPath.templatecity = '_gulp-templates/nunjucks/subcategoriesCity.html';
module.exports = subcategoriesPath;


gulp.task('download:subcategories', done => {
    shell.exec('python3 sheetsAll.py');
    done();
});



gulp.task('md:subcategories', function() {

    fs.readFile('./'+ subcategoriesPath.csv +'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < (rows.length)-1; i++) {
            var items = rows[i]

         // https://gist.github.com/antonreshetov/c41a13cfb878a3101196c3a62de81778
            var subcategoryTranslit = translit(items[1], {
                lang: 'en'
              })

            var templateData = {
subcategory : items[1],
categories : items[2],
schoolsuid : items[3],
slugsubcategory : items[4],
slugcategory : items[5],
countschools : items[6],
            };



            gulp.src(subcategoriesPath.template)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: subcategoriesPath.collection + "/" + templateData.slugsubcategory,
                    basename: "_index",
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });

});

gulp.task('md:subcategoryathens', function() {

    fs.readFile('./'+ subcategoriesPath.csv +'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < (rows.length)-1; i++) {
            var items = rows[i]

         // https://gist.github.com/antonreshetov/c41a13cfb878a3101196c3a62de81778
            var subcategoryTranslit = translit(items[1], {
                lang: 'en'
              })

            var templateData = {
subcategory : items[1],
categories : items[2],
schoolsuid : items[3],
slugsubcategory : items[4],
slugcategory : items[5],
countschools : items[6],
            };



            gulp.src(subcategoriesPath.templatecity )
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: 'content/subcategoryathens' + "/" + templateData.slugsubcategory,
                    basename: "_index",
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });

});

gulp.task('md:subcategorythessaloniki', function() {

    fs.readFile('./'+ subcategoriesPath.csv +'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < (rows.length)-1; i++) {
            var items = rows[i]

         // https://gist.github.com/antonreshetov/c41a13cfb878a3101196c3a62de81778
            var subcategoryTranslit = translit(items[1], {
                lang: 'en'
              })

            var templateData = {
                subcategory : items[1],
                category: items[2],
                SchoolsUID: items[8],
                slugSubcategory:  items[4],
                slugCategory: items[5],
                schoolscount: items[12],
            };



            gulp.src(subcategoriesPath.templatecity )
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: 'content/subcategorythessaloniki' + "/" + templateData.slugsubcategory,
                    basename: "_index",
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });

});

gulp.task('yml:subcategories', function() {

    fs.readFile('./'+ subcategoriesPath.csv +'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < (rows.length)-1; i++) {
            var items = rows[i]

         // https://gist.github.com/antonreshetov/c41a13cfb878a3101196c3a62de81778
            var subcategoryTranslit = translit(items[1], {
                lang: 'en'
              })

            var templateData = {
subcategory : items[1],
categories : items[2],
schoolsuid : items[3],
slugsubcategory : items[4],
slugcategory : items[5],
countschools : items[6],
            };

            gulp.src(subcategoriesPath.templateyml)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: "data/yml/subcategories",
                    basename: templateData.slugsubcategory,
                    extname: ".yml"}))
                .pipe(gulp.dest('.'));
            }
      });

});

gulp.task('del:subcategories', function () {
  return del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'content/subcategories/**/*',
    'content/subcategoryathens/**/*',
    'content/subcategorythessaloniki/**/*',
    'data/yml/subcategories/**/*'
  ]);
});

gulp.task('create:subcategories', gulpSequence(
    'del:subcategories',
    'download:subcategories',
    'md:subcategories',
    'md:subcategoryathens',
    'md:subcategorythessaloniki',
    'yml:subcategories'
    ));

gulp.task('recreate:subcategories', gulpSequence(
    'del:subcategories',
    'md:subcategories',
    'md:subcategoryathens',
    'md:subcategorythessaloniki',
    'yml:subcategories'
    ));