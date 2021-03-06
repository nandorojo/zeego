const { alias } = require('./alias');

module.exports = function (api) {
  api.cache(true);

  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          alias,
        },
      ],
    ],
  };
};
