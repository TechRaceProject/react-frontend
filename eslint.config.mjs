import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import typescript from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import reactNative from "eslint-plugin-react-native";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig } from "eslint-define-config";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([...fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended",
    )), 
    {
        plugins: {
            react: fixupPluginRules(react),
            "react-hooks": fixupPluginRules(reactHooks),
            prettier: fixupPluginRules(prettier),
            "@typescript-eslint": fixupPluginRules(typescript),
        },

        ignores: ['dist', 'node_modules'],

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },

            ecmaVersion: 12,
            sourceType: "module",

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        settings: {
            react: {
                version: "detect",
            },
        },
    },
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        rules: {
            // Ajouter ici les règles communes à tous les projets 
            'consistent-return': 'error',

            'import/prefer-default-export': 'off',

            'no-console': 'off',
            'no-underscore-dangle': 'off',
            'no-restricted-syntax': 'off',
            'no-plusplus': 'off',
            'no-unused-expressions': 'warn',
            
            'prettier/prettier': 'error',

            "react/react-in-jsx-scope": "off",

            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/ban-ts-comment': 'warn',
        },
    },
    {
        files: ["packages/react/**/*.js", "packages/react/**/*.jsx", "packages/react/**/*.ts", "packages/react/**/*.tsx"],
        plugins: {
            react: fixupPluginRules(react),
            "react-hooks": fixupPluginRules(reactHooks),
        },
        env: {
            browser: true,
        },
        parserOptions: {
            project: ['./packages/react/tsconfig.json'],
            tsconfigRootDir: './packages/react',
        },
        rules: {
            'react/jsx-props-no-spreading': 'off',
            'react-refresh/only-export-components': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'off',
            'react/require-default-props': 'off',
            'react/no-array-index-key': 'off',
            'react/jsx-props-no-spreading': 'off',
        },
        settings: {
            'import/resolver': {
                node: {
                    paths: ['./packages/react/src'],
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.css'],
                },
                typescript: {
                    project: './packages/react/tsconfig.json',
                },
                alias: {
                    map: [['~', path.resolve(__dirname, '././packages/react/src')]],
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
                },
            },
        }
    },
    {
        files: ["packages/react_native/**/*.js", "packages/react_native/**/*.jsx", "packages/react_native/**/*.ts", "packages/react_native/**/*.tsx"],
        plugins: {
            "react-native": reactNative,
        },
        rules: {
            "react-native/no-inline-styles": "off",
            "react-native/no-raw-text": "off",
        },
    },
]);
