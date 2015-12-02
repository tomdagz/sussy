var gulp = require('gulp');

var compass = require('gulp-compass');

var jade = require('gulp-jade');

var connect = require('gulp-connect');

var outputDir = 'build/development';

//var plumber = require('gulp-plumber');

function errorlog(error){
	console.error.bind(error);
	this.emit('end');
}

// Tasks

gulp.task('compass', function(){
	gulp.src('src/scss/**/*.{scss,sass}')
		//.pipe(plumber())
		.pipe(compass({
			sytle: 'expanded',
			css: outputDir+'/css',
			sass: 'src/scss', 
			require: ['susy', 'breakpoint']}
		))//.on('error', sass.logError))
		.on('error', errorlog)
		.pipe(gulp.dest(outputDir+'/css'))
		//.pipe(livereolad());
		.pipe(connect.reload());	
});

gulp.task('jade-compile', function(){
	return gulp.src('src/templates/**/*.jade')
		.pipe(jade(
			{
				pretty:true
			}
		))
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload());
});

gulp.task('jade-watch', ['jade-compile'])

gulp.task('connect', function(){
	connect.server({
		root: outputDir,
		livereolad: true 
	});
});

gulp.task('watch', function(){
	gulp.watch('src/scss/**/*.{scss,sass}', ['compass'])
	gulp.watch('src/templates/**/*.jade',['jade-watch'])
});

gulp.task('default', ['jade-watch', 'compass', 'watch', 'connect']);