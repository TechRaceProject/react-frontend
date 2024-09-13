import React from 'react';
import { TouchableOpacity, Image, StyleSheet, GestureResponderEvent } from 'react-native';

interface CustomButtonProps {
  iconSource: any; 
  onPress: (event: GestureResponderEvent) => void;
  style?: object; 
  iconStyle?: object; 
  disabled?: boolean; 
}

const CustomButton: React.FC<CustomButtonProps> = ({ iconSource, onPress, style, iconStyle, disabled = false }) => {
  return (
    <TouchableOpacity 
      style={[styles.iconButton, style, disabled && styles.disabledButton]} 
      onPress={disabled ? undefined : onPress}
      disabled={disabled} 
    >
      <Image 
        source={iconSource} 
        style={[styles.icon, iconStyle, disabled && styles.disabledIcon]} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  disabledButton: {
    opacity: 0.5, 
  },
  icon: {
    width: 23, 
    height: 23,
    resizeMode: 'contain',
  },
  disabledIcon: {
    tintColor: '#808080', 
  },
});

export default CustomButton;
