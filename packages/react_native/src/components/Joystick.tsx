import React, { useState } from 'react';
import {
    ImageBackground,
    PanResponder,
    StyleSheet,
    View,
    Text,
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
    const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });

    const handlePanResponderMove = (event, gestureState) => {
        let newX = joystickPosition.x + gestureState.dx;
        let newY = joystickPosition.y + gestureState.dy;

        newX = Math.max(0, Math.min(newX, dimension.width - size / 2));
        newY = Math.max(0, Math.min(newY, dimension.height - size / 2));

        setJoystickPosition({ x: newX, y: newY });
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: handlePanResponderMove,
        onPanResponderRelease: () => {
            console.log('dimension.width', dimension.width / 2 - size / 2);
            setJoystickPosition({
                x: 0,
                y: 0,
            });
        },
    });
    console.log('joystickPosition', joystickPosition);

    return (
        <View
            style={styles.container}
            width={dimension.width}
            height={dimension.height}
            {...panResponder.panHandlers}
        >
            <ImageBackground
                style={styles.joystickArrow}
                source={require('../assets/joystick_arrow.png')}
            >
                <View style={styles.containerJoystick} />
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
            </ImageBackground>
        </View>
        // <View style={style2.container}>
        //     {/*<Text>TOTO</Text>*/}
        //     <View style={style2.container2} />
        //     <View/>
        // </View>
    );
}
//
// const style2 = StyleSheet.create({
//     container: {
//         backgroundColor: 'red',
//         width: 200,
//         height: 500,
//         flex: 1,
//     },
//     container2: {
//         backgroundColor: 'blue',
//         width: 100,
//         height: 100,
//     }
// });

export default Joystick;
