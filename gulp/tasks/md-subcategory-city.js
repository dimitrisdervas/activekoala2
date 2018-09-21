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
subcategoriesPath.collection = 'content';
subcategoriesPath.csv        = 'csv/google/subcategories';
subcategoriesPath.template   = '_gulp-templates/nunjucks/subcategoriesCity.html';
subcategoriesPath.templateyml   = '_gulp-templates/nunjucks/subcategoriesyml.html';
module.exports = subcategoriesPath;


gulp.task('md:subcategoriesAthens', function() {

    fs.readFile('./'+ subcategoriesPath.csv +'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < (rows.length)-1; i++) {
            var items = rows[i]

            var templateData = {
                subcategory : items[1],
                category: items[2],
                slugSubcategory:  items[4],
                slugCategory: items[5],
                city: "Αθήνα",
            };



            gulp.src(subcategoriesPath.template)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: subcategoriesPath.collection + "/subcategoryathens/" + templateData.slugSubcategory,
                    basename: "_index",
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });

});

gulp.task('md:subcategoriesThess', function() {

    fs.readFile('./'+ subcategoriesPath.csv +'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < (rows.length)-1; i++) {
            var items = rows[i]

            var templateData = {
                subcategory : items[1],
                category: items[2],
                slugSubcategory:  items[4],
                slugCategory: items[5],
                city: "Θεσσαλονίκη",
            };



            gulp.src(subcategoriesPath.template)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: subcategoriesPath.collection + "/subcategorythessaloniki/" + templateData.slugSubcategory,
                    basename: "_index",
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });

});


gulp.task('del:subcategoriesCity', function () {
  return del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'content/cityathens/**/*',
    'content/citythessaloniki/**/*'
  ]);
});

gulp.task('create:subcategoriesCity', gulpSequence(
    'del:subcategoriesCity',
    'md:subcategoriesAthens',
    'md:subcategoriesThess',
    ));
