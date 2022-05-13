const { off } = require('process');

module.exports = {
  extends: [
    'prettier',
    '@open-wc/eslint-config',
    'eslint-config-prettier',
    'plugin:lit/recommended',
    'plugin:prettier/recommended',
  ],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  globals: {
    __webpack_public_path__: true,
    PDFJS_BASEPATH: true,
    CKEDITOR_BASEPATH: true,
  },

  rules: {
    curly: ['error', 'all'],
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'no-unused-expressions': ['error', { allowTernary: true }],
    'require-await': 'error',
    'sort-imports': 'off',
    'lit/attribute-value-entities': 'warn',
    'lit/no-value-attribute': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'no-lone-blocks': 'off',
    'lit/no-invalid-html': 'off',
    'no-use-before-define': 'warn',
    'no-shadow': 'off',
    camelcase: 'warn',
    'lit-a11y/tabindex-no-positive': 'off',
    'lit-a11y/click-events-have-key-events': 'off',
    'lit-a11y/anchor-is-valid': 'off',
    'lit-a11y/no-autofocus': 'off',
    'lit-a11y/heading-has-content': 'off',
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js'],
      },
      alias: {
        map: [
          ['@components', './components'],
          ['@helpers', './helpers'],
          ['@assets', './assets'],
          ['@stylesB2B', './assets/styles'],
        ],
        extensions: ['.ts', '.js'],
      },
    },
  },

  overrides: [
    {
      files: ['**/*.ts', '**/*.js'],

      extends: ['plugin:@typescript-eslint/recommended'],

      parser: '@typescript-eslint/parser',

      plugins: ['@typescript-eslint'],

      rules: {
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/explicit-member-accessibility': 'warn',
        '@typescript-eslint/member-ordering': 'warn',
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/consistent-type-assertions': [
          'warn',
          {
            assertionStyle: 'angle-bracket',
            objectLiteralTypeAssertions: 'allow',
          },
        ],
        '@typescript-eslint/naming-convention': [
          'warn',
          {
            selector: 'class',
            format: ['PascalCase'],
          },
          {
            selector: 'memberLike',
            modifiers: ['private', 'protected'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
          },
        ],
        '@typescript-eslint/ban-types': [
          'warn',
          {
            types: {
              Function: {
                message:
                  'void the Function type, as it provides little safety for the following reasons',
                fixWith: '',
              },
            },
          },
        ],
      },
    },
  ],
};
