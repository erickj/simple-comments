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

    closureDepsWriter: {
      options: {
        closureLibraryPath: pathClosureLibrary,
        root: [pathClosureLibrary + '/closure/goog'],
        root_with_prefix: [
          '"build/protobuf ../../../../build/protobuf"',
          '"spec ../../../../spec"',
          '"src/logos ../../../logos"'
        ],
        execOpts: {
          maxBuffer: Math.pow(2, 30)
        }
      },
      src: {
        src: ['src/logos/**/*.js'],
        dest: pathBuildClosure + '/deps.js'
      },
      spec: {
        src: ['spec/**/*Spec.js'],
        dest: pathBuildSpec + '/deps.js'
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
    },

    jasmine_node: {
      all: [pathBuildSpec]
    },

    'closure-bootstrap': {
      spec: {
        src: pathBuildSpec + '/deps.js'
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-gjslint');
  grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.registerTask('init', ['clean', 'mkdirs', 'protobuf']);
  grunt.registerTask('deps', ['init', 'closureDepsWriter']);

  /** Task to bootstrap nodejs for using goog.require. */
  grunt.registerMultiTask(
      'closure-bootstrap', 'Bootstrap node for goog.require', function() {
    grunt.task.run('deps');
    require('./src/closure-library/closure/goog/bootstrap/nodejs.js');
    this.files.forEach(function(files) {
      files.src.forEach(function(depsFile) {
        require(path.resolve(depsFile));
      });
    });
  });

  /** Task to run specs on nodejs. */
  grunt.registerTask(
      'server-specs', 'Run jasmine tests on node', function() {
    grunt.task.run('closure-bootstrap:spec');
    grunt.task.run('jasmine_node');
  });

  /** Task to run specs on phantomjs. */
  grunt.registerTask(
      'client-specs', 'Run jasmine tests on node', function() {
    var concatTask = 'closure:concat-spec';
    var compileTask = 'closure:compile-spec';
    grunt.task.run('init');
    grunt.task.run(concatTask);
    grunt.task.run('jasmine:all');
    grunt.task.run(compileTask);
  });

  // TODO(erick): server-specs must run before client-specs currently. I think
  // this is because of how the closureBuilder task is dynamically built.
  /** Task to clean, concat, run, and compile specs. */
  grunt.registerTask('test', 'Runs specs for client or server target ',
      ['server-specs', 'client-specs']);

  grunt.registerTask('default', 'test');
};
