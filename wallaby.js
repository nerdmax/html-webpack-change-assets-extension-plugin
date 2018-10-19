module.exports = function(w) {
  return {
    files: ['src/**/*.ts', 'test/fixtures/entry.js'],

    tests: ['test/**/*.test.ts'],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    preprocessors: {
      '**/*.js?(x)': file =>
        require('babel-core').transform(file.content, {
          sourceMap: true,
          plugins: ['transform-es2015-modules-commonjs'],
          presets: ['babel-preset-jest']
        })
    }
  }
}
