frontEnd-test-and-cov
=====================

这是一个便捷，强大的，浏览器友好的单元测试框架。

提供功能为：

1、提供实时前端单元测试结果。

2、提供单元测试覆盖率实时显示。

<br />

<h3>为什么有这个框架？</h3>

因为作为前端一直想实现tdd开发，之前受到几种限制：

1、使用jq的年代，dom操作实在无法按照逻辑做单元测试，因为dom的结构变化太多了。

2、当使用mv*框架却又没有前端直观的前端测试时，很难做到tdd。

3、前端代码没有测试，往往无法重构和保证质量


框架基于什么技术？

1、mocha，这里使用mocha的浏览器支持

2、coverjs，使用coverjs进行代码插针，用于覆盖率统计

3、reporter，使用一位外国仁兄自己写的一个覆盖率报告插件，修复了相关BUG。



框架如何使用？

1、当然是从github下载代码

2、然后将以下代码加入你的Package.json（如果你不知道这是啥，我只能说你不是做前端的。。）

具体代码如下，其实主要就是安装grunt和两个插件，如果你的代码里面已经有了，那么恭喜你，可以不加上了：
```
    "grunt": "~0.4.0",
    "grunt-coverjs": "*",
    "grunt-contrib-watch": "~0.5.3",
```
3、执行npm代码 npm install

4、然后创建GruntFile.js(如不明白可参考，www.gruntjs.net)，如已存在，可以跳过

5、向GruntFile.js里面加入如下代码（目录结构可以根据当前目录结构进行改变）：
```
    // prefix 预处理部分，由于grunt-cover有错误，所以需要使用自带文件对其进行copy
    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['vendor/js/grunt-coverjs/*'], dest: 'node_modules/grunt-coverjs/tasks', filter: 'isFile'}
        ]
      }
    },
  // 自动做插针合并以及监控代码
      cover: {
        compile: {
          files: [{
            // 测试代码存放地址
            'test/dist/test.js':
            // 原工程代码存放地址
            ['src/*.js']
          }]
        }
      },
      watch: {
        js: {
          files: [
            // 需要监控变化的代码
            "src/*.js"
          ],
          tasks: ['cover']
        }
      }
      // 由于grunt-coverjs有bug，需要做修复，这里需要做个修复
      // 也可以直接将工程vendor/js/grunt-coverjs/coverjs文件拷贝到node_modules/grunt-coverjs/tasks下，覆盖同名文件
      grunt.registerTask('preFix', ['copy']);
      // 注册grunt任务，也可以修改default名称
      grunt.registerTask('default', ['cover', 'watch']);
```

6、如果一切都OK，在当前工程根目录下执行grunt pre(仅第一次需要执行), grunt，你就可以开始编写测试代码了。

7、测试代码样例如工程目录test/runner.html，和test/spec.js，nb的你肯定一看就明白了。

8、获得结果,只要直接打开runner.html就可以看到如下截图




