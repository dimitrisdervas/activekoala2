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



var schoolsPath = {};
schoolsPath.collection = 'content/schools';
schoolsPath.csv        = 'data/google/schools';
schoolsPath.template   = '_gulp-templates/nunjucks/schools.html';
module.exports = schoolsPath;


gulp.task('download:schools', done => {
    shell.exec('python3 twilliosheets.py');
    done();
});



gulp.task('md:schools', function() {

    fs.readFile('./'+ schoolsPath.csv +'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < rows.length; i++) {
            var items = rows[i]
         // https://gist.github.com/antonreshetov/c41a13cfb878a3101196c3a62de81778
            var cityTranslit = translit(items[4], {
                lang: 'en'
              })
            var schoolTranslit = translit(items[23], {
                lang: 'en'
              })

            var templateData = {
              UID : items[1],
                address : items[2],
                category : items[3],
                city : items[4],
                courses : items[5],
                coverPhoto : items[6],
                customCategory : items[7],
                dataOrigin : items[8],
                dateAdded : items[9],
                description : items[10],
                email : items[11],
                facebook : items[12],
                facebookID : items[13],
                logo : items[14],
                mapblock : items[15],
                mobile : items[16],
                organization : items[17],
                perioxi : items[18],
                phone : items[19],
                place : items[20],
                profilePhoto : items[21],
                rensponsible : items[22],
                school : items[23],
                slugCategories : items[24],
                slugSubcategories : items[25],
                subcategory : items[26],
                toPublish : items[27],
                type : items[28],
                userID : items[29],
                verified : items[30],
                website : items[31],
                yearCreated : items[32],
                zipcode : items[33],
                schoolTranslit : schoolTranslit,
                cityTranslit : cityTranslit,
            };




            gulp.src(schoolsPath.template)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: schoolsPath.collection +'/'+ cityTranslit,
                    basename: items[1] + "-" + schoolTranslit,
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });

});

gulp.task('del:schools', function () {
  return del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'content/schools/**/*',
  ]);
});

gulp.task('content:schools', function(){ return runSequence(
    'del:schools',
    'download:schools',
    'md:schools'
    )});

gulp.task('recontent:schools', function(){ return runSequence(
    'del:schools',
    'md:schools'
    )});