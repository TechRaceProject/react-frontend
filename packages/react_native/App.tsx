import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    Button,
    View,
    StyleSheet
} from 'react-native';
import socket from './socket.config';

const App = () => {
    const [wheel1, setWheel1] = useState<string>('');
    const [wheel2, setWheel2] = useState<string>('');
    const [wheel3, setWheel3] = useState<string>('');
    const [wheel4, setWheel4] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const sendMessage = () => {
        const data = {
            cmd: 1,
            data: [
                parseInt(wheel1, 10) || 0,
                parseInt(wheel2, 10) || 0,
                parseInt(wheel3, 10) || 0,
                parseInt(wheel4, 10) || 0
            ],
        };

        console.log('Sending data:', data);
        socket.send(JSON.stringify(data));
    };

    useEffect(() => {
        console.log('Connecting to WebSocket server...');

        socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            console.log('Received response from server:', response);
            setMessage(`Réponse du serveur: ${JSON.stringify(response)}`);
        };

        socket.onerror = (error) => {
            console.log('Connection Error:', error);
        };

        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text>Roue 1:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={wheel1}
                    onChangeText={setWheel1}
                />
                <Text>Roue 2:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={wheel2}
                    onChangeText={setWheel2}
                />
                <Text>Roue 3:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={wheel3}
                    onChangeText={setWheel3}
                />
                <Text>Roue 4:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={wheel4}
                    onChangeText={setWheel4}
                />
                <Button title="Submit" onPress={sendMessage} />
                {message ? <Text>{message}</Text> : null}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        width: '80%',
    },
});

export default App;
