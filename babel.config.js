module.exports = api => {
  const babelEnv = api.env();
  const plugins = [
    [
      "module-resolver",
      {
        alias: {
          "~": "./src",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ];

  if (babelEnv !== "development") {
    plugins.unshift([
      "transform-remove-console",
      { exclude: ["error", "warn"] },
    ]);
  }
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins,
  };
};
