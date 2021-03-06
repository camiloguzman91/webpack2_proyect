const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
    assetModuleFilename: 'assets/images/[hash][ext][query]'
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
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000, // Habilita o deshabilita la transformación de archivos en base64.
            mimetype: "application/font-woff",
            // Especifica el tipo MIME con el que se alineará el archivo. 
            // Los MIME Types (Multipurpose Internet Mail Extensions)
            // son la manera standard de mandar contenido a través de la red.
            name: "[name].[ext]",
            // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
            // Se puede agregar [name]hola.[ext] y el output del archivo sería 
            // ubuntu-regularhola.woff
            outputPath: "./assets/fonts",
            // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
            publicPath: "./assets/fonts",
            // EL DIRECTORIO PÚBLICO (SIN COMPLICACIONES)
            esModule: false,
            // AVISAR EXPLICITAMENTE SI ES UN MODULO
          },
        }
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
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"
        }
      ]
    })
  ]
}