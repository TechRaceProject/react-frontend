const path = require('path');

module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.css'],
            },
            typescript: {
                project: './tsconfig.json',
            },
            alias: {
                map: [['~', path.resolve(__dirname, './src')]],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
            },
        },
    },
    plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint',
        'jsx-a11y',
        'prettier',
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react-refresh/only-export-components': 'off',
        'react-hooks/rules-of-hooks': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        'import/prefer-default-export': 'off',
        'no-console': 'off',
        'react-hooks/exhaustive-deps': 'off',
        '@typescript-eslint/ban-ts-comment': 'error',
        'prettier/prettier': 'error',
        'no-underscore-dangle': 'off',
        'no-restricted-syntax': 'off',
        'no-plusplus': 'off',
        'consistent-return': 'error',
        'no-unused-expressions': 'warn',
        'react/require-default-props': 'off',
        'react/no-array-index-key': 'off',
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
};
