module.exports = function (grunt) {

    // 配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
            },
            build: {
                options: {
                    mangle: false
                },
                files: {
                    'build/app.min.js': [
                        'app/*.js',
                        'app/*/*.js',
                        'app/*/*/*.js',
                        'app/*/*/*/*.js'
                    ]
                }
            }
        },
        less: {
            compile: {
                options: {
                    paths: ["app/css"]
                },
                files: {
                    "build/style.css": "app/css/less.less"
                }
            }
        },
        watch: {
            scripts: {
                files: ['app/css/*.less', 'app/*.js', 'app/*/*.js', 'app/*/*/*.js', 'app/*/*/*/*.js'],
                tasks: ['uglify', 'less']
            }
        }
    });

    // 载入uglify插件
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // less
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-jsdoc');

    // 注册任务
    grunt.registerTask('default', ['uglify', 'less', 'watch']);
};
