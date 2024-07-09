import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    Button,
    StyleSheet,
} from 'react-native';
import socket from '../socket.config';
import { CommandCar } from '../enums/CarCommandEnum';
import { createCarCommand } from '../validators/CarCommandValidator';

const CarControlScreen = () => {
    const [wheel1, setWheel1] = useState<string>('');
    const [wheel2, setWheel2] = useState<string>('');
    const [wheel3, setWheel3] = useState<string>('');
    const [wheel4, setWheel4] = useState<string>('');
    const [ledAnimation, setLedAnimation] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const sendWheelSpeedCommand = () => {
        try {
            const command = createCarCommand(CommandCar.WheelSpeed, [
                parseInt(wheel1, 10) || 0,
                parseInt(wheel2, 10) || 0,
                parseInt(wheel3, 10) || 0,
                parseInt(wheel4, 10) || 0,
            ]);

            console.log('Sending WheelSpeed data:', command);
            socket.send(JSON.stringify(command));
        } catch (error) {
            console.error(error.message);
        }
    };

    const sendLedAnimationCommand = () => {
        try {
            const command = createCarCommand(
                CommandCar.LedAnimation,
                parseInt(ledAnimation, 10) || 0
            );

            console.log('Sending LedAnimation data:', command);
            socket.send(JSON.stringify(command));
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        console.log('Connecting to WebSocket server...');

        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            console.log('Received response from server:', response);
            setMessage(`Réponse du serveur: ${JSON.stringify(response)}`);
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
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
            <Button
                title="Submit WheelSpeed"
                onPress={sendWheelSpeedCommand}
            />

            <Text>Led Animation:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={ledAnimation}
                onChangeText={setLedAnimation}
            />
            <Button
                title="Submit LedAnimation"
                onPress={sendLedAnimationCommand}
            />

            {message ? <Text>{message}</Text> : null}
        </ScrollView>
    );
};

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

export default CarControlScreen;
