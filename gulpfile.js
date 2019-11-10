const path = require('path')
const del = require('del')
const browserify = require('browserify');
const gulp = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat')
const copy = require('gulp-copy')
const purge = require('gulp-css-purge')
const cleanCSS = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const htmlmin = require('gulp-htmlmin')
const imageminGuetzli = require('imagemin-guetzli');
const browserSync = require('browser-sync')

const server = browserSync.create();

const paths = {
  scripts: {
    src: ['src/js/*.js', 'src/js/**/*.js'],
    dest: 'docs/js/'
  },
   styles: {
    src: ['src/scss/*.scss', 'src/scss/**/*.scss'],
    dest: 'docs/css/'
  },
  html: {
    src: ['src/*.html'],
    dest: 'docs/'
  },
  img: {
    src: ['src/img/*.{png,svg,ico,webp,gif}', 'src/img/**/*.{png,svg,ico,webp,gif}'],
    dest: 'docs/img'
  },
  imgJPG: {
    src: ['src/img/*.{jpg,jpeg}', 'src/img/**/*.{jpg,jpeg}'],
    dest: 'docs/img'
  }
}

const clean = () => del(['docs'])

function scripts() {
  const b = browserify({
    entries: './src/js/main.js',
    debug: true
  })
  .transform("babelify");

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', (e) => console.log(require('util').inspect(e)))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./docs/js/'))

  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
}

function styles() {
  return gulp.src(paths.styles.src, { sourcemaps: true })
    .pipe(sass({
    	includePaths: [
    		 path.join(__dirname, '/node_modules/normalize-scss/sass/'),
    	]
    }).on('error', sass.logError))
    .pipe(purge({
      trim : true,
      shorten : true,
      verbose : true
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest))
}

function html() {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({ 
    	collapseWhitespace: true,
    	removeComments: true
    }))
    .pipe(gulp.dest(paths.html.dest))
}

function img(done) {
  gulp.src(paths.img.src)
		.pipe(imagemin([
			imagemin.optipng({interlaced: true
			}),
			imagemin.gifsicle({interlaced: true}),
	    imagemin.svgo({})
		]))
    .pipe(gulp.dest(paths.img.dest))

  gulp.src(paths.imgJPG.src)
		.pipe(imagemin([
			imageminGuetzli({quality: 85}),
		]))
    .pipe(gulp.dest(paths.imgJPG.dest))

  done()
}

function imgCopy(done) {
  gulp.src(paths.img.src)
    .pipe(gulp.dest(paths.img.dest))

  gulp.src(paths.imgJPG.src)
    .pipe(gulp.dest(paths.imgJPG.dest))

  done()
}

function reload(done) {
  server.reload()
  done()
}

function serve(done) {
  server.init({
    server: {
      baseDir: './docs'
    }
  });
  done()
}

const watch = () => {
	gulp.series(clean, scripts, styles, imgCopy, html);
	gulp.watch(paths.scripts.src, gulp.series(scripts, reload))
	gulp.watch(paths.styles.src, gulp.series(styles, reload))
	gulp.watch(paths.img.src.concat(paths.imgJPG.src), gulp.series(imgCopy, reload))
	gulp.watch(paths.html.src, gulp.series(html, reload))
};

gulp.task('default', gulp.series(clean, scripts,styles, html, img, imgCopy))
gulp.task('watch', gulp.series(clean, scripts,styles, html, imgCopy, serve, watch))
