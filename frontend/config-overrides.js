const { override, addBabelPlugins, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    process: 'process/browser',
    stream: 'stream-browserify',
    zlib: 'browserify-zlib',
    util: 'util',
    buffer: 'buffer',
    assert: 'assert',
  }),
  addBabelPlugins(
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }]
  )
);
