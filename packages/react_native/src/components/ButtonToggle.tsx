import React, { useState, FC } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';

interface ButtonToggleProps {
  state: {
    isEnabledButton: boolean;
    setIsEnabledButton: (value: boolean) => void;
  };
}

const ButtonToggle: FC<ButtonToggleProps> = ({ state }) => {
  const { isEnabledButton, setIsEnabledButton } = state;
  const [animatedValue] = useState(new Animated.Value(0));

  const toggleSwitch = () => {
    const newValue = !isEnabledButton;
    setIsEnabledButton(newValue);
    Animated.timing(animatedValue, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 24],
  });

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={toggleSwitch} activeOpacity={1}>
        <View style={[styles.track, isEnabledButton && styles.trackEnabled]}>
          <Animated.View
            style={[
              styles.thumb,
              isEnabledButton && styles.trackEnabledThumb,
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
  container: {
  },
  track: {
    width: 56,
    height: 28,
    borderRadius: 40,
    backgroundColor: '#767577',
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  trackEnabled: {
    backgroundColor: '#000',
  },
  thumb: {
    width: 23,
    height: 23,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 2.5,
  },
  trackEnabledThumb: {
    marginLeft: 4.5,
  }
});

export default ButtonToggle;
