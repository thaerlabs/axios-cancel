module.exports = {
  context: __dirname,
  entry: './index.js',
  output: {
    libraryTarget: 'umd',
    library: 'axiosCancel',
    path: __dirname + '/dist',
    filename: 'index.js'
  },
  externals: {
    'axios': 'axios'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  }
};
