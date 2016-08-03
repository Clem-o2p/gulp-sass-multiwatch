var gulp = require('gulp'),
	fs = require('fs'),
	path = require('path'),
	rename = require('gulp-rename'),
	cleanCSS = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	sass	 = require('gulp-sass'),
	zip = require('gulp-zip'),
	pngquant = require('imagemin-pngquant');

var scriptsPath = path.join('./', process.argv[4]);

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

gulp.task('sass', function() {
	var folders = getFolders(scriptsPath);

	folders.map(function(folder) {

	return gulp.src(path.join(scriptsPath, folder, '/**/*.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(rename(function(file) {
       		file.dirname = file.dirname.replace(/sass$/, "/");
    	}))
        .pipe(gulp.dest(path.join(scriptsPath, folder)));
    });
});

gulp.task('build', function() {
	return gulp.src(path.join(scriptsPath))
        .pipe(zip(scriptsPath + '.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
	console.log(
		`And now my watch begins...
			|>
		        |<
		[|||||||{O}:::<======================================-
		        |<
		        |> `);

    gulp.watch('./**/*.scss', ['sass']);

});