var path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'build.js'
  },

  module: {
    loaders: [
      {
        // Use *.json.js extension to bake exported JS data into JSON
        test: /\.json\.js/,
        loader: path.join(__dirname, '/../../index.js')
      }
    ]
  }
}
