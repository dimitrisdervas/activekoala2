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



var categoriesPath = {};
categoriesPath.collection = 'content/categories';
categoriesPath.csv        = 'data/google/categories';
categoriesPath.template   = '_gulp-templates/nunjucks/categories.html';
module.exports = categoriesPath;


gulp.task('download:categories', done => {
    shell.exec('python3 twilliosheets.py');
    done();
});



gulp.task('md:categories', function() {

    fs.readFile('./'+ categoriesPath.csv +'.csv', 'utf8', function(err, data){
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
                SchoolsUID : items[3],
                subcategory : items[4],
                category: items[2],
                slugCategories: items[5],
                slugSubcategories: items[6],
            };


            gulp.src(categoriesPath.template)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: categoriesPath.collection + "/" + templateData.slugCategories,
                    basename: "_index",
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });

});



gulp.task('del:categories', function () {
  return del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'content/categories/**/*',
  ]);
});

gulp.task('content:categories', function(){ return runSequence(
    'del:categories',
    'download:categories',
    'md:categories'
    )});

gulp.task('recontent:categories', function(){ return runSequence(
    'del:categories',
    'md:categories'
    )});var gulp         = require('gulp');