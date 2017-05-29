var gulp            = require('gulp');
var notify          = require('gulp-notify');
var source          = require('vinyl-source-stream');
var browserify      = require('browserify');
var babelify        = require('babelify');
var ngAnnotate      = require('browserify-ngannotate');
var browserSync     = require('browser-sync').create();
var rename          = require('gulp-rename');
var templateCache   = require('gulp-angular-templatecache');
var uglify          = require('gulp-uglify');
var sourcemaps      = require('gulp-sourcemaps');
var merge           = require('merge-stream');

gulp.task('browserify', ['views'], function()
{
    return browserify('./src/app.js')
        .transform(babelify, {presets: ["es2015"]})
        .transform(ngAnnotate)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('views', function()
{
    return gulp.src(['./src/**/*.html'])
        .pipe(templateCache('template-cache.js', { module: 'app.templates', standalone: true }))
        .pipe(gulp.dest('./src/config/'));
});

gulp.task('build', ['browserify'], function()
{        
    var js = gulp.src("build/bundle.js")
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/'));
    
    return js;
});