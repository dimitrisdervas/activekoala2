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




var schoolsPath = {};
schoolsPath.collection = 'content/schools';
schoolsPath.csv        = 'csv/google/schools';
schoolsPath.template   = '_gulp-templates/nunjucks/schools.html';
module.exports = schoolsPath;

// DOWNLAOD CSV
gulp.task('download:schools', done => {
    shell.exec('python3 sheetsAll.py');
    done();
});


// CREATE SCHOOLS MS FILES
gulp.task('md:schools', function() {

    fs.readFile('./'+ schoolsPath.csv +'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < (rows.length)-1; i++) {
            var items = rows[i]
         // https://gist.github.com/antonreshetov/c41a13cfb878a3101196c3a62de81778
            var cityTranslit = translit(items[10], {
                lang: 'en'
              })
            var schoolTranslit = translit(items[1], {
                lang: 'en'
              })
            var orgTranslit = translit(items[6], {
                lang: 'en'
              })
            var orgURL = items[20] + "-" + orgTranslit


            var templateData = {
                schools : items[1],
                time : items[2],
                school_facebook : items[3],
                school_facebook_id : items[4],
                school_website : items[5],
                organisation : items[6],
                org_facebook : items[7],
                org_website : items[8],
                schooluid : items[9],
                city : items[10],
                perioxi : items[11],
                address : items[12],
                create_place : items[13],
                place : items[14],
                categorynoslug : items[15],
                subcategoriesnoslug : items[16],
                category : items[17],
                subcategory : items[18],
                organisationmeselect : items[19],
                organisation_uid : items[20],
                courses : items[21],
                published : items[22],
                orgurl: orgURL,
                schoolTranslit : schoolTranslit,
                cityTranslit : cityTranslit
            };




            gulp.src(schoolsPath.template)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: schoolsPath.collection +'/'+ cityTranslit + '/' + items[9] + "-" + schoolTranslit,
                    basename: "index",
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });

});

// DELETE FOLDER SCHOOLS
gulp.task('del:schools', function () {
  return del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'content/schools/**/*'
  ]);
});

// DELETE FOLDER
// DOWNLAOD CSV
// CREATE SCHOOLS MS FILES
// DEL UNDEFINE-.MD - NOT WORKING
gulp.task('csv:schools', gulpSequence( 
    'del:schools',
    'download:schools',
    'md:schools'
    ));

gulp.task('create:schools', gulpSequence( 
        'csv:schools',
        'del:undefined'
        ));

// DELETE FOLDER
// CREATE SCHOOLS MS FILES
// DEL UNDEFINE-.MD - NOT WORKING
gulp.task('nocsv:schools', gulpSequence( 
        'del:schools',
        'md:schools'
        ));

gulp.task('recreate:schools', gulpSequence( 
        'nocsv:schools',
        'del:undefined'
        ));

// DEL UNDEFINE-.MD - NOT WORKING
gulp.task('del:undefined', function () {
   del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'content/schools/*.md',
  ]);
});