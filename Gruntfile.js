module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // SETTINGS -------------
        pkg: grunt.file.readJSON('package.json'),
        aws: grunt.file.readJSON('aws-keys.json'), // Read the file

        aws_s3: {
          options: {
            accessKeyId: '<%= aws.AWSAccessKeyId %>',
            secretAccessKey: '<%= aws.AWSSecretKey %>',
            region: 'ap-southeast-2',
            uploadConcurrency: 5, // 5 simultaneous uploads
            downloadConcurrency: 5 // 5 simultaneous downloads
          },
          production: {
            options: {
              bucket: 'dockersim.com',
            },
            files: [
              {expand: true, cwd: 'assets/', src: ['**'], dest: 'assets/'},
              {expand: true, cwd: 'lessons/', src: ['**'], dest: 'lessons/'},
              {cwd: '', src: ['index.html'], dest: 'index.html'},
            ]
          },
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-watch'); //run this task with "grunt watch"
    grunt.loadNpmTasks('grunt-aws-s3');

    // Default task(s).
    grunt.registerTask('deploy', ['aws_s3']);
};
