var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var templates = require("gulp-ember-templates");

gulp.task("build-services", function () {
    gulp.src("./js/services/*.js")
        .pipe(concat("services.js"))
        .pipe(gulp.dest("./js"));
});
gulp.task("build-controllers", function () {
    gulp.src("./js/controllers/*.js")
        .pipe(concat("controllers.js"))
        .pipe(gulp.dest("./js"));
});
gulp.task("build-views", function () {
    gulp.src("./js/views/*.js")
        .pipe(concat("views.js"))
        .pipe(gulp.dest("./js"));
});
gulp.task("build-models", function () {
    gulp.src("./js/models/*.js")
        .pipe(concat("models.js"))
        .pipe(gulp.dest("./js"));
});
gulp.task("build-sass", function () {
    gulp.src("./scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css"));
});
gulp.task("build-templates", function () {
    gulp.src(["./templates/*.handlebars", "./templates/*.hbs"])
        .pipe(templates())
        .pipe(concat("templates.js"))
        .pipe(gulp.dest("./js"));
});
gulp.task("build", ["build-templates", "build-sass", "build-models", "build-views", "build-controllers", "build-services"]);
gulp.task("default", ["build"]);