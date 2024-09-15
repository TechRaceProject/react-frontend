import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';

interface ToggleButtonProps {
    isLandscape: boolean;
    onPress: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
    isLandscape,
    onPress,
}) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const [animatedValue] = useState(new Animated.Value(1));

    const toggleSwitch = () => {
        const newValue = !isEnabled;
        setIsEnabled(newValue);
        Animated.timing(animatedValue, {
            toValue: newValue ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();

        onPress();
    };

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 26],
    });

    return (
        <View style={[styles.container, isLandscape && styles.rotateButton]}>
            <TouchableOpacity onPress={toggleSwitch} activeOpacity={1}>
                <View style={[styles.track, isEnabled && styles.trackEnabled]}>
                    <Animated.View
                        style={[
                            styles.thumb,
                            isEnabled && styles.trackEnabledThumb,
                            {
                                transform: [{ translateX }],
                            },
                        ]}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    track: {
        width: 56,
        height: 28,
        borderRadius: 40,
        backgroundColor: '#3730A3',
        paddingVertical: 2,
        paddingHorizontal: 2,
    },
    trackEnabled: {
        backgroundColor: '#3730A3',
    },
    thumb: {
        width: 23,
        height: 23,
        borderRadius: 13,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        top: 2.5,
        marginLeft: 3,
    },
    rotateButton: {
        transform: [{ rotate: '-90deg' }],
    },
    trackEnabledThumb: {
        marginLeft: 3,
    },
});

export default ToggleButton;
