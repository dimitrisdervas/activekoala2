var gulp         = require('gulp');
var Papa         = require("papaparse");
var fs           = require('fs');
var nunjucksRender = require('gulp-nunjucks-render');


gulp.task('airschool-nunjuckrender', function() {

    fs.readFile('./'+schools.csv+'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < rows.length; i++) {
            var items = rows[i];

            var templateData = {
                    School : items[0],
                    City: items[1],
                    Perioxi: items[2],
                    Category: items[3],
                    Subcategory: [items[4]],
                    Facebook: items[5],
                    Website: items[6],
                    email: items[7],
                    Organization: items[8],
                    Logo: items[9],
                    Address: items[10],
                    zipcode: items[11],
                    Phone: items[12],
                    Courses: items[13],
                    Place: items[14],
                    Rensponsible: items[15],
                    Description: items[16],
                    Publish: items[23],
                    UID: items[24],
            };

// 0 School
// 1 City
// 2 Perioxi
// 3 Category
// 4 Subcategory
// 5 Website
// 6 Facebook
// 7 email
// 8 Organization
// 9 Logo
// 10 Address
// 11 TK
// 12 Phone
// 13 Courses
// 14 Place
// 15 Rensponsible
// 16 Description
// 17 Verified
// 18 map block field
// 19 έτος ίδρυσης
// 20 data origin
// 21 gulp-main-bower-files
// 22 type
// 23 topublish
// 24 UID

            var items1 = translit(items[1], {
                lang: 'en'
              })
            var items0 = translit(items[0], {
                lang: 'en'
              })

            // https://github.com/mozilla/nunjucks/issues/396
            var manageEnvironment = function(environment) {
              environment.addFilter('split', function(str, seperator) {
                    return str.split(seperator);
                });
            }


            // https://gist.github.com/antonreshetov/c41a13cfb878a3101196c3a62de81778
            gulp.src(schools.template)
                .pipe(nunjucksRender({
                  data: templateData
                }))
                .pipe(rename({
                    dirname: schools.collection+'/'+items1,
                    basename: items[24] + "-" + items0,
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });
