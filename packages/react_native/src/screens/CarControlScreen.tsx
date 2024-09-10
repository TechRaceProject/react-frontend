import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { CarModePowerEnum } from '../enums/CarModePowerEnum';

import AdjustPositionJoystickScreenModeGenerator from '../generators/AdjustPositionJoystickScreenModeGenerator';
import OptimalWheelSpeedsGenerator from '../generators/OptimalWheelSpeedsGenerator';

import socket from '../socket.config';

import ButtonToggle from '../components/ButtonToggle';
import Camera from '../components/Camera';
import CustomButton from '../components/CustomButton';
import CreateRacePopup from '../components/CreateRacePopup';
import Joystick from '../components/Joystick';
import MenuToggle from '../components/MenuToggle';

import { SendWheelSpeedCommand } from '../commands/SendWheelSpeedCommand';
import { SendAutoModeCommand } from '../commands/SendAutoModeCommand';

import { checkAndStartRace, stopRace } from '../actions/CreateRaceAction';

export type Coordinates = {
    x: number;
    y: number;
};

const CarControlScreen = () => {
    const [joystickPosition, setJoystickPosition] = useState<Coordinates>({x: 0, y: 0});
    const [isEnabledButton, setIsEnabledButton] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [raceStarted, setRaceStarted] = useState(false);
    const [raceId, setRaceId] = useState<number | null>(null);
    const [message, setMessage] = useState<string>('');

    const dimension = {width: 210, height: 210};


    const handlePress = () => {
        SendWheelSpeedCommand([0, 0, 0, 0]);
    }

    useEffect(() => {
        console.log('Connecting to WebSocket server...');

        socket.onmessage = (event) => {
            try {
                const data = event.data.trim();
                if (data.startsWith('{') || data.startsWith('[')) {
                    const response = JSON.parse(data);
                    console.log('Parsed response from server:', response);
                    setMessage(`Réponse du serveur: ${JSON.stringify(response)}`);
                } else {
                    console.log('Received non-JSON response from server:', data);
                    setMessage(`Réponse du serveur: ${data}`);
                }
            } catch (error) {
                console.error('Error parsing server response:', error);
                console.log('Raw server response:', event.data);
                setMessage(`Réponse du serveur (texte brut): ${event.data}`);
            }
        };

        return () => {
            // socket.close();
        };
    }, []);

    useEffect(() => {
        let [x, y] = AdjustPositionJoystickScreenModeGenerator(joystickPosition, 'landscape');

        if (raceStarted && raceId) {
            checkAndStartRace(
                { x, y },
                raceId,
                raceStartedOnce,
                setRaceStartedOnce
            );
        }

        const wheelSpeedsGenerator = OptimalWheelSpeedsGenerator(
            x,
            y,
            dimension.width / 2,
            dimension.height / 2,
            CarModePowerEnum.SportModePower
        );

        SendWheelSpeedCommand(wheelSpeedsGenerator);
    }, [joystickPosition]);

    useEffect(() => {
        isEnabledButton
            ? SendAutoModeCommand(1)
            : SendAutoModeCommand(0)
    }, [isEnabledButton]);

    const handleStartRace = (name: string, id: number) => {
        setRaceId(id);
        setRaceStarted(true);
        // setRaceStartedOnce(false);
        console.log(`Course commencée avec ID : ${id}`);
    };

    return (
        <>
            <Camera />
            <Joystick
                dimension={dimension}
                size={70}
                styles={{ ...styles }}
                state={{ joystickPosition, setJoystickPosition }}
                uriJoystick={require('../assets/images/joystick.png')}
                uriJoystickArrow={require('../assets/images/joystick_arrow.png')}
            />
            <View style={styles.containerCarMode}>
                <View style={styles.flex}>
                    <Text style={styles.buttonToggleText}>MANUEL</Text>
                    <ButtonToggle state={{ isEnabledButton, setIsEnabledButton }}/>
                    <Text style={styles.buttonToggleText}>AUTO</Text>
                </View>
                <CustomButton
                    iconSource={require('../assets/images/STOP.png')}
                    onPress={handlePress}
                    style={[styles.emergencyButton, { width: 70, height: 70 }]}
                    iconStyle={{ width: 50, height: 11 }}
                />
            </View>
            <MenuToggle />

            <CreateRacePopup visible={showPopup} onClose={() => setShowPopup((prev) => !prev)} onSubmit={handleStartRace} />
        </>
    );
};

const styles = StyleSheet.create({
    containerGlobalJoystick: {
        position: 'absolute',
        justifyContent: 'flex-start',
        right: '10%',
        top: '6%',
    },
    containerJoystick: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    joystick: {
        position: 'absolute',
    },
    containerCarMode: {
        width: '85%',
        height: '5.5%',
        position: 'absolute',
        bottom: '23%',
        right: '-32%',
        flex: 1,
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 15,
        transform: [{rotate: '-90deg'}],
    },
    flex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100%',
        borderRadius: 7,
    },
    buttonToggleText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Orbitron-VariableFont_wght',
        fontWeight: '500',
        fontSize: 14,
    },
    emergencyButton: {
        borderColor: '#3730A3',
        backgroundColor: '#E73133',
    },
});

export default CarControlScreen;
