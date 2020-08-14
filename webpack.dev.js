// is some comments will possibly have duplicate in build config, they are exist
// only here

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    // was showing '[WDS] Live Reloading enabled' after startup
    clientLogLevel: 'none',
  },
};
