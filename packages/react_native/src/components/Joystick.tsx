import React from 'react';
import {
    GestureResponderEvent,
    Image,
    ImageBackground,
    PanResponder,
    View,
    ViewStyle,
} from 'react-native';

interface JoystickProps {
    dimension: { width: number; height: number };
    size: number;
    state: {
        joystickPosition: {
            x: number;
            y: number;
        };
        setJoystickPosition: (position: { x: number; y: number }) => void;
    };
    styles: {
        containerGlobalJoystick: ViewStyle;
        containerJoystick: ViewStyle;
        joystick: ViewStyle;
    };
    uriJoystick: string;
    uriJoystickArrow: string;
}

function Joystick({
    dimension,
    size,
    styles,
    state: { joystickPosition, setJoystickPosition },
    uriJoystick,
    uriJoystickArrow,
}: JoystickProps): React.JSX.Element {
    const handlePanResponderMove = (
        event: GestureResponderEvent,
        gestureState: { dx: number; dy: number }
    ): void => {
        let newX = joystickPosition.x + gestureState.dx;
        let newY = joystickPosition.y - gestureState.dy;

        const maxMoveX = dimension.width / 2;
        const maxMoveY = dimension.height / 2;

        newX = Math.max(-maxMoveX, Math.min(newX, maxMoveX));
        newY = Math.max(-maxMoveY, Math.min(newY, maxMoveY));

        setJoystickPosition({ x: newX, y: newY });
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: handlePanResponderMove,
        onPanResponderRelease: () => {
            setJoystickPosition({ x: 0, y: 0 });
        },
    });

    return (
        <View
            style={[
                styles.containerGlobalJoystick,
                { width: dimension.width, height: dimension.height },
            ]}
            {...panResponder.panHandlers}
        >
            <ImageBackground source={uriJoystickArrow}>
                <View
                    style={[
                        styles.containerJoystick,
                        {
                            width: dimension.width,
                            height: dimension.height,
                        },
                    ]}
                >
                    <Image
                        source={uriJoystick}
                        style={[
                            styles.joystick,
                            {
                                left:
                                    joystickPosition.x +
                                    dimension.width / 2 -
                                    size / 2,
                                top:
                                    dimension.height / 2 -
                                    joystickPosition.y -
                                    size / 2,
                                height: size,
                                width: size,
                            },
                        ]}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

export default Joystick;
