const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  env: {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  parser: 'babel-eslint',
  extends: 'eslint:recommended',
  parserOptions: {
    'ecmaVersion': 8,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      'experimentalObjectRestSpread': true
    }
  },
  rules: {
    'no-console': OFF,
    'indent': [ERROR, 2, { 'SwitchCase': 1 }],
    'linebreak-style': [ERROR, 'unix'],
    'quotes': [ERROR, 'single'],
    'semi': [ERROR, 'always'],
    'valid-jsdoc': [
      WARNING,
      {
        'prefer': {
          'returns': 'return',
          'arg': 'param',
          'arguments': 'param'
        },
        'requireParamDescription': false,
        'requireReturn': false,
        'requireReturnDescription': false
      }
    ]
  }
};
