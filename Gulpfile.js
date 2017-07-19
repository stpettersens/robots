'use strict'

const gulp = require('gulp')
const sh = require('shelljs')
const fs = require('fs')
const os = require('os')

let jsmin, cssmin, uglify, rename, trimLines, removeLine, standard
if (process.env !== 'production') {
  jsmin = require('gulp-jsmin')
  cssmin = require('gulp-cssmin')
  uglify = require('gulp-uglify')
  rename = require('gulp-rename')
  trimLines = require('gulp-remove-empty-lines')
  removeLine = require('gulp-remove-line')
  standard = require('gulp-standard')
}

const nmp = 'node_modules'
let distJS = [
  `${nmp}/jquery/dist/jquery.min.js`,
  `${nmp}/bootstrap/dist/js/bootstrap.min.js`
]

let tp = 'target/release/robots'
let target = 'core/robots'

if (os.platform() === 'win32') {
  tp = 'target\\release\\robots.exe'
  target = 'core\\robots.exe'
}

gulp.task('build', function (done) {
  sh.exec('cargo build --release')
  if (fs.existsSync(target)) {
    fs.unlinkSync(target)
  }
  sh.exec(`upx -9 ${tp} -o ${target}`)
  done()
})

if (process.env !== 'production') {
  gulp.task('standard', function () {
    return gulp.src(['*.js', 'lib/*.js', 'clientside/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
  })

  gulp.task('js', function () {
    return gulp.src('clientside/*.js')
    .pipe(removeLine({'robots.js': [13]}))
    .pipe(uglify())
    .pipe(jsmin())
    .pipe(trimLines())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/js'))
  })

  gulp.task('css', function () {
    return gulp.src('clientside/*.css')
    .pipe(cssmin())
    .pipe(trimLines())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css'))
  })

  gulp.task('dist-js', function () {
    return gulp.src(distJS)
    .pipe(gulp.dest('public/js/dist'))
  })

  gulp.task('dist-css', function () {
    return gulp.src(`${nmp}/bootstrap/dist/css/bootstrap.min.css`)
    .pipe(gulp.dest('public/css/dist'))
  })

  gulp.task('default', ['standard', 'js', 'css', 'dist-js', 'dist-css'])
}
