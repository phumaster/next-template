const withSass = require('@zeit/next-sass')
const withOffline = require('next-offline')
const withTypescript = require('@zeit/next-typescript')
const generateScopedName = require('./config/css')
const MinifyCssPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const dotEnvResult = require('dotenv').config()

if (dotEnvResult.error) {
  throw dotEnvResult.error
}

const parsedVariables = dotEnvResult.parsed || {}
const dotEnvVariables = {}

for (const key of Object.keys(parsedVariables)) {
  dotEnvVariables[key] = process.env[key]
}

module.exports = withOffline(withTypescript(withSass({
  env: {
    ...dotEnvVariables,
  },
  assetPrefix: process.env.CLIENT_CDN_URL || '', // CDN configuration
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    getLocalIdent: (context, localIdentName, localName) => {
      return generateScopedName(localName, context.resourcePath);
    }
  },
  workboxOpts: {
    skipWaiting: true,
    clientsClaim: true,
  },
  webpack: (config, options) => {
    config.resolve.alias['@'] = path.join(__dirname)
    if (config.mode === 'production') {
      config.plugins.push(
        new MinifyCssPlugin({})
      );
    }
    return config;
  }
})))
