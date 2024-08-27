import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import security from 'eslint-plugin-security';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    plugins: {
      prettier,
    },
    rules: {
      'no-console': 'error',
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'prettier/prettier': 'warn', // Add Prettier rules
    },
  },
  {
    files: ['**/*.js'],
    plugins: {
      security,
    },
    rules: {
      'security/detect-object-injection': 'off',
    },
  },
];
