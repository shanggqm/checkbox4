module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
	        	banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	      	},
	      	build: {
	      		files:{
	      			'dist/<%= pkg.name %>.min.js':['src/<%= pkg.name %>.js']
	      		}
	      	}
		},
		//复制图片
		copy:{
			main:{
				expand:true,
				cwd:'src/',
				src: ['css/*','img/*'],
				dest: 'dist/'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default',['uglify','copy']);
};