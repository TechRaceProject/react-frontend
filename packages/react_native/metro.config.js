const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
    resolver: {
        unstable_enableSymlinks: true,
        extraNodeModules: {
            shared: require('path').resolve(__dirname, '../shared'),
        },
    },
    watchFolders: [
        require('path').resolve(__dirname, '../../node_modules'),
        require('path').resolve(__dirname, '../shared'),
    ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
