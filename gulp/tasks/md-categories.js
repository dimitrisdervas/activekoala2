gulp.task('categories', function() {



    fs.readFile('./'+config.csv+'.csv', 'utf8', function(err, data){
        if (err) throw err;

        parsed = Papa.parse(data,{delimiter: ',',   newline: ''});
        rows = parsed.data;

        for(var i = 1; i < rows.length; i++) {
            var items = rows[i];

            var templateData = {
                Name: items[0],
                Slug: translit(items[0], {lang: 'en'}),
                Courses: items[1],
                Schools: items[2],
                Categories: items[3]
            };
            var items0 = translit(items[0], {
                lang: 'en'
              })

            // https://gist.github.com/antonreshetov/c41a13cfb878a3101196c3a62de81778
            gulp.src(config.template)
                .pipe(handlebars(templateData))
                .pipe(rename({  
                    dirname: config.collection+'/',
                    basename: items0,
                    extname: ".md"}))
                .pipe(gulp.dest('.'));
            }
      });
});