import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import CarControlScreen from './src/screens/CarControlScreen';
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
        <SafeAreaView style={styles.appContainer}>
            <CarControlScreen/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
