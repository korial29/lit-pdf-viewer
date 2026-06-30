import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import openWC from '@open-wc/eslint-config';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      'www/pdfjs-dist/**',
      'www/fonts/**',
      'www/style/**',
    ],
  },
  ...openWC,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      globals: {
        __webpack_public_path__: 'writable',
        PDFJS_BASEPATH: 'writable',
        CKEDITOR_BASEPATH: 'writable',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'prettier/prettier': 'error',
      curly: ['error', 'all'],
      'class-methods-use-this': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'import-x/extensions': 'off',
      'import-x/no-unresolved': 'off',
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
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
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
    },
  },
);
