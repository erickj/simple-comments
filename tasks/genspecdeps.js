var fs = require('fs');
var path = require('path');

var filterGoogProvides = function(fileNames) {
  var outerPattern = /^goog\.provide\(\'.+\'\);$/mg;
  var innerPattern = /^goog\.provide\(\'(.+)\'\);$/;
  var googProvides = [];
  fileNames.forEach(function(fileName) {
    var fileContent = fs.readFileSync(fileName, {encoding: 'utf8'});
    var provideLines = fileContent.match(outerPattern) || [];
    provideLines.forEach(function(line) {
      var provideTarget = line.match(innerPattern);
      if (provideTarget && provideTarget[1]) {
        googProvides.push(provideTarget[1]);
      }
    });
  });

  return googProvides;
};

var writeSpecRequires = function(googProvides, outputName, provideTarget) {
  var autoGenComment =
      '/** DO NOT EDIT: This files was auto-generated. Any changes will be lost. */';
  var provide = 'goog.provide(\'' + provideTarget + '\');';
  var content = googProvides.map(function(namespace) {
                  if (namespace == provideTarget) {
                    throw Error('Circular dependency with namespace ' + namespace);
                  }
                  return 'goog.require(\'' + namespace + '\');';
                });
  content.unshift(provide);
  content.unshift(autoGenComment);
  fs.writeFileSync(outputName, content.join('\n'), {
    mode: 0644
  })
};

module.exports = function(grunt) {
  grunt.registerMultiTask('genspecdeps', 'Generate a goog.require file for specs', function() {
    var provideTarget = this.options().provideTarget;
    var name = this.name;
    var targetName = this.target;

    this.files.forEach(function(files) {
      var outputFilename = [name, targetName, 'autogen', 'js'].join('.');
      var outputPath = path.join(files.dest, outputFilename);
      grunt.log.write('Removing ' + outputPath + '...');
      fs.unlinkSync(outputPath);
      grunt.log.ok();

      var fileNames = files.src;
      grunt.log.write('Collecting goog.provides for files...');
      var googProvides = filterGoogProvides(fileNames);
      grunt.log.ok();

      grunt.log.write('Writing genspec file ' + outputFilename + '...');
      writeSpecRequires(googProvides, outputPath, provideTarget);
      grunt.log.ok();
    });
  });
};
