var gulp            = require('gulp');
var Papa            = require("papaparse");
var fs              = require('fs');
var nunjucks        = require('gulp-nunjucks');
var nunjucksRender  = require('gulp-nunjucks-render');
var translit        = require('speakingurl');
var rename          = require('gulp-rename');
var shell           = require('shelljs');
var runSequence     = require('run-sequence');
var gulpSequence    = require('gulp-sequence')
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

            var orgTranslit = translit(items[0], {
                lang: 'en'
              })

            var cityTranslit = translit(items[23], {
                lang: 'en'
              })

            var templateData = {
                organization : items[0],
orguid : items[1],
created_time : items[2],
schools : items[3],
categorynoslug : items[4],
subcategoriesnoslug : items[5],
categories : items[6],
subcategories : items[7],
facebook_url : items[8],
org_facebook : items[9],
google_url : items[10],
org_website : items[11],
facebook_website : items[12],
old_org_website : items[13],
website_notworking : items[14],
facebook_id : items[15],
olduid : items[16],
places : items[17],
count_subcategories : items[18],
count_schools : items[19],
logo : items[20],
email : items[21],
description : items[22],
cities : items[23],
perioxes : items[24],
oldphotouid : items[25],
responsible : items[26],
long : items[27],
lat  : items[28],
long_facebook : items[29],
lat_facebook : items[30],
phone : items[31],
phone_facebook : items[32],
zipcode : items[33],
address : items[34],
address_facebook : items[35],
old_facebook_id : items[36],
text : items[37],
empty_cells : items[38],
publish : items[39],
gforms_link : items[40],
gforms_url : items[41],
from : items[42],
orgTranslit : orgTranslit,
cityTranslit : cityTranslit,
            };




                gulp.src(organisationsPath.template)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: organisationsPath.collection +'/'+ templateData.orguid,
                    basename: "index",
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });

});


// gulp.task('download:facebook', function () {
//      fs.readFile('./'+ organisationsPath.csv +'.csv', 'utf8', function(err, data){
//         if (err) throw err;

//         parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
//         rows = parsed.data;

//         for(var i = 1; i < (rows.length)-1; i++) {
//             var items = rows[i]

//             var orgTranslit = translit(items[1], {
//                 lang: 'en'
//               })

//             var templateData = {
//                 organisation : items[1],
//                 UID : items[2],
//                 facebookCover : items[],
//                 facebookProfile : items[]
//             };

//             const files = [
//                 {
//                     url: templateData.facebookCover,
//                     file: templateData.UID + "-" + orgTranslit + "_cover.jpg"
//                 },
//                 {
//                     url: templateData.facebookProfile,
//                     file: templateData.UID + "-" + orgTranslit + "_profile.jpg"
//                 }
//             ];

//             return download(files)
//             .pipe(gulp.dest('organisationsPath.collection +'/'+ templateData.UID + "-" + orgTranslit'));


//     }
// });



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