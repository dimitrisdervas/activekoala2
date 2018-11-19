var gulp            = require('gulp');
var Papa            = require("papaparse");
var fs              = require('fs');
var nunjucks     = require('gulp-nunjucks');
var nunjucksRender  = require('gulp-nunjucks-render');
var translit        = require('speakingurl');
var rename          = require('gulp-rename');
var shell           = require('shelljs');
var runSequence     = require('run-sequence');
var gulpSequence = require('gulp-sequence')
var del             = require('del');




var organisationsPath = {};
organisationsPath.collection = 'content/organisations';
organisationsPath.csv        = 'csv/google/organisations';
organisationsPath.template   = '_gulp-templates/nunjucks/organisations.html';
module.exports = organisationsPath;

// DOWNLAOD CSV
gulp.task('download:organisations', done => {
    shell.exec('python3 sheetsAll.py');
    done();
});


// CREATE SCHOOLS MS FILES
gulp.task('md:organisations', function() {

    fs.readFile('./'+ organisationsPath.csv +'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < (rows.length)-1; i++) {
            var items = rows[i]
         // https://gist.github.com/antonreshetov/c41a13cfb878a3101196c3a62de81778
            var cityTranslit = translit(items[2], {
                lang: 'en'
              })
            var orgTranslit = translit(items[1], {
                lang: 'en'
              })

            var templateData = {
                organisation : items[1],
                UID : items[2],
                schoolsUID : items[4],
                schoolscategory : items[5],
                schoolssubcategory : items[6],
                facebook : items[7]
            };




            gulp.src(organisationsPath.template)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: organisationsPath.collection +'/'+ templateData.UID + "-" + orgTranslit,
                    basename: "index",
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });

});

// DELETE FOLDER SCHOOLS
gulp.task('del:organisations', function () {
  return del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'content/organisations/**/*'
  ]);
});

// DELETE FOLDER
// DOWNLAOD CSV
// CREATE SCHOOLS MS FILES
// DEL UNDEFINE-.MD - NOT WORKING
gulp.task('csv:organisations', gulpSequence( 
    'del:organisations',
    'download:organisations',
    'md:organisations'
    ));

gulp.task('create:organisations', gulpSequence( 
        'csv:organisations',
        'del:undefined'
        ));

// DELETE FOLDER
// CREATE SCHOOLS MS FILES
// DEL UNDEFINE-.MD - NOT WORKING
gulp.task('nocsv:organisations', gulpSequence( 
        'del:organisations',
        'md:organisations'
        ));

gulp.task('recreate:organisations', gulpSequence( 
        'nocsv:organisations',
        'del:undefined'
        ));

// DEL UNDEFINE-.MD - NOT WORKING
gulp.task('del:undefined', function () {
   del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'content/organisations/*.md',
  ]);
});