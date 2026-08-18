const {fixupConfigRules, fixupPluginRules} = require('@eslint/compat');
const {FlatCompat} = require('@eslint/eslintrc');
const js = require('@eslint/js');
const stylistic = require('@stylistic/eslint-plugin');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const {defineConfig, globalIgnores} = require('eslint/config');
const eslintConfigPrettier = require('eslint-config-prettier/flat');
const _import = require('eslint-plugin-import');

const compat = new FlatCompat({
  allConfig: js.configs.all,
  recommendedConfig: js.configs.recommended,
});

module.exports = defineConfig([
  {
    extends: fixupConfigRules(
      compat.extends(
        '@react-native',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
      ),
    ),
    languageOptions: {
      parser: tsParser,
      parserOptions: {project: ['./tsconfig.json']},
    },
    plugins: {
      import: fixupPluginRules(_import),
      '@stylistic': stylistic,
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
    },
    rules: {
      '@stylistic/object-curly-spacing': ['error'],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-require-imports': [
        'error',
        {allow: ['eslint', '@stylistic/', '@typescript-eslint/']},
      ],
      eqeqeq: ['error', 'always'],
      'import/order': [
        'error',
        {
          alphabetize: {order: 'asc'},
          groups: [
            'builtin',
            'internal',
            'external',
            'parent',
            'sibling',
            'index',
            'type',
          ],
        },
      ],
      'no-console': 'error',
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-const': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'react-native/no-inline-styles': 'error',
      'react-native/no-single-element-style-arrays': 'error',
      'react-native/no-unused-styles': 'warn',
      'react-native/sort-styles': [
        'error',
        'asc',
        {ignoreClassNames: false, ignoreStyleProperties: false},
      ],
      'react/jsx-curly-brace-presence': [
        'warn',
        {children: 'never', props: 'never'},
      ],
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          ignoreCase: true,
          reservedFirst: true,
          shorthandFirst: true,
        },
      ],
      'react/no-unstable-nested-components': ['error', {allowAsProps: true}],
      'sort-imports': ['error', {ignoreDeclarationSort: true}],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {checksVoidReturn: false},
      ],
    },
  },
  globalIgnores([
    '**/babel.config.js',
    '**/metro.config.js',
    '**/.prettierrc.js',
    '**/jest.config.js',
  ]),
  eslintConfigPrettier,
]);
