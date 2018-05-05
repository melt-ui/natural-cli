/**
 * 主要内容参考 (NICE)https://www.cnblogs.com/zhangyuezhen/p/7896047.html
 *
 * eslint
 *
 * https://github.com/271626514/gulp-demo
 * https://segmentfault.com/a/1190000010138466
 *
 * 辅助功能参考 (NICE)https://github.com/mjzhang1993/gulp-template
 */

// 严格模式
'use strict';

// 导入模块

// var path = require('path'),
//     fs = require('fs');

var gulp = require('gulp'),

    concat = require('gulp-concat-dir'), // 管合并，可以合并同一目录下的所有文件，好处是可以减少网络请求
    plumber = require('gulp-plumber'),   //错误处理提示插件
    notify = require('gulp-notify'),
    zip = require('gulp-zip'),  // 压缩文件
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    runSequence = require('gulp-run-sequence'), // 控制task中的串行和并行

    uglify = require('gulp-uglify'),

    less = require('gulp-less'),
    sass = require('gulp-sass'),
    bourbon = require("bourbon").includePaths,
    neat = require("bourbon-neat").includePaths,

    minifyCss = require('gulp-minify-css'),
    cleanCss = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),

    minifyHtml = require('gulp-minify-html'),

    imagemin = require('gulp-imagemin'), // 压缩图片
    pngquant = require('imagemin-pngquant'),
    spritesmith = require('gulp.spritesmith'),
    cache = require('gulp-cache'),
    clean = require('gulp-clean'), // 用来删除文件

    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,

    stripDebug = require('gulp-strip-debug');

// 路径
var PATH_DEV = "./src";
var PATH_VIEWS = "./src/views";
var PATH_ASSETS = "./assets";

var PATHS = {
    html: PATH_VIEWS + "/**/*.html",
    htmlFolder: PATH_VIEWS,
    scss: PATH_DEV + "/scss/**/*.scss",
    scssFolder: PATH_DEV + "/scss",
    less: PATH_DEV + "/css/**/*.less",
    lessOutput: PATH_DEV + "/css/theme/**/_output.less",
    lessFolder: PATH_DEV + "/css/theme",
    cssFolder: PATH_DEV + "/css",
    scripts: PATH_DEV + "/scripts/**/*.js",
    scriptsFolder: PATH_DEV + "/scripts",
    images: PATH_ASSETS + '/images/**/*.{png,jpg,jpeg,ico,gif,svg}',
    imagesFolder: PATH_ASSETS + "/images",
    sprite: PATH_ASSETS + '/images/sprite/!(sprite.png|*.css)',
    plusFolder: PATH_ASSETS + "/plus",
    fontsFolder: PATH_ASSETS + "/fonts",
    mockFolder: PATH_ASSETS + "/mock"
};


// scss编译
gulp.task('reloadSass', function (cb) { // cb是传入的回调函数

    return gulp.src(PATHS.scss)
        .pipe(sass({
            sourcemaps: true,
            includePaths: [bourbon, neat]
        }).on('error', sass.logError))
        // .pipe(concat({ext: '.css'}))
        // .pipe(rename('all.min.css'))
        .pipe(minifyCss())
        .pipe(autoprefixer({
            // browsers: ['> 1%', 'not ie <= 8']
        }))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(PATHS.scssFolder))
    // .pipe(reload({stream: true}))


    cb(err);  // 如果 err 不是 null 和 undefined，流程会被结束掉，'two' 不会被执行
});


// less编译
gulp.task('reloadLess', function (cb) {
    return gulp.src(PATHS.lessOutput) // 注意，只解析_output.less这样的单文件
        .pipe(plumber({errorHandler: notify.onError('Error:<%=error.message%>')}))
        .pipe(less())
        .pipe(autoprefixer())
        // .pipe(concat({ext: '.css'})) //合并
        .pipe(minifyCss())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(PATHS.lessFolder))

    cb(err);
});


