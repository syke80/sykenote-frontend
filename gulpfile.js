var gulp = require('gulp'),
    requireDir = require('require-dir'),
    tasks = requireDir('./config/gulp/tasks'),
    dashboard = require('./config/gulp/utils/dashboard');

dashboard.show();

/* Default task */
gulp.task('default', ['serve-dev']);



/*

var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', function() {

  var tsResult = gulp.src("app/**/*.ts") // or tsProject.src() 
      .pipe(tsProject());
 
  return tsResult.js.pipe(gulp.dest('dist'));



  // copy html
  // run server
  // watch modifications
});
*/