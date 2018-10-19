export default class HtmlWebpackChangeAssetsExtensionPlugin {
  options: object

  constructor(options?: object) {
    this.options = options || {}
  }

  apply(compiler: any) {
    compiler.hooks.compilation.tap('HtmlWebpackChangeAssetsExtensionPlugin', (compilation: any) => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
        'HtmlWebpackChangeAssetsExtensionPlugin',
        (data: any, cb: Function) => {
          // Skip if the plugin configuration didn't set `jsExtension`
          if (!data.plugin.options.jsExtension) {
            return cb(null)
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