// 浏览器同步刷新
// http://www.browsersync.cn/docs/gulp/
gulp.task('sync', function () {
    browserSync.init({
        // proxy: "deva.dev",
        port: 80, //
        // open: "ui",
        ui: {
            port: 3005
        },
        directory: true,
        // browser: ["chrome", "firefox"],
        browser: "chrome",
        server: {
            baseDir: [PATH_VIEWS],
            index: "index.html",
            routes: {
                "/css": PATHS.cssFolder,
                "/images": PATHS.imagesFolder,
                "/plus": PATHS.plusFolder,
                "/scripts": PATHS.scriptsFolder,
                "/scss": PATHS.scssFolder,
                "/mock": PATHS.mockFolder,
                "/fonts/": PATHS.fontsFolder
            }
        },
        // startPath: "index.html"
    });

    // 文件监听
    gulp.watch(PATHS.html).on('change', reload);
    gulp.watch(PATHS.scripts).on('change', reload);
    gulp.watch(PATHS.scss, ['reloadSass']).on('change', reload);
    gulp.watch(PATHS.less, ['reloadLess']).on('change', reload);
});


// 默认任务
gulp.task('default', function () {
    runSequence('clean', ['sync'])
});


// =====================================
// =====================================


// CSS监听
gulp.task('cssWatch', function () {
    gulp.watch(PATHS.less, ['reloadLess']);
    gulp.watch(PATHS.scss, ['reloadSass']);
});

gulp.task('cssJob', function () {
    runSequence('clean', ['reloadSass', 'reloadLess'], 'cssWatch')
});


// ====================================
// ====================================

// 雪碧图
// 此功能是单一的并不与其他功能串联
gulp.task('sprite', function () {
    return gulp.src(PATHS.sprite)
        .pipe(spritesmith({
            imgName: 'ico.png',
            cssName: 'sprite.css'
        }))
        .pipe(gulp.dest(PATHS.imagesFolder));
});


// =====================================
// =====================================

// 删除dist/*下的所有文件
gulp.task('clean', function () {
    return gulp.src(['./assets/scripts/*',
            './assets/css/*', './assets/scss/*',
            './templates/*',
            './dist/*'],
        {read: false})
        .pipe(clean())
});

// 图片压缩
gulp.task('images', function () {
    return gulp.src(PATHS.images)
        .pipe(plumber())
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            use: [pngquant()] // 使用 pngquant 深度压缩 png 图片
        }))
        .pipe(gulp.dest(PATHS.imagesFolder))
    // .pipe(browserSync.reload({stream:true}))
});

// 缩编JS
gulp.task('distJs', function () {
    return gulp.src(PATHS.scripts)
        .pipe(plumber()) // 错误提示
        // .pipe(concat({ext: '.js'})) //合并同一目录下的所有文件
        .pipe(stripDebug())
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('./assets/scripts'))
});

// 缩编HTML
gulp.task('distHtml', function () {
    return gulp.src(PATHS.html)
        .pipe(plumber())
        .pipe(minifyHtml())
        .pipe(gulp.dest('./templates'))
});

// scss编译
gulp.task('distSass', function (cb) { // cb是传入的回调函数

    return gulp.src(PATHS.scss)
        .pipe(sass({
            sourcemaps: true,
            includePaths: [bourbon, neat]
        }).on('error', sass.logError))
        // .pipe(concat({ext: '.css'}))
        // .pipe(rename('all.min.css'))
        .pipe(minifyCss())
        .pipe(autoprefixer({
            // browsers: ['> 1%', 'not ie <= 8']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/scss'))

    cb(err)
});


// less编译
gulp.task('distLess', function () {
    return gulp.src(PATHS.lessOutput) // 注意，只解析_output.less这样的单文件
        .pipe(plumber({errorHandler: notify.onError('Error:<%=error.message%>')}))
        .pipe(less())
        .pipe(autoprefixer())
        // .pipe(concat({ext: '.css'})) //合并
        .pipe(minifyCss())
        .pipe(gulp.dest('./assets/css/theme'))

});


// 压缩
gulp.task('zip', function () {

    return gulp.src(['**/*.*',
        '!{node_modules,cmd,src}/**/*.*',
        '!{dist.zip,gulpfile.js,package.json,package-lock.json,README.md}'])
        .pipe(plumber())
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest('./'))
});

// 发布
gulp.task('release', function () {
    // runSequence('clean', 'images', ['distHtml', 'distLess', 'distSass','distJs'], 'zip')
    runSequence('clean', ['distHtml', 'distLess', 'distSass', 'distJs'], 'zip', 'clean')
    // runSequence('clean', ['distHtml', 'distLess', 'distSass', 'distJs'], 'clean')
});

