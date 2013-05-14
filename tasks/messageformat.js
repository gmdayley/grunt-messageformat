/*
 * grunt-messageformat
 * https://github.com/chadmaughan/grunt-messageformat
 *
 * Copyright (c) 2013 Chad Maughan
 * Licensed under the MIT license.
 */

'use strict';

var messageformat = require('messageformat'),
    shell = require('shelljs');

module.exports = function (grunt) {

    grunt.registerTask('messageformat', 'Compile MessageFormat.js files.', function () {

        // default options
        var options = this.options({
            locale: undefined,
            inputdir: undefined,
            output: undefined,
            combine: undefined,
            namespace: 'i18n',
            include: undefined,
            verbose: false
        });

        // check the required options
        if (options.locale === undefined) {
            grunt.log.warn('Locale is a required option.');
            return false;
        }

        if (options.inputdir === undefined) {
            grunt.log.warn('An input directory is a required option.');
            return false;
        }

        if (options.output === undefined) {
            grunt.log.warn('An output directory is a required option.');
            return false;
        }

        // assemble the command
        var cmd = 'messageformat -l ' + options.locale;
        cmd += (options.combine === undefined) ? '' : ' --combine ' + options.combine;
        cmd += (options.namespace === 'i18n') ? '' : ' --namespace ' + options.namespace;
        cmd += (options.include === undefined) ? '' : ' --include ' + options.include;
        cmd += (options.verbose === false) ? '' : ' --verbose ' + options.verbose;
        cmd += ' ' + options.inputdir + ' ' + options.output;

        if (shell.exec(cmd).code !== 0) {
            grunt.log.error('Error compiling with messageformat.js');
        }
    });
};
