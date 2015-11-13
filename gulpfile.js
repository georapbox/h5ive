(function () {
    'use strict';

    var gulp        = require('gulp'),
        browserify  = require('browserify'),
        source      = require('vinyl-source-stream'),
        uglify      = require('gulp-uglify'),
        buffer      = require('vinyl-buffer'),
        sourcemaps  = require('gulp-sourcemaps'),
        gutil       = require('gulp-util'),
        header      = require('gulp-header'),
        pkg         = require('./package.json');

    var banner = [
        '/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %> (<%= pkg.stability %>)',
        ' * @author <%= pkg.author %>',
        ' * @homepage v<%= pkg.homepage %>',
        ' * @repository v<%= pkg.repository.url %>',
        ' */',
        ''
    ].join('\n');

    /**
     * ---------------------------------
     * TASKS FOR DEVELOPMENT ENVIRONMENT
     * ---------------------------------
     */
    // bundle_js
    gulp.task('bundle_js', function () {
        return browserify('./src/core.h5ive.js', {
            debug: true,
            paths: ['./', './node_modules', './src']
        }).
        bundle().
        pipe(source(pkg.name + '.js')).
        pipe(buffer()).
        pipe(sourcemaps.init({loadMaps: true})).
        on('error', gutil.log).
        pipe(header(banner, {pkg: pkg})).
        pipe(sourcemaps.write('./')).
        pipe(gulp.dest('./dist'));
    });

    // build:dev
    gulp.task('build:dev', ['bundle_js']);

    // watch
    gulp.task('watch', function () {
        gulp.watch('src/**/*.*', ['build:dev']);
    });

    /**
     * --------------------------------
     * TASKS FOR PRODUCTION ENVIRONMENT
     * --------------------------------
     */
    // bundle_uglify_js
    gulp.task('bundle_uglify_js', function () {
        return browserify('./src/core.h5ive.js', {
            debug: true,
            paths: ['./', './node_modules', './src']
        }).
        bundle().
        pipe(source(pkg.name + '.min.js')).
        pipe(buffer()).
        pipe(uglify({
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        })).
        on('error', gutil.log).
        pipe(header(banner, {pkg: pkg})).
        pipe(gulp.dest('./dist'));
    });

    // build:live
    gulp.task('build:live', ['bundle_uglify_js']);

    // build:all
    gulp.task('build:all', ['build:dev', 'build:live']);
}());
