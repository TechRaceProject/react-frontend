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
        container: ViewStyle;
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
        let newY = joystickPosition.y + gestureState.dy;

        const maxMoveX = dimension.width - size / 2;
        const maxMoveY = dimension.height - size / 2;

        newX = Math.max(-size / 2, Math.min(newX, maxMoveX));
        newY = Math.max(-size / 2, Math.min(newY, maxMoveY));

        setJoystickPosition({ x: newX, y: newY });
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: handlePanResponderMove,
        onPanResponderRelease: () => {
            setJoystickPosition({
                x: (dimension.width - size) / 2,
                y: (dimension.height - size) / 2,
            });
        },
    });

    return (
        <View
            style={[
                styles.container,
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
                                left: joystickPosition.x,
                                top: joystickPosition.y,
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
