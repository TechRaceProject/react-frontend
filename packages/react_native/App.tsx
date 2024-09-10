import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    ErrorEvent,
    ExceptionEvent,
    MessageEvent,
    OpenEvent,
    TimeoutEvent,
} from 'react-native-sse';
import useSSE from './src/hooks/useServerSentEvent';
import { handleSSEMessage } from './src/utils/handleSSEMessage';

import LoginRegisterScreen from './src/screens/LoginRegisterScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (token) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (e) {
                console.error(e);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <SafeAreaView style={[styles.appContainer]}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="LoginRegister">
                    <Stack.Screen
                        name="LoginRegister"
                        component={LoginRegisterScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
    },
});

export default App;
