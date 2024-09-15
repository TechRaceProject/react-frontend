import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SendCameraCommand } from '../commands/SendCameraCommand';
import { WebView } from 'react-native-webview';

function Camera() {
    const [cameraInitialized, setCameraInitialized] = useState(false);

    useEffect(() => {
        SendCameraCommand(1, setCameraInitialized);
    }, []);

    return (
        <View style={styles.container}>
            {cameraInitialized && (
                <WebView
                    style={styles.webview}
                    source={{ uri: 'http://192.168.1.50:7000/' }}
                    width={'100%'}
                    height={'40%'}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '60%',
        height: '100%',
        transform: [{ scaleY: 3.5 }, { scaleX: 2.4 }],
    },
    webview: {
        transform: [{ rotate: '-90deg' }, { scaleY: 1.35 }],
    },
});

export default Camera;
