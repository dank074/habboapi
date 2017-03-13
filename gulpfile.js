var gulp 			= require('gulp'),
    del 			= require('del'),
    sourcemaps		= require('gulp-sourcemaps'),
	templateCache 	= require('gulp-angular-templatecache'),
    browserify		= require('browserify'),
    source			= require('vinyl-source-stream'),
    buffer 			= require('vinyl-buffer'),
    uglify 			= require('gulp-uglify'),
    gutil 			= require('gulp-util'),
    ngAnnotate 		= require('browserify-ngannotate');

gulp.task('clean', function(cb)
{
    return del(['./build'], cb);
});

gulp.task('views', ['clean'], function()
{
    return gulp.src(['./src/views/*.html', './src/views/**/*.html'])
        .pipe(templateCache('app.template-cache.js', { module: 'app.templates', standalone: true }))
        .pipe(gulp.dest('./src/config'));
});

gulp.task('scripts', ['clean'], function()
{
    var scripts = browserify({
        entries: './src/app.js',
        paths: ['./src/**/*'],
        transform: [ngAnnotate]
    });

    return scripts.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build'));
});

gulp.task('build', ['views', 'scripts'], function()
{
    return gulp.src('./src/views/index.html')
        .pipe(gulp.dest('./build/'));
});