const path = require('path');
const { compile } = require('jinge-compiler');

module.exports = function(content) {
  const callback = this.async();
  if (this.cacheable) {
    this.cacheable();
  }
  const resourcePath = this.resourcePath;
  compile(content, {
    resourcePath
  }, (err, output) => {
    if (err) return callback(err);
    if (output.map) {
      output.map.version = 3;
      output.map.file = resourcePath;
      output.map.sources = [
        path.relative(process.cwd(), resourcePath)
      ];
      output.map.sourcesContent = [content];
      output.map.sourceRoot = process.cwd();  
    }
    callback(null, output.code, output.map);
  });
};
