var path = require('path');

module.exports = {
  entry: path.resolve('src/main.development.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../src/')
  }
};
