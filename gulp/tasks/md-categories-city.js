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
categoriesPath.collection = 'content';
categoriesPath.csv        = 'csv/google/categories';
categoriesPath.template   = '_gulp-templates/nunjucks/categoriesCity.html';
categoriesPath.templateyml   = '_gulp-templates/nunjucks/categoriesyml.html';
module.exports = categoriesPath;


gulp.task('download:categories', done => {
    shell.exec('python3 sheetsAll.py');
    done();
});



gulp.task('md:categoriesathens', function() {

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
                category: items[1],
                Courses: items[2],
                SchoolsUID : items[3],
                subcategory : items[4],
                slugCategory: items[5],
                slugSubcategories: items[6],
                schoolscount: items[7],
                city: "Αθήνα",
            };


            gulp.src(categoriesPath.template)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: categoriesPath.collection + "/categoriesathens/" + templateData.slugCategory,
                    basename: "_index",
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });

});

gulp.task('md:categoriesthess', function() {

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
                category: items[1],
                Courses: items[2],
                SchoolsUID : items[3],
                subcategory : items[4],
                slugCategory: items[5],
                slugSubcategories: items[6],
                schoolscount: items[7],
                city: "Θεσσαλονίκη",
            };


            gulp.src(categoriesPath.template)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: categoriesPath.collection + "/categoriesthess/" + templateData.slugCategory,
                    basename: "_index",
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });

});



gulp.task('del:categoriescity', function () {
  return del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'content/categoriesthess/**/*',
    'content/categoriesathens/**/*',
  ]);
});

// DELETE FOLDER
// DOWNLAOD CSV
// CREATE SCHOOLS MS FILES
// DEL UNDEFINE-.MD - NOT WORKING
gulp.task('create:categoriescity', gulpSequence( 
    'del:categoriescity',
    'md:categoriesathens',
    'md:categoriesthess'
    ));
