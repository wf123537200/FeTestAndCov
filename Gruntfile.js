module.exports = function(grunt){
    require('load-grunt-tasks')(grunt); //加载所有的任务

    grunt.initConfig({
      // package file
      pkg: grunt.file.readJSON("package.json"),
      // prefix 预处理部分，由于grunt-cover有错误，所以需要使用自带文件对其进行copy
      copy: {
        main: {
          files: [
            {expand: true, flatten: true, src: ['vendor/js/grunt-coverjs/*'], dest: 'node_modules/grunt-coverjs/tasks', filter: 'isFile'}
          ]
        }
      },
      // public 发布版，压缩all.js和all.css
      uglify:{
        options: {
            
        },
        build: {
          src: 'vendor/js/*.js',
          dest:'vendor/js/dist/all.js'
        }
      },
      cssmin: {
        minify: {
            src: 'vendor/css/*.css',
            dest:'vendor/css/dist/all.css'
        }
      },

      // 自动做插针合并以及监控代码
      cover: {
        compile: {
          files: [{
            'test/dist/test.js': ['src/*.js']
          }]
        }
      },
      watch: {
        js: {
          files: [
            "src/*.js"
          ],
          tasks: ['cover']
        }
      }
      
    });

    // author use
    grunt.registerTask('public', ['uglify', 'cssmin']);

    // user use
    grunt.registerTask('preFix', ['copy']);
    grunt.registerTask('default', ['cover', 'watch']);
};