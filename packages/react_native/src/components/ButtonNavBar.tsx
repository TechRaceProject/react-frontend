import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

interface ButtonNavBarProps {
    iconSource: any;
    isActive: boolean;
    onPress: () => void;
    iconStyle?: object;
}

const ButtonNavBar: React.FC<ButtonNavBarProps> = ({
    iconSource,
    isActive,
    onPress,
    iconStyle,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.iconButton,
                isActive ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={onPress}
        >
            <Image
                source={iconSource}
                style={[
                    iconStyle,
                    { tintColor: isActive ? '#ffffff' : '#ffffff' },
                ]}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconButton: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    activeButton: {
        backgroundColor: '#3730A3',
    },
    inactiveButton: {
        backgroundColor: '#121216',
    },
});

export default ButtonNavBar;
