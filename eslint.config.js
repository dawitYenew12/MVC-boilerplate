import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import security from 'eslint-plugin-security';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    plugins: {
      prettier,
      security,
    },
    rules: {
      'no-console': 'error',
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto', // Correct Prettier config for end-of-line
        },
      ],
      'security/detect-object-injection': 'off',
    },
  },
];
