var gulp                    = require('gulp');
var source                  = require('vinyl-source-stream');
var browserify              = require('browserify');
var babelify                = require('babelify');
var ngAnnotate              = require('browserify-ngannotate');
var templateCache           = require('gulp-angular-templatecache');
var uglify                  = require('gulp-uglify');
var sourcemaps              = require('gulp-sourcemaps');

gulp.task('bundle-vendor', function()
{
    return browserify('./src/vendor.js')
        .bundle()
        .pipe(source('vendor.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('build-vendor', ['bundle-vendor'], function()
{
    return gulp.src('build/vendor.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('views', function()
{
    return gulp.src(['./src/**/*.html'])
        .pipe(templateCache('templateCache.js', { module: 'habboapi.templates', standalone: true }))
        .pipe(gulp.dest('./src/config/'));
});

gulp.task('bundle-app', ['views'], function()
{
    return browserify('./src/app.js')
        .transform(babelify, {presets: ['env']})
        .transform(ngAnnotate)
        .bundle()
        .pipe(source('habboapi.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('build-app', ['bundle-app'], function()
{
    return gulp.src('build/habboapi.js')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build-complete', ['build-vendor', 'build-app']);