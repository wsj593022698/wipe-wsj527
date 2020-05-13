//包装函数
module.exports = function(grunt){
    //任务配置，所有插件的配置信息
    grunt.initConfig({

        //获取package.json的信息
        pkg: grunt.file.readJSON('package.json'),
        //第一步：配置插件信息
        //uglify插件的配置信息
        uglify:{
            options:{
                banner:'/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            build:{
                src:'src/swipe.js',
                dest:'dist/<%=pkg.name%>-<%= pkg.version%>.min.js'
            }
        },
        //jshint的插件配置信息
        jshint:{
            build:['Gruntfile.js','src/*.js'],
            options:{
                jshintrc:'.jshintrc' //检测JS代码错误要根据此文件的设置规范进行检测，可以自己修改规则
            }
        },
		//clean插件
		clean: {
		  		contents: ['dist/*','sample/js/*.js'],
		},
		// copy插件的配置信息
		copy: {
			main: {
				files: [
							/*// 在路径中包含文件
					      {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},
					 
					      // 包含路径及其子目录中的文件
					      {expand: true, src: ['path/**'], dest: 'dest/'},
					 
					      // 使所有src相对于cwd
					      {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},
					 
					      // 将结果扁平化到单一水平
					      {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'}, */
					{expand: true, cwd: 'dist/', src: ['*'], dest: 'sample/js/'},
				],
			},
		},
		//文本替换插件
		replace: {
		  another_example: {
		    src: ['sample/demo.html'],
		    overwrite: true, // 覆盖匹配源文件
		    replacements: [{
		      from: /-\d+.\d+.\d+/g,
		      to: "-<%= pkg.version %>"
		    }]
		  }
		}

    });
    //加载插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-text-replace');
    //告诉grunt当我们在终端中输入grunt时需要做些什么（注意先后顺序）
    //使用插件
    grunt.registerTask('default',['jshint','clean','uglify','copy','replace']);
};