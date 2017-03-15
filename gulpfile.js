var gulp          = require('gulp');
var notify        = require('gulp-notify');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();
var rename        = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');
var merge         = require('merge-stream');

gulp.task('browserify', ['views'], function()
{
    return browserify('./src/app.js')
        .transform(babelify, {presets: ["es2015"]})
        .transform(ngAnnotate)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('html', function()
{
    return gulp.src('src/views/index.html')
        .pipe(gulp.dest('./build/'));
});

gulp.task('views', function()
{
    return gulp.src(['./src/views/*.html', './src/views/**/*.html'])
        .pipe(templateCache('app.template-cache.js', { module: 'app.templates', standalone: true }))
        .pipe(gulp.dest('./src/config/'));
});

gulp.task('build', ['html', 'browserify'], function()
{
    var html    = gulp.src('build/index.html').pipe(gulp.dest('./dist/')),
        js      = gulp.src("build/bundle.js").pipe(uglify()).pipe(gulp.dest('./dist/'));
    
    return merge(html, js);
});

gulp.task('default', ['html', 'browserify'], function()
{
    browserSync.init(['./build/**/**.**'],
    {
        server: './build',
        port: 4000,
        notify: false,
        ui: {
            port: 4001
        }
    });
    
    gulp.watch('src/index.html', ['html']);
    gulp.watch(['./src/views/*.html', './src/views/**/*.html'], ['views']);
    gulp.watch('./src/js/**/*.js', ['browserify']);
});