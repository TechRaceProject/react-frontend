import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import TechRaceScreen from './src/screens/TechRaceScreen';
import BottomNavigationBar from './src/components/BottomNavigationBar';
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


    return (
      <SafeAreaView style={styles.container}>
      <TechRaceScreen/>
      <View style={styles.bottomBar}>
        <BottomNavigationBar />
      </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default App;
