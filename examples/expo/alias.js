// const fs = require('fs')
const path = require('path')

// const packages = path.resolve(__dirname, '../..', 'packages')

// const alias = {}

// fs.readdirSync(packages).map((name) => {
//   const pak = require(path.join(packages, name, 'package.json'))
//   alias[pak.name] = path.resolve(packages, name, pak.source)
// })

const packagePath = '../../packages/zeego/'

module.exports = {
  alias: {
    'zeego/dropdown-menu': path.resolve(
      __dirname,
      packagePath,
      'dropdown-menu'
    ),
    'zeego/context-menu': path.resolve(__dirname, packagePath, 'context-menu'),
  },
}
