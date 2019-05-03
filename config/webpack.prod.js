const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const constants = require('./webpack.constants.js');
const { BugsnagBuildReporterPlugin } = require('webpack-bugsnag-plugins');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('production'),
      BABEL_ENV: JSON.stringify('production'),
      GATEWAY_HOST: JSON.stringify('https://chopapi.com/graphql'),
      GTM: {
        gtmId: JSON.stringify('GTM-MQMRR25'),
        auth: JSON.stringify('ZHTvYO-PubfNDm1dBAWrQA'),
        preview: JSON.stringify('env-2')
      },
      ROUTE_BASENAME: JSON.stringify('/host_mobile')
    }),
    new webpack.HashedModuleIdsPlugin(),
    new BugsnagBuildReporterPlugin({
      ...constants.BUGSNAG,
      releaseStage: 'production',
    })
  ],
  devtool: 'source-map',
  output: {
    publicPath: 'https://churchonline.us/'
  }
});
