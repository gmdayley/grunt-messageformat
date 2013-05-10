/*
 * grunt-messageformat
 * https://github.com/chadmaughan/grunt-messageformat
 *
 * Copyright (c) 2013 Chad Maughan
 * Licensed under the MIT license.
 */

'use strict';

var messageformat = require('messageformat');

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('messageformat', 'Compile MessageFormat.js files.', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });

        // Iterate over all specified file groups.
        this.files.forEach(function (file) {

            // Concat specified files.
            var src = file.src.filter(function (filepath) {

                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                }
                else {
                    return true;
                }

            }).map(function (filepath) {

                    // Read file source.
                    return grunt.file.read(filepath);

                }).map(function(filepath) {

                    // get the locale from the file name (assuming format example of en.json)
                    grunt.log.writeln(filepath);

                })
                .join(grunt.util.normalizelf(options.separator));

            // Handle options.
            src += options.punctuation;

            // Write the destination file.
            grunt.file.write(file.dest, src);

            // Print a success message.
            grunt.log.writeln('File "' + file.dest + '" created.');
        });
    });
};
