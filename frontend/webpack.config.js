const webpack = require('webpack');

module.exports = {
  // Otras configuraciones...
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  resolve: {
    fallback: {
      process: require.resolve('process/browser'),
    },
  },
};
