const gulp = require("gulp");
const del = require("del");
const ts = require("gulp-typescript");
const nodemon = require("gulp-nodemon");
const tslint = require("gulp-tslint");
const tsProject = ts.createProject("tsconfig.json");

gulp.task("default", ["compile", "watch", "nodemon"]);
gulp.task("build", ["clean", "compile"]);

gulp.task("watch", function () {
  return gulp.watch("src/**/*.*", ["compile"]);
});

gulp.task("compile", function () {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("build"));
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
