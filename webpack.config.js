const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  //entry permite decir el punto de entrada de la aplicación
  entry: './src/index.js',
  //output permite decir hacia dónde se va enviar lo que va a preparar webpack
  output: {
    //path es donde estará la carpeta donde se guardarán los archivos
    //con path.resolve se indica dónde va estar la carpeta y su ubicación
    path: path.resolve(__dirname, 'dist'),
    // filename nombra al archivo final
    filename: 'main.js',
  },
  resolve: {
    //aquí se ponen las extensiones que tendrá el proyecto para que webpack los lea
    extensions: ['.js']
  },
  module: { 
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css|.styl$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin(),
  ]
}