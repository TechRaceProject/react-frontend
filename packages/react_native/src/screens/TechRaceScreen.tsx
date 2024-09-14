import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ImageBackground,
    Alert,
} from 'react-native';

import IconCustomButton from '../components/IconCustomButton';
import CustomButton from '../components/CustomButton';
import ToggleButton from '../components/ToggleButton';
import SpeedSelector from '../components/SpeedSelector';
import Joystick from '../components/Joystick';
import CreateRacePopup from '../components/CreateRacePopup';
import HistoryRacePopup from '../components/HistoryRacePopUp';
import { emergencyStopAction } from '../actions/emergencyStopAction';
import { toggleBuzzerAction } from '../actions/toggleBuzzerAction';
import { toggleLedAction } from '../actions/toggleLedAction';
import { wtfButtonAction, stopWtfAnimations } from '../actions/wtfButtonAction';
import { toggleModeAction } from '../actions/toggleModeAction';
import { getUserVehicleState } from '../actions/getUserVehicleStateAction';

import OptimalWheelSpeedsGenerator from '../generators/OptimalWheelSpeedsGenerator';
import AdjustPositionJoystickScreenModeGenerator from '../generators/AdjustPositionJoystickScreenModeGenerator';
import { SendWheelSpeedCommand } from '../commands/SendWheelSpeedCommand';
import { CarModePowerEnum } from '../enums/CarModePowerEnum';

import socket from '../socket.config';
import { checkAndStartRace, stopRace } from '../actions/CreateRaceAction';

const { width } = Dimensions.get('window');

const TechRaceScreen: React.FC = () => {
    const [isConnected, setIsConnected] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
    const [raceStarted, setRaceStarted] = useState(false);
    const [raceId, setRaceId] = useState<number | null>(null);
    const [buzzerActive, setBuzzerActive] = useState(false);
    const [ledActive, setLedActive] = useState(true);
    const [vehicleState, setVehicleState] = useState<any>(null);
    const headIntervalId = useRef<number | null>(null);
    const wheelIntervalId = useRef<number | null>(null);
    const [isManualMode, setIsManualMode] = useState(true);
    const [selectedSpeed, setSelectedSpeed] = useState(1);
    const [dimension, setDimension] = useState({ width: 160, height: 160 });
    const [sportModePower, setSportModePower] = useState(
        CarModePowerEnum.EcoModePower
    );
    const [raceStartedOnce, setRaceStartedOnce] = useState(false);
    const [showHistoryPopup, setShowHistoryPopup] = useState(false);

    useEffect(() => {
        const fetchVehicleState = async () => {
            const vehicleStates = await getUserVehicleState(1); // @TODO : fix user ID and token
            if (vehicleStates && vehicleStates.length > 0) {
                setVehicleState(vehicleStates[0]);
            } else {
                console.error('Aucun état de véhicule trouvé.');
            }
        };

        fetchVehicleState();
    }, []);

    useEffect(() => {
        const [x, y] = AdjustPositionJoystickScreenModeGenerator(
            joystickPosition,
            'portrait'
        );

        if (raceStarted && raceId) {
            checkAndStartRace(
                { x, y },
                raceId,
                raceStartedOnce,
                setRaceStartedOnce
            );
        }

        if (socket.readyState === WebSocket.OPEN) {
            const wheelSpeedsGenerator = OptimalWheelSpeedsGenerator(
                x,
                y,
                dimension.width / 2,
                dimension.height / 2,
                sportModePower
            );

            SendWheelSpeedCommand(wheelSpeedsGenerator);
        }
    }, [joystickPosition, raceStartedOnce, raceStarted, raceId]);

    useEffect(() => {
        if (socket.readyState === WebSocket.OPEN) {
            setIsConnected(true);
        } else {
            socket.onopen = () => {
                setIsConnected(true);
            };

            socket.onclose = () => {
                setIsConnected(false);
            };

            socket.onerror = (error) => {
                console.log('WebSocket error via socket.config.ts:', error);
            };
        }

        return () => {
            socket.onopen = null;
            socket.onclose = null;
            socket.onerror = null;
        };
    }, []);

    const togglePopup = () => {
        setShowPopup((prev) => !prev);
    };

    const handleEmergencyStop = () => {
        emergencyStopAction();
        stopWtfAnimations();

        if (headIntervalId.current) {
            clearInterval(headIntervalId.current);
            headIntervalId.current = null;
        }

        if (wheelIntervalId.current) {
            clearInterval(wheelIntervalId.current);
            wheelIntervalId.current = null;
        }
    };

    const toggleMode = () => {
        toggleModeAction(isManualMode, setIsManualMode);
    };

    const toggleBuzzer = async () => {
        if (vehicleState?.id) {
            const updatedVehicleState = await getUserVehicleState(1); // @TODO : fix user ID and token

            if (updatedVehicleState && updatedVehicleState.length > 0) {
                toggleBuzzerAction(
                    buzzerActive,
                    setBuzzerActive,
                    vehicleState.id,
                    updatedVehicleState[0]
                );
            } else {
                Alert.alert(
                    'Erreur',
                    "Impossible de récupérer l'état actuel du véhicule."
                );
            }
        } else {
            Alert.alert('Erreur', "ID de l'état du véhicule introuvable.");
        }
    };

    const toggleLed = async () => {
        if (vehicleState?.id) {
            const updatedVehicleState = await getUserVehicleState(1); // @TODO : fix user ID and token

            if (updatedVehicleState && updatedVehicleState.length > 0) {
                toggleLedAction(
                    ledActive,
                    setLedActive,
                    vehicleState.id,
                    updatedVehicleState[0]
                );
            } else {
                Alert.alert(
                    'Erreur',
                    "Impossible de récupérer l'état actuel du véhicule."
                );
            }
        } else {
            Alert.alert('Erreur', "ID de l'état du véhicule introuvable.");
        }
    };

    const handleWtfButtonPress = () => {
        wtfButtonAction(socket);
    };

    const handleStartRace = (name: string, id: number) => {
        setRaceId(id);
        setRaceStarted(true);
        setRaceStartedOnce(false);
    };

    const handleStopRace = () => {
        if (raceId) {
            stopRace(raceId);
            setRaceStarted(false);
            setRaceStartedOnce(false);
        }
    };

    const handleSpeedChange = (speed: number) => {
        setSelectedSpeed(speed);
        switch (speed) {
            case 1:
                setSportModePower(CarModePowerEnum.EcoModePower);
                break;
            case 2:
                setSportModePower(CarModePowerEnum.NormalModePower);
                break;
            case 3:
                setSportModePower(CarModePowerEnum.SportModePower);
                break;
            default:
                setSportModePower(CarModePowerEnum.EcoModePower);
        }
    };
    const toggleHistoryPopup = () => {
        setShowHistoryPopup((prev) => !prev);
    };

    return (
        <ImageBackground
            source={require('../assets/images/Background.png')}
            style={styles.container}
            imageStyle={styles.backgroundImage}
            resizeMode="stretch"
        >
            <Text style={[styles.headerText, styles.fontFamily]}>
                Tech Race
            </Text>

            <View style={styles.rowTopCenter}>
                <View style={styles.columnTopLeft}>
                    {raceStarted ? (
                        <IconCustomButton
                            labelTop="ARRETEZ"
                            labelBottom="LA COURSE"
                            iconSource={require('../assets/images/StopIcon.png')}
                            onPress={handleStopRace}
                            style={{
                                backgroundColor: 'red',
                                borderColor: 'red',
                            }}
                            textStyle={[styles.buttonText, styles.fontFamily]}
                        />
                    ) : (
                        <IconCustomButton
                            labelTop="CRÉER"
                            labelBottom="UNE COURSE"
                            iconSource={require('../assets/images/Race.png')}
                            onPress={togglePopup}
                            textStyle={[styles.buttonText, styles.fontFamily]}
                        />
                    )}
                    <IconCustomButton
                        labelTop="HISTORIQUE"
                        labelBottom="DES COURSES"
                        iconSource={require('../assets/images/History.png')}
                        onPress={toggleHistoryPopup}
                        textStyle={[styles.buttonText, styles.fontFamily]}
                    />
                </View>
                <HistoryRacePopup
                    visible={showHistoryPopup}
                    onClose={toggleHistoryPopup}
                />
                <View style={styles.centerTopCenter}>
                    <Image
                        source={require('../assets/images/Voiture-squelette.png')}
                        style={styles.carImage}
                    />
                    <Text
                        style={
                            isConnected
                                ? styles.statusTextConnected
                                : styles.statusTextDisconnected
                        }
                    >
                        Status de la voiture :{' '}
                        <Text
                            style={
                                isConnected
                                    ? styles.statusConnected
                                    : styles.statusDisconnected
                            }
                        >
                            {isConnected ? 'Connecté' : 'Déconnecté'}
                        </Text>
                    </Text>
                </View>

                <View style={styles.columnTopRight}>
                    <IconCustomButton
                        labelTop="MODE"
                        labelBottom="CAMERA"
                        iconSource={require('../assets/images/Camera-mode.png')}
                        onPress={() => console.log('Mode caméra pressé')}
                        textStyle={[styles.buttonText, styles.fontFamily]}
                    />
                    <IconCustomButton
                        labelTop="WTF"
                        labelBottom="BUTTON"
                        iconSource={require('../assets/images/WtfButton.png')}
                        onPress={handleWtfButtonPress}
                        textStyle={[styles.buttonText, styles.fontFamily]}
                    />
                </View>
            </View>

            <View style={styles.rowMiddleCenter}>
                <View style={styles.columnMiddleLeft}>
                    <View style={styles.changeSpeed}>
                        <SpeedSelector onSpeedChange={handleSpeedChange} />
                    </View>

                    <View style={styles.batteryVolume}>
                        <View style={styles.lineStyle} />
                        <Image
                            source={require('../assets/images/Battery.png')}
                            style={styles.batteryImage}
                        />
                        <Text style={styles.batteryText}>
                            38<Text style={styles.batteryPercentage}>%</Text>
                        </Text>
                    </View>

                    <View style={styles.speedKm}>
                        <View style={styles.lineStyle} />
                        <Text style={styles.speedNumber}>02</Text>
                        <Text style={styles.speedUnit}>KM/H</Text>
                    </View>
                </View>

                <View style={styles.columnMiddleCenter}>
                    <View style={styles.columnTopMiddleCenter}>
                        <Text style={[styles.modeTitle, styles.fontFamily]}>
                            MODE:
                        </Text>
                        <View style={styles.changeMode}>
                            <ToggleButton
                                isLandscape={true}
                                onPress={toggleMode}
                            />
                            <View style={styles.modeTextContainer}>
                                <Text style={styles.modeText}>MANUEL</Text>
                                <Text style={styles.modeText}>AUTO</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.columnBottomMiddleCenter}>
                        <Joystick
                            dimension={{
                                width: dimension.width,
                                height: dimension.height,
                            }}
                            size={50}
                            styles={{ ...styles }}
                            state={{ joystickPosition, setJoystickPosition }}
                            uriJoystick={require('../assets/images/joystick.png')}
                            uriJoystickArrow={require('../assets/images/joystick_arrow.png')}
                        />
                    </View>
                </View>

                <View style={styles.columnMiddleRight}>
                    <CustomButton
                        iconSource={require('../assets/images/Klaxon.png')}
                        onPress={toggleBuzzer}
                        iconStyle={{ width: 22, height: 28 }}
                    />

                    <CustomButton
                        iconSource={require('../assets/images/STOP.png')}
                        onPress={handleEmergencyStop}
                        style={[
                            styles.emergencyButton,
                            { width: 70, height: 70 },
                        ]}
                        iconStyle={{ width: 50, height: 11 }}
                    />

                    <CustomButton
                        iconSource={require('../assets/images/Led.png')}
                        onPress={toggleLed}
                        iconStyle={{ width: 50, height: 28 }}
                    />
                </View>
            </View>

            <CreateRacePopup
                visible={showPopup}
                onClose={togglePopup}
                onSubmit={handleStartRace}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    fontFamily: {
        fontFamily: 'Orbitron-Black',
    },
    container: {
        flex: 1,
        backgroundColor: '#121216',
        padding: 0,
        alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        top: -80,
    },
    headerText: {
        fontSize: 30,
        color: '#fff',
        textAlign: 'center',
        marginVertical: 10,
    },
    rowTopCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 0,
        position: 'relative',
        height: '35%',
    },
    columnTopLeft: {
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative',
        flex: 1,
        height: 270,
    },
    columnTopRight: {
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative',
        flex: 1,
        height: 270,
    },
    centerTopCenter: {
        width: '50%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
    },
    emergencyButton: {
        borderColor: '#3730A3',
        backgroundColor: '#E73133',
        marginLeft: '20%',
    },
    carImage: {
        width: 100,
        height: 133,
        resizeMode: 'contain',
        marginBottom: '30%',
    },
    buttonText: {
        fontSize: 11,
        color: '#fff',
    },
    statusTextConnected: {
        color: '#008000',
        fontSize: 12,
        marginBottom: '5%',
    },
    statusConnected: {
        color: '#00FF00',
    },
    statusTextDisconnected: {
        color: '#800000',
        fontSize: 12,
        marginBottom: '5%',
    },
    statusDisconnected: {
        color: '#FF0000',
    },
    columnMiddleLeft: {
        width: '30%',
    },
    changeSpeed: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
    },
    batteryVolume: {
        width: '100%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        flexDirection: 'row',
    },
    lineStyle: {
        width: '50%',
        height: 1,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        top: 0,
    },
    batteryImage: {
        width: 36,
        height: 36,
        resizeMode: 'contain',
        marginRight: 5,
    },
    batteryText: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'Orbitron-Black',
    },
    batteryPercentage: {
        fontFamily: 'Orbitron-Medium',
        fontSize: 15,
    },
    speedNumber: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'Orbitron-Black',
    },
    speedUnit: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Orbitron-Medium',
    },
    speedKm: {
        width: '100%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        flexDirection: 'column',
    },
    columnMiddleCenter: {
        flex: 1,
        padding: 0,
        width: '40%',
    },
    changeMode: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    modeTextContainer: {
        flexDirection: 'column',
        marginLeft: 5,
        gap: 10,
    },
    modeText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'left',
        marginBottom: 2,
        fontFamily: 'Orbitron-Medium',
    },
    modeTitle: {
        color: 'white',
        fontSize: 18,
        marginBottom: 25,
    },
    columnMiddleRight: {
        width: '30%',
        paddingTop: '6%',
        paddingLeft: '6%',
        gap: 40,
    },
    rowMiddleCenter: {
        flexDirection: 'row',
        height: '50%',
        justifyContent: 'center',
        width: '100%',
    },
    columnTopMiddleCenter: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    columnBottomMiddleCenter: {
        width: '100%',
        height: '50%',
    },
    containerGlobalJoystick: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#3730A3',
        borderRadius: 300,
        marginTop: '-15%',
        backgroundColor: '#121216',
    },
    containerJoystick: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    joystick: {
        position: 'absolute',
    },
});

export default TechRaceScreen;
