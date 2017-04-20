/**
 * Created by yangyang on 2017/4/15.
 */
// 引包
var gulp = require('gulp')
var htmlmin = require('gulp-htmlmin')
var concat = require('gulp-concat')
var less = require('gulp-less')
var cssnano = require('gulp-cssnano')
var uglify = require('gulp-uglify')
var imagemin = require('gulp-imagemin')
var browserSync = require('browser-sync')


// 注册任务
/**
 * 压缩html
 */
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
            stream: true
        }))
})
/**
 * 编译less文件，压缩css
 */
gulp.task('style', function () {
    gulp.src(['src/styles/*.less', '!src/styles/_*.less'])  // 不用编译用于被引入的less文件
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
    gulp.src('src/styles/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})
/**
 * 移动依赖包文件，合并、压缩、混淆js文件
 */
gulp.task('script', function () {
    gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist/scripts'))

    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream: true
        }))
})
/**
 * 压缩image文件
 */
gulp.task('image', function () {
    gulp.src('src/favicon.ico')             // 移动网站栏图标
        .pipe(gulp.dest('dist'))
    gulp.src('src/images/*.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream: true
        }))
})
/**
 * 启动浏览器同步工具程序，监听任务
 */
gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: ['dist']
        },
    }, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    })

    // 监听任务(需要放在一个阻塞任务中)
    gulp.watch('src/*.html', ['html'])
    gulp.watch(['src/styles/*.less', 'src/styles/*.css'], ['style'])
    gulp.watch('src/scripts/*.js', ['script'])
    gulp.watch(['src/favicon.ico', 'src/images/*.*'], ['image'])
})

