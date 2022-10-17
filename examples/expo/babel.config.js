const path = require('path')

module.exports = function (api) {
  api.cache(false)

  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          alias: {
            // https://github.com/tleunen/babel-plugin-module-resolver/blob/HEAD/DOCS.md#passing-a-substitute-function
            zeego: ([, name]) =>
              path.resolve(__dirname, `../../packages/zeego/src${name}`),
          },
        },
      ],
      // NOTE: `expo-router/babel` is a temporary extension to `babel-preset-expo`.
      require.resolve('expo-router/babel'),
      'react-native-reanimated/plugin',
    ],
  }
}
