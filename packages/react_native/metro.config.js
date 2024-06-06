const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};
const path = require('path');

module.exports = {
    resolver: {
        unstable_enableSymlinks: true
    },

    watchFolders: [path.resolve(__dirname, '../../node_modules')],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
