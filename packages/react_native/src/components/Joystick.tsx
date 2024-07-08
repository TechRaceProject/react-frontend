import React, { useState } from 'react';
import {
    ImageBackground,
    PanResponder,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

interface JoystickProps {
    dimension: { width: number; height: number };
    position: { x: number; y: number };
    size: number;
    styles: {
        container: ViewStyle;
        containerJoystick: ViewStyle;
        joystick: ViewStyle;
        joystickArrow: ViewStyle;
    };
    uri: string;
}

function Joystick({ dimension, position, size, styles, uri }: JoystickProps) {
    const [joystickPosition, setJoystickPosition] = useState({ x: (300 - size) / 2, y: (300 - size) / 2 });

    const handlePanResponderMove = (event, gestureState) => {
        let newX = joystickPosition.x + gestureState.dx;
        let newY = joystickPosition.y + gestureState.dy;

        newX = Math.max(0, Math.min(newX, 300 - size));
        newY = Math.max(0, Math.min(newY, 300 - size));

        setJoystickPosition({ x: newX, y: newY });
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: handlePanResponderMove,
        onPanResponderRelease: () => {
            setJoystickPosition({
                x: (300 - size) / 2,
                y: (300 - size) / 2,
            });
        },
    });

    return (
        <View
            style={[styles.container, { backgroundColor: 'black', width: dimension.width, height: dimension.height }]}
            {...panResponder.panHandlers}
        >
            <View style={[styles.containerJoystick, { width: 300, height: 300 }]}>
                <View
                    style={[
                        styles.joystick,
                        {
                            left: joystickPosition.x,
                            top: joystickPosition.y,
                            height: size,
                            width: size,
                        },
                    ]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerJoystick: {
        position: 'relative',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    joystick: {
        position: 'absolute',
        backgroundColor: 'blue',
    },
    joystickArrow: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Joystick;
