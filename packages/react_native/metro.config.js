const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

const path = require('path');
const config = {
    resolver: {
        unstable_enableSymlinks: true // Turn on symlink support
    },

  watchFolders: [
    path.resolve(__dirname, '../../node_modules'),
    path.resolve(__dirname, '../../node_modules/@frontend/shared'),
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
