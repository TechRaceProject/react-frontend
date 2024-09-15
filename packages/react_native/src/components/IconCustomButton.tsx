import React from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    Text,
    View,
    GestureResponderEvent,
} from 'react-native';

interface IconCustomButtonProps {
    labelTop: string;
    labelBottom: string;
    iconSource: any;
    onPress: (event: GestureResponderEvent) => void;
    style?: object;
    textStyle?: object;
}

const IconCustomButton: React.FC<IconCustomButtonProps> = ({
    labelTop,
    labelBottom,
    iconSource,
    onPress,
    style,
    textStyle,
}) => {
    return (
        <View style={styles.buttonContainer}>
            <View style={styles.labelContainer}>
                <Text style={[styles.buttonLabel, textStyle]}>{labelTop}</Text>
                <Text style={[styles.buttonLabel, textStyle]}>
                    {labelBottom}
                </Text>
            </View>
            <TouchableOpacity
                style={[styles.iconButton, style]}
                onPress={onPress}
            >
                <Image source={iconSource} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    labelContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 8,
    },
    buttonLabel: {
        color: '#fff',
        textAlign: 'center',
    },
    iconButton: {
        width: 51,
        height: 51,
        backgroundColor: '#121216',
        borderColor: '#3730A3',
        borderWidth: 4,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 23,
        height: 23,
        resizeMode: 'contain',
    },
});

export default IconCustomButton;
