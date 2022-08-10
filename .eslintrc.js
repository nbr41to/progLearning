module.exports = {
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'plugin:storybook/recommended',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint', 'unused-imports', 'import'],
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   project: './tsconfig.json',
  // },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': ['error'],
    'no-unused-vars': ['error'],
    'unused-imports/no-unused-imports': ['error'],
    '@typescript-eslint/consistent-type-imports': ['error'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'import/no-default-export': ['error'],
    'import/order': [
      'error',
      {
        groups: [
          'type',
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'index',
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          // ここに書いた順序で間に1行空行をあけつつ整頓される
          { pattern: '@/libs/**', group: 'internal', position: 'before' },
          { pattern: '@/generated/**', group: 'internal', position: 'before' },
          // ... 省略
          {
            pattern: '@/components/**',
            group: 'internal',
            position: 'before',
          },
        ],
      },
    ],
    /* off */
    'react/jsx-props-no-spreading': ['off'],
    'import/prefer-default-export': ['off'],
    'import/extensions': ['off'],
    'arrow-body-style': ['off'],
    'jsx-a11y/anchor-is-valid': ['off'],
    'react/require-default-props': ['off'],
    'react/react-in-jsx-scope': ['off'],
  },
  overrides: [
    {
      // 実はいらない
      files: ['*.stories.tsx', 'pages/**/*'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        'react/jsx-filename-extension': 'off',
      },
    },
  ],
};
