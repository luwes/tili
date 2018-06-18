/* eslint-env node */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        loose: true,
        shippedProposals: true,
        targets: {
          browsers: ['ie >= 11']
        }
      }
    ]
  ],
  plugins: [
    ['@babel/plugin-transform-object-assign'],
    ['@babel/plugin-proposal-object-rest-spread']
  ],
  env: {
    test: {
      sourceMaps: 'inline',
      presets: ['@babel/preset-env'],
      plugins: ['@babel/transform-runtime'],
      only: ['test/helpers', 'src']
    }
  },
  compact: false
};
