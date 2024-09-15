import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Easing,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SendBuzzerCommand } from '../commands/SendBuzzerCommand';
import { SendLedAnimationCommand } from '../commands/SendLedAnimationCommand';

const FloatingMenu = () => {
    const [isActiveBuzzerAlarm, setActiveBuzzerAlarm] = useState(false);
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [ledAnimation, setLedAnimation] = useState(0);

    const animation = useRef(new Animated.Value(0)).current;

    const navigation = useNavigation();

    const toggleMenu = () => {
        setMenuVisible((prevState) => {
            const newState = !prevState;
            Animated.timing(animation, {
                toValue: newState ? 1 : 0,
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
            return newState;
        });
    };

    const handleHome = () => {
        navigation.navigate('TechRace');
    };

    const handleBuzzer = () => {
        SendBuzzerCommand(+isActiveBuzzerAlarm);
    };

    const handleStartRace = () => {
        console.log('handleStartRace Pressed');
    };

    const handleActivateLed = () => {
        SendLedAnimationCommand(ledAnimation);
        setLedAnimation(1);
    };

    const menuTranslateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-600, 0],
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={toggleMenu}
                style={styles.floatingButton}
            >
                <Text style={styles.buttonText}>···</Text>
            </TouchableOpacity>

            <Animated.View
                style={[
                    styles.menu,
                    {
                        transform: [{ translateY: menuTranslateY }],
                        opacity: animation,
                    },
                ]}
            >
                <TouchableOpacity onPress={handleHome} style={styles.menuItem}>
                    <Image
                        source={require('../assets/images/home.png')}
                        style={[styles.icon]}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleBuzzer}
                    style={styles.menuItem}
                >
                    <Image
                        source={require('../assets/images/klaxon.png')}
                        style={[styles.icon]}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleActivateLed}
                    style={styles.menuItem}
                >
                    <Image
                        source={require('../assets/images/led.png')}
                        style={[styles.icon]}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleStartRace}
                    style={styles.menuItem}
                >
                    <Image
                        source={require('../assets/images/finish-flag.png')}
                        style={[styles.icon]}
                    />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 20,
        bottom: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '-90deg' }],
    },
    floatingButton: {
        backgroundColor: 'black',
        paddingVertical: 8,
        paddingHorizontal: 25,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    menu: {
        backgroundColor: 'black',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: 35,
        paddingBottom: 10,
        paddingHorizontal: 5,
        position: 'absolute',
        top: 30,
        width: 66,
        height: 240,
        gap: 10,
    },
    menuItem: {
        width: '50%',
        height: '60%',
        flex: 1,
        margin: '10%',
        alignSelf: 'center',
    },
    icon: {
        marginLeft: '13%',
        width: '80%',
        height: '80%',
    },
});

export default FloatingMenu;
