const HtmlWebpackPlugin = require('html-webpack-plugin')
const Sentry = require('@sentry/node')
Sentry.init({ dsn: 'https://4663e0a6977d4607bcf70001a3761ac1@sentry.io/1384573' })

export default class HtmlWebpackChangeAssetsExtensionPlugin {
  options: object

  constructor(options?: object) {
    this.options = options || {}
  }

  apply(compiler: any) {
    compiler.hooks.compilation.tap('HtmlWebpackChangeAssetsExtensionPlugin', (compilation: any) => {
      let beforeGenerationHook
      if (compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration) {
        // HtmlWebpackPlugin 3
        const { hooks } = compilation
        beforeGenerationHook = hooks.htmlWebpackPluginBeforeHtmlGeneration
      } else if (HtmlWebpackPlugin.version === 4) {
        // HtmlWebpackPlugin >= 4
        const hooks = HtmlWebpackPlugin.getHooks(compilation)
        beforeGenerationHook = hooks.beforeAssetTagGeneration
      }

      beforeGenerationHook.tapAsync(
        'HtmlWebpackChangeAssetsExtensionPlugin',
        (data: any, cb: Function) => {
          // Skip if the plugin configuration didn't set `jsExtension`
          if (!data.plugin.options.jsExtension) {
            return cb(null, data)
          }
          const jsExtension = data.plugin.options.jsExtension
          const tempArray = data.assets.js
          data.assets.js = tempArray.map((scriptFile: any) => `${scriptFile}${jsExtension}`)
          return cb(null, data)
        }
      )
    })
  }
}
