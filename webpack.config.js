const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.vue', '.js', '.json', '.scss', '.sass', '.css'],
  },
  module: {
    rules: [
      {
        test: /.(html)$/,
        use: 'html-loader',
      },
      {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
      },
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },
      {
        test: /.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /.(sass|scss)$/,
        use: [
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: false,
            },
          },
        ],
      },
      {
        test: /.(vue)$/,
        use: ['vue-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
