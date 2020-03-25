module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/essential'
  ],
  rules: {
    'no-console': 0,
    'no-lonely-if': 0,
    'no-unused-vars': 1,
    'no-undef': 1,
    'vue/no-unused-vars': 1,
    'vue/valid-template-root': 0,
    'eqeqeq': 1
  }
}
