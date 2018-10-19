const path = require('path')
const fs = require('fs')
const MemoryFileSystem = require('memory-fs')
const webpack = require('webpack')
const rimraf = require('rimraf')
const HtmlWebpackPlugin = require('html-webpack-plugin')

import HtmlWebpackChangeAssetsExtensionPlugin from '../src/html-webpack-change-assets-extension-plugin'

const OUTPUT_DIR = path.join(__dirname, './dist')
console.log(OUTPUT_DIR)

/**
 * Dummy test
 */
describe('HtmlWebpackChangeAssetsExtensionPlugin', () => {
  beforeEach(function(done) {
    rimraf(OUTPUT_DIR, done)
  })

  test('does not add customized file extension by default', done => {
    webpack(
      {
        entry: path.join(__dirname, 'fixtures', 'entry.js'),
        output: {
          path: OUTPUT_DIR
        },
        plugins: [new HtmlWebpackPlugin(), new HtmlWebpackChangeAssetsExtensionPlugin()]
      },
      (err: any) => {
        expect(err).toBeFalsy()
        let htmlFile = path.resolve(__dirname, './dist/index.html')
        expect(fs.readFileSync(htmlFile, 'utf8')).toContain('"main.js"')
        done()
      }
    )
  })

  test('adds customized file extension when jsExtension config is given', done => {
    webpack(
      {
        entry: path.join(__dirname, 'fixtures', 'entry.js'),
        output: {
          path: OUTPUT_DIR
        },
        plugins: [
          new HtmlWebpackPlugin({
            jsExtension: '.gz'
          }),
          new HtmlWebpackChangeAssetsExtensionPlugin()
        ]
      },
      (err: any) => {
        expect(err).toBeFalsy()
        let htmlFile = path.resolve(__dirname, './dist/index.html')
        expect(fs.readFileSync(htmlFile, 'utf8')).toContain('"main.js.gz"')
        done()
      }
    )
  })
})
