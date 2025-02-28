// // Learn more https://docs.expo.io/guides/customizing-metro

// // type for metro config
// const { getDefaultConfig } = require('expo/metro-config')
// const path = require('path')

// const projectRoot = __dirname
// const workspaceRoot = path.resolve(__dirname, '../..')

// const config = getDefaultConfig(__dirname)

// config.watchFolders = [workspaceRoot, projectRoot]
// config.resolver.nodeModulesPath = [
//   path.resolve(projectRoot, 'node_modules'),
//   path.resolve(workspaceRoot, 'node_modules'),
// ]

// module.exports = config

// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const config = getDefaultConfig(__dirname)

// npm v7+ will install ../node_modules/react and ../node_modules/react-native because of peerDependencies.
// To prevent the incompatible react-native between ./node_modules/react-native and ../node_modules/react-native,
// excludes the one from the parent folder when bundling.
config.resolver.blockList = [
  ...Array.from(config.resolver.blockList ?? []),
  new RegExp(path.resolve('..', '..', 'node_modules', 'react')),
  new RegExp(path.resolve('..', '..', 'node_modules', 'react-native')),
]

config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, './node_modules'),
  path.resolve(__dirname, '../../node_modules'),
]

config.resolver.extraNodeModules = {
  'native-chart': '../..',
}

config.watchFolders = [path.resolve(__dirname, '../..')]

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
})

module.exports = config
