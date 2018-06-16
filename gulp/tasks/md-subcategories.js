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



var subcategoriesPath = {};
subcategoriesPath.collection = 'content/subcategories';
subcategoriesPath.csv        = 'data/google/subcategories';
subcategoriesPath.template   = '_gulp-templates/nunjucks/subcategories.html';
module.exports = subcategoriesPath;


gulp.task('download:subcategories', done => {
    shell.exec('python3 twilliosheets.py');
    done();
});



gulp.task('md:subcategories', function() {

    fs.readFile('./'+ subcategoriesPath.csv +'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < rows.length; i++) {
            var items = rows[i]

         // https://gist.github.com/antonreshetov/c41a13cfb878a3101196c3a62de81778
            var subcategoryTranslit = translit(items[2], {
                lang: 'en'
              })

            var templateData = {
                subcategory : items[2],
                SchoolsUID : items[3],
                category: items[1],
                subcategoryTranslit: subcategoryTranslit,
                slugCategory : items[4],
                slugSubcategory: items[5],

            };





            gulp.src(subcategoriesPath.template)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: subcategoriesPath.collection + "/" + templateData.slugSubcategory,
                    basename: "_index",
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });

});

gulp.task('del:subcategories', function () {
  return del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'content/subcategories/**/*',
  ]);
});

gulp.task('content:subcategories', function(){ return runSequence(
    'del:subcategories',
    'download:subcategories',
    'md:subcategories'
    )});

gulp.task('recontent:subcategories', function(){ return runSequence(
    'del:subcategories',
    'md:subcategories'
    )});var gulp         = require('gulp');