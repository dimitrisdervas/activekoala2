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
var download = require("gulp-download");


var rssPath = {};
rssPath.collection = 'content/rss';
rssPath.csv        = 'csv/google/rss';
rssPath.template   = '_gulp-templates/nunjucks/rssfeed.html';

module.exports = rssPath;


gulp.task('download:rss', done => {
    shell.exec('python3 twilliosheets.py');
    done();
});



gulp.task('downloadrss:rss', function() {

    fs.readFile('./'+ rssPath.csv +'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < rows.length; i++) {
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
                city : items[2],
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
            };

                gulp.src(rssPath.template)
                download("http://fetchrss.com/rss/5b279ede8a93f8e87f8b4567732938689.csv")
                .pipe(rename({
                    dirname: rssPath.collection,
                    basename: items[26] + "-" + schoolTranslit,
                    extname: ".csv"}))
                .pipe(gulp.dest('.'));

            }

      });

});






gulp.task('del:rss', function () {
  return del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'content/rss/**/*',
    'content/rss/undefined-.md',
  ]);
});

gulp.task('content:rss', function(){ return runSequence(
    'del:rss',
    'download:rss',
    'md:rss',
    'del:undefined'
    )});

gulp.task('recontent:rss', function(){ 
    gulpSequence( 'del:rss','md:rss','del:undefined')});


gulp.task('del:undefined', function () {
  return del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'content/rss/undefined-.md',
  ]);
});