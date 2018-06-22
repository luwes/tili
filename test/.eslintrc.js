const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  plugins: ['ava'],
  extends: [
      'plugin:ava/recommended',
  ],
  rules: {
    'indent': OFF,
    'ava/no-skip-test': OFF,
  }
};
