module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@next/next/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    next: {
      rootDir: 'website',
    },
  },
  rules: {
    semi: ['error', 'never'],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
        ],
        'newlines-between': 'always',
      },
    ],
  },
}
