const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript-compiler");
const nodemon = require("gulp-nodemon");
const tslint = require("gulp-tslint");

gulp.task("default", ["compile", "watch", "nodemon"]);

gulp.task("watch", function () {
  return gulp.watch("src/**/*.*", ["compile"]);
});

gulp.task("compile", function () {
  return gulp
    .src("src/**/*.ts")
    .pipe(tsc({
      module: "commonjs",
      experimentalDecorators: true,
      target: "es6",
      sourcemap: true,
      logErrors: true
    }))
    .pipe(gulp.dest("build"));
});

gulp.task('clean', function () {
  return del(['build']);
});

gulp.task("nodemon", function () {
  nodemon({script: "build/app.js"});
});

gulp.task("tslint", () =>
  gulp.src("src/**/*.ts")
    .pipe(tslint({
      formatter: "verbose"
    }))
    .pipe(tslint.report())
);
