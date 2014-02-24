/**
 * @fileoverview The grunt configuration. The following tasks are availble:
 *
 * - clean:build
 * - clean:spec
 * - mkdirs:build
 * - protobuf
 * - closure:concat-src
 * - closure:compile-src
 * - closure:concat-spec
 * - closure:compiler-spec
 * - jasmine
 * - test
 *
 * The [default] task is mapped to [test].
 *
 * For Grunt references see the following links:
 * @see http://gruntjs.com/api/grunt Grunt API
 * @see http://gruntjs.com/configuring-tasks#files Configuring file formats
 * @see http://gruntjs.com/inside-tasks Writing tasks
 *
 */
var fs = require('fs');
var path = require('path');

var pathClosureLibrary = 'src/closure-library';
if (!fs.existsSync(pathClosureLibrary)) {
  throw Error(
      'Install closure library at an accessible path. See Gruntfile.js');
}
var pathSpec = 'spec';

var pathBuildRoot = 'build';
var pathBuildProtocolBuffers = path.join(pathBuildRoot, 'protobuf');
var pathBuildClosure = path.join(pathBuildRoot, 'closure');
var pathBuildSpec = path.join(pathBuildRoot, 'spec');

module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      build: [pathBuildRoot + '/*'],
      spec: [pathBuildSpec + '/*']
    },

    mkdirs: {
      build: [
        pathBuildRoot,
        pathBuildProtocolBuffers,
        pathBuildClosure,
        pathBuildSpec
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
        compilerFlags: '.closureflags',
        compilerJar: '/usr/local/bin/closure-compiler.jar'
      },

      'compile-src': {
        src: [
          pathClosureLibrary,
          'src/logos',
          pathBuildProtocolBuffers
        ],
        dest: pathBuildClosure
      },

      'concat-src': {
        src: [
          pathClosureLibrary,
          'src/logos',
          pathBuildProtocolBuffers
        ],
        dest: pathBuildClosure
      },

      'concat-spec': {
        options: {
          defaultTarget: 'spec.logos.protocol.UserSpec'
        },
        src: [
          pathClosureLibrary,
          'src/logos',
          pathBuildProtocolBuffers,
          pathSpec
        ],
        dest: pathBuildSpec
      },

      'compile-spec': {
        options: {
          compilerExterns: 'externs/jasmine.js',
          defaultTarget: 'spec.logos.protocol.UserSpec'
        },
        src: [
          pathClosureLibrary,
          'src/logos',
          pathBuildProtocolBuffers,
          pathSpec
        ],
        dest: pathBuildSpec
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
      all: {
        options : {
          specs : pathBuildSpec + '/**/*Spec.js'
        }
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-gjslint');

  grunt.registerTask('init', ['clean', 'mkdirs']);

  /** Task to clean, concat, run, and compile specs. */
  grunt.registerTask('test', 'Run tests on the given namespace',
      function(namespace) {
    grunt.task.run('clean:spec');
    grunt.task.run('mkdirs:build');
    grunt.task.run('protobuf');

    var concatTask = 'closure:concat-spec';
    var compileTask = 'closure:compile-spec';
    if (namespace) {
      concatTask += ':' + namespace;
      compileTask += ':' + namespace;
    }
    grunt.task.run(concatTask);
    grunt.task.run('jasmine:all');
    grunt.task.run(compileTask);
  });

  grunt.registerTask('default', 'test');
};
