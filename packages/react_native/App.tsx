import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import Joystick from './src/components/Joystick';
import {
    ErrorEvent,
    ExceptionEvent,
    MessageEvent,
    OpenEvent,
    TimeoutEvent,
} from 'react-native-sse';
import useSSE from './src/hooks/useServerSentEvent';
import { handleSSEMessage } from './src/utils/handleSSEMessage';

function App(): React.JSX.Element {
    /**
     * on utilise l'ip : 'http://10.0.2.2:8000' pour se connecter à l'api car
     * l'émulateur android ne peut pas se connecter à l'api en localhost
     */
    const apiUrl = 'http://10.0.2.2:8000/api';

    const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });

    useSSE(
        apiUrl + '/sse',
        (event: OpenEvent) => {
            console.log('Connexion SSE ouverte:', event);
        },
        (event: MessageEvent) => {
            handleSSEMessage(event);
        },
        (event: ErrorEvent | TimeoutEvent | ExceptionEvent) => {
            console.error('Erreur SSE:', event);
        }
    );

    console.log('joystickPosition', joystickPosition);

    return (
        <SafeAreaView style={[styles.safeArea]}>
            <View style={styles.appContainer}>
                <Joystick
                    dimension={{ width: 300, height: 300 }}
                    size={100}
                    styles={{ ...styles }}
                    state={{ joystickPosition, setJoystickPosition }}
                    uriJoystick={require('./src/assets/joystick.png')}
                    uriJoystickArrow={require('./src/assets/joystick_arrow.png')}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    appContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerJoystick: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    joystick: {
        position: 'absolute',
    },
});

export default App;
