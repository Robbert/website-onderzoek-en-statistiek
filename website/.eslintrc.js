module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:@next/next/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react', 'react-hooks', 'jest'],
  settings: {
    next: {
      rootDir: 'website',
    },
    'import/resolver': {
      alias: {
        map: [['~', '.']],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
      node: {
        paths: ['.'],
      },
    },
  },
  rules: {
    semi: ['error', 'never'],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external']],
        'newlines-between': 'always',
      },
    ],
    indent: [
      'error',
      2,
      { ignoredNodes: ['TemplateLiteral > *'], SwitchCase: 1 },
    ],
  },
}
