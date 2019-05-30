const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: ['babel-polyfill','./src/index.js'],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
      },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            maxSize: 1000000,
        },
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          },{
            test: /\.(scss|css)$/,
            use: [
                {
                    loader: 'style-loader', // creates style nodes from JS strings
                },
                {
                    loader: 'css-loader', // translates CSS into CommonJS
                },
                {
                    loader: 'sass-loader', // compiles Sass to CSS
                },
            ],
        },
        {
            test: /\.html$/,
            use: [
                {
                    loader: 'html-loader',
                },
            ],
        },
        ]
      },
      resolve: {
        extensions: ['*', '.js', '.jsx']
      },
    
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            inject: 'body',
            filename: './index.html',
            async: ['index', 'vendor'],
            defer: ['thirdparty'],
        }),
        new webpack.HotModuleReplacementPlugin()
      ],
    devServer: {
      contentBase: './dist',
      hot: true
    }
  };