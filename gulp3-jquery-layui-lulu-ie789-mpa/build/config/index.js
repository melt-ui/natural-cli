/*
 * 配置
 */

var fs = require('fs');

var sysName = 'widgets'
if (process.env.SYS_NAME) {
    sysName = process.env.SYS_NAME.toString().trim()
}

// 公共配置
exports.common = {
    // 这两个文件随文件夹结构调整
    staticDir: './static',
    templatesDir: './templates',
    sysName: sysName
}


// 开发环境
exports.dev = {
    // 固定
    devDir: './src',
    assetsDir: './src/assets',
    pagesDir: `./_${sysName}`,

    // 样式库
    stylesDir: `./src/assets/css`,
    stylesWatchFiles: [
        `./src/assets/css/components/**/*.less`,
        `./_${sysName}/static/css/**/*.less`
    ],

    // 脚本库
    libsName: 'mumuy',
    libsDevDir: './src/assets/libs/mumuy',
    // '{ajax,scroll}' 逗号间没空格
    // 或者 '*' 所有的导报
    libsDevMods: 'browser',
    libsOutputDir: './static/vendor/libs',

    // 搬运工作
    copyHTMLExclude: [
        `!./_${sysName}/**/*.{html,md,inc}`,
        `!./_${sysName}/static/**`
    ],

    // 视图文件
    // 项目脚本与图片
    imagesDir: `./_${sysName}/static/images`,
    scriptsDir: `./_${sysName}/static/js`,

    // 雪碧图
    spriteDevDir: `./_${sysName}/static/images/_sprite`,
    spriteOutputDir: `./_${sysName}/static/css`,

    // 字体子集化
    fontSpiderDir: './static/fonts/hyzhj',

    // 离线
    pwaDir: './templates'
}

// 产品
exports.prod = {
    // 打包文件夹
    distDir: './dist',

    // 需打包文件
    zipFiles: [
        './**/*.*',
        '!{node_modules,build,doc,src}/**/*.*',
        '!{dist.zip,gulpfile.js,package.json,package-lock.json,README.md,.babelrc}'
    ],

    // 部署
    // host: '47.100.99.127',
    host: '172.16.11.175',
    // username: 'root',
    username: 'administrator',
    // password: '我不告诉你,除非做我女朋友',
    // password: '',
    remotePath: '/data/wwwroot/default',
    // remotePath: 'E:\程序\coreApi\wwwroot\screen'

}


// 如果有配置文件则覆盖
if (sysName) {

    // 如果存在配置文件
    if (fs.existsSync(`./build/config/system/${sysName}.js`)) {
        var details = require(`./system/${sysName}`)

        // 配置覆盖
        Object.assign(exports.common, details.common)
        Object.assign(exports.dev, details.dev)
        Object.assign(exports.prod, details.prod)

        console.log(sysName + '配置文件已覆盖(๑•̀ㅂ•́)و✧')
    }
}

