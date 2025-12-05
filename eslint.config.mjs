import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

const eslintConfig = defineConfig([
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'next.config.js',
    'eslint.config.mjs',
  ]),
  ...nextVitals,
  ...nextTs,
  eslintConfigPrettier,
  {
    files: ['**/*.{ts,tsx,js,mjs,cjs}'],
    rules: {
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          'newlines-between': 'always',
        },
      ],
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
        },
      ],
    },
    settings: {
      'import/order': {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        'newlines-between': 'always',
      },
    },
  },
]);

export default eslintConfig;

// import path from 'path';
// import { fileURLToPath } from 'url';

// import { FlatCompat } from '@eslint/eslintrc';
// import eslintConfigPrettier from 'eslint-config-prettier';
//

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const config = [
//   ...compat.extends('next/core-web-vitals'),
//   ...compat.extends('next/typescript'),
//   {
//     ignores: ['**/.next/', 'next.config.*'],
//   },
//   eslintConfigPrettier,
//   importPlugin.flatConfigs.typescript,
//   {
//     files: ['**/*.{ts,tsx,js,mjs,cjs}'],
//     rules: {
//       'import/order': [
//         'error',
//         {
//           alphabetize: {
//             order: 'asc',
//             caseInsensitive: true,
//           },
//           groups: [
//             'builtin',
//             'external',
//             'internal',
//             'parent',
//             'sibling',
//             'index',
//             'object',
//           ],
//           'newlines-between': 'always',
//         },
//       ],
//       'no-unused-vars': [
//         'error',
//         {
//           vars: 'all',
//           args: 'after-used',
//           ignoreRestSiblings: false,
//         },
//       ],
//     },
//     settings: {
//       'import/order': {
//         alphabetize: {
//           order: 'asc',
//           caseInsensitive: true,
//         },
//         groups: [
//           'builtin',
//           'external',
//           'internal',
//           'parent',
//           'sibling',
//           'index',
//           'object',
//         ],
//         'newlines-between': 'always',
//       },
//     },
//   },
// ];

// export default config;
