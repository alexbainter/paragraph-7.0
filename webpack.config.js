'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  plugins: [new HtmlWebpackPlugin()],
};

module.exports = config;
