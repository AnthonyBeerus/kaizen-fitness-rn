module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets",
            // or if your assets are in app/assets:
            "@assets": "./app/assets",
          },
        },
      ],
    ],
  };
};
