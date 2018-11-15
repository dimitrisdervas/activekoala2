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
            var cityTranslit = translit(items[2], {
                lang: 'en'
              })
            var schoolTranslit = translit(items[1], {
                lang: 'en'
              })

            var templateData = {
                school : items[1],
                cities : items[2],
                perioxi : items[3],
                category : items[4],
                subcategory : items[5],
                customCategory : items[6],
                organization : items[7],
                facebook : items[8],
                website : items[9],
                logo : items[10],
                address : items[11],
                zipcode : items[12],
                phone : items[13],
                email : items[14],
                courses : items[15],
                place : items[16],
                rensponsible : items[17],
                description : items[18],
                verified : items[19],
                mapblock : items[20],
                yearCreated : items[21],
                dataOrigin : items[22],
                mobile : items[23],
                type : items[24],
                toPublish : items[25],
                UID : items[26],
                facebookID : items[27],
                profilePhoto : items[28],
                coverPhoto : items[29],
                userID : items[30],
                dateAdded : items[31],
                slugCategories : items[32],
                slugSubcategories : items[33],
                longitude : items[34],
                latitude : items[35],
                Fetchrss : items[36],
                schoolTranslit : schoolTranslit,
                cityTranslit : cityTranslit,
                facebook112018link : items[45], 
                facebook112018about : items[46], 
                facebook112018checkins : items[47], 
                facebook112018bio : items[48], 
                facebook112018category : items[49], 
                facebook112018category_list : items[50], 
                facebook112018is_owned : items[51], 
                facebook112018website : items[52], 
                facebook112018picturewidth : items[53], 
                facebook112018pictureheight : items[54], 
                facebook112018pictureurl : items[55], 
                facebook112018contact_address : items[56], 
                facebook112018single_line_address : items[57], 
                facebook112018city : items[58], 
                facebook112018longitude : items[59], 
                facebook112018latitude : items[60], 
                facebook112018cover : items[61], 
                facebook112018phone : items[62], 
                facebook112018description : items[63], 
                facebook112018emails : items[64], 
                facebook112018name : items[65], 
                facebook112018page_token : items[66], 
                facebook112018place_type : items[57], 
                facebook112018username : items[68], 
            };




            gulp.src(schoolsPath.template)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: schoolsPath.collection +'/'+ cityTranslit + '/' + items[26] + "-" + schoolTranslit,
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