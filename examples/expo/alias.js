const path = require('path')

module.exports = {
  alias: {
    // zeego$: path.resolve(__dirname, '../../packages/zeego/src'),
    zeego: ([, name]) =>
      // https://github.com/tleunen/babel-plugin-module-resolver/blob/HEAD/DOCS.md#passing-a-substitute-function
      path.resolve(__dirname, `../../packages/zeego/src${name}`),
  },
}
