exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        assert: require.resolve("assert/"),
        crypto: require.resolve("crypto-browserify"),
        constants: require.resolve("constants-browserify"),
        // http: require.resolve("stream-http"),
        // https: require.resolve("https-browserify"),
        // os: require.resolve("os-browserify/browser"),
        // stream: require.resolve("stream-browserify"),
      },
    },
  });
};
