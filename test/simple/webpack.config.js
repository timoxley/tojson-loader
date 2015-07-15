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
        loader: __dirname + '/../../index.js'
      }
    ]
  }
}
