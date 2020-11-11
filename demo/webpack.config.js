const fs = require('fs');
const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: __dirname,
    filename: 'dist/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: JSON.parse(
            fs.readFileSync(path.resolve(__dirname, '../.babelrc'))
          ),
        },
        include: [
          path.resolve(__dirname, 'src'),
          path.join(__dirname, '../src'),
        ],
      },
    ],
  },
  devServer: { open: true },
};
