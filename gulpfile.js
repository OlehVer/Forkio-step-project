"use strict";

import gulp from "gulp";

import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

import browserSync from "browser-sync";
import minifyjs from "gulp-js-minify";
import cleanCSS from "gulp-clean-css";
import concat from "gulp-concat";
import autoprefixer from "gulp-autoprefixer";
import imagemin from "gulp-imagemin";
import {deleteAsync} from "del";
import rename from "gulp-rename";


function taskDel() {
    return deleteAsync(["dist/*"]);
};

function style() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({cascade: false}))
        .pipe(cleanCSS({compatibility: "ie8"}))
        .pipe(rename("styles.min.css"))
        .pipe(gulp.dest("./dist/"));
};

function scripts() {
  return gulp.src("./src/scripts/*.js")
    .pipe(concat("all.js"))
    .pipe(minifyjs())
    .pipe(rename("scripts.min.js"))
    .pipe(gulp.dest("./dist/"));
};  
 
function myServer() {
    browserSync.init({
        server: "./",
        files: ["*.html", "dist/*.css", "dist/*.js"],
        notify: false
    });
};

function imgMin() {
  return gulp.src("src/images/*")
		.pipe(imagemin())
		.pipe(gulp.dest("dist/images"))
};

function watchOn () {
    gulp.watch("./src/scss/**/*.scss", gulp.series(style));
    gulp.watch("./src/scripts/*.js", gulp.series(scripts));
};


export const styleRun = style;
export const distClear = taskDel;
export const watchRun  = watchOn;

export const build = gulp.series(taskDel, gulp.parallel(style, scripts, imgMin));
export const develop = gulp.parallel(myServer, watchOn);
export const dev = gulp.series(build, develop);
