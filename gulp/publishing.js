// gulp
var gulp = require('gulp');
// plugins
var rsync = require('gulp-rsync');
// conf
var conf = require('./conf.js');
var options = conf.options;
var paths = conf.paths;

gulp.task('deploy', ['build'], function() {
  gulp.src(paths.dist)
    .pipe(rsync({
      root: paths.dist,
      destination: options.destination || paths.deploy,
      hostname: options.hostname || undefined,
      recursive: true,
    }));
});
