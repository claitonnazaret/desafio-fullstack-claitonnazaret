module.exports =  {
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends:  [
    'plugin:@typescript-eslint/recommended', // uses typescript-specific linting rules
    'plugin:react/recommended', // uses react-specific linting rules
    'plugin:prettier/recommended', // enables eslint-plugin-prettier and eslint-config-prettier
    'prettier/react',
  ],
  parserOptions:  {
    ecmaVersion:  6,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
    ecmaFeatures: {
      "jsx": true
    }
  },
  plugins: [
    "react"
  ],
  rules:  {
    "semi": "error",
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-var-requires': 1,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/prefer-interface': 0,
    '@typescript-eslint/prop-types': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/member-delimiter-style': {
      delimiter: 'none',
      requireLast: false,
    },
    'react/display-name': 0,
    'react/no-explicit-any': 0
  },
  settings:  {
    react:  {
      version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};