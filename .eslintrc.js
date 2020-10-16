module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  extends: [
    // 'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier',
    'standard-with-typescript'
  ],
  parserOptions: {
    ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',  // Allows for the use of imports
    project: './tsconfig.json',
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    'eslint-disable-next-line @typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],
    '@typescript-eslint/no-redeclare': 'off'
    // 'space-before-function-paren': [
    //   2,
    //   {
    //     'anonymous': 'always',
    //     'named': 'never',
    //     'asyncArrow': 'always'
    //   }
    // ]
  },
  overrides: [
    {
      files: [
        '**.spec.ts', '**.test.ts'
      ], // Or *.test.js
      rules: {
        'import/first': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'no-useless-catch': 'off',
      }
    },
    {
      files: [
        'src/**/index.ts'
      ], // Or *.test.js
      rules: {
        '@typescript-eslint/no-redeclare': 'off'
      }
    }
  ]
};
