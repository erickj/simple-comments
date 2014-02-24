/**
 * @fileoverview The grunt configuration. For reference see the following links:
 * @see http://gruntjs.com/api/grunt Grunt API
 * @see http://gruntjs.com/configuring-tasks#files Configuring file formats
 * @see http://gruntjs.com/inside-tasks Writing tasks
 */
var fs = require('fs');
var path = require('path');

var pathClosureLibrary = 'src/closure-library';
if (!fs.existsSync(pathClosureLibrary)) {
  throw Error(
      'Install closure library at an accessible path. See Gruntfile.js');
}

var pathBuildRoot = 'build';
var pathBuildProtocolBuffers = path.join(pathBuildRoot, 'protobuf');
var pathBuildClosure = path.join(pathBuildRoot, 'closure');

module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      build: [pathBuildRoot + '/*']
    },

    mkdirs: {
      build: [
        pathBuildRoot,
        pathBuildProtocolBuffers,
        pathBuildClosure
      ]
    },

    protobuf: {
      options: {
        protoCompiler: '/usr/bin/protoc',
        protobufPluginClosure: '/usr/local/src/protobuf-plugin-closure'
      },
      build: {
        src: 'protocol/**/*.proto',
        dest: pathBuildProtocolBuffers
      }
    },

    closure: {
      options: {
        library: pathClosureLibrary,
        defaultTarget: 'logos.client',
        compiler: {
          flags: '.closureflags',
          jar: '/usr/local/bin/closure-compiler.jar'
        }
      },

      compile: {
        src: [pathClosureLibrary, 'src/logos', pathBuildProtocolBuffers],
        dest: pathBuildClosure
      },

      concat: {
        src: [pathClosureLibrary, 'src/logos', pathBuildProtocolBuffers],
        dest: pathBuildClosure
      }
    },

    gjslint: {
      options: {
        flags: [
          '--strict',
          '--custom_jsdoc_tags namespace,name'
        ],
        reporter: {
          name: 'console'
        }
      },
      src: {
        src: 'src/logos/**/*.js'
      },
      spec: {
        src: 'spec/**/*.js'
      }
    },

    jasmine: {
      grail: {
        options : {
          specs : 'tmp/spec/**/*.js'
        }
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['clean:spec', 'closurecompiler:spec', 'jasmine']);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-gjslint');

  grunt.registerTask('default', ['test']);
};
