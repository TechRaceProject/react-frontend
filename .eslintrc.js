module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      'react',
      'react-hooks',
      'prettier',
      'react-native',
    ],
    rules: {
      'prettier/prettier': 'error',
      // Ajoutez d'autres règles personnalisées ici
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    overrides: [
      {
        files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
        rules: {
          // Ajoutez des règles spécifiques pour les fichiers JavaScript/TypeScript ici
        },
      },
    ],
  };
  