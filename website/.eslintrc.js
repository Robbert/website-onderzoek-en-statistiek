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
  plugins: ['import', 'resolver-jsconfig'],
  settings: {
    next: {
      rootDir: 'website',
    },
    'import/resolver': {
      jsconfig: {
        config: 'jsconfig.json',
        extensions: ['.js', '.jsx', 'gql'],
      },
    },
  },
  rules: {
    semi: ['error', 'never'],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': [2, {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
        ],
        'newlines-between': 'always',
      },
    ],
    indent: ['error', 2, { ignoredNodes: ['TemplateLiteral > *'], SwitchCase: 1 }],
  },
}
