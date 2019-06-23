module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/strongly-recommended',
    'google'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'vue'
  ],
  'rules': {
    'indent': [
      'warn',
      2
    ],
    'linebreak-style': [
      'warn',
      'windows'
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'arrow-parens': [
      'warn',
      'as-needed'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ]
  }
};