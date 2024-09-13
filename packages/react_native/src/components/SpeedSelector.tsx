import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const SpeedSelector = ({ onSpeedChange }: any) => {
  const [selectedSpeed, setSelectedSpeed] = useState(1);

  const handleSpeedChange = (speed: number) => {
    setSelectedSpeed(speed);
    onSpeedChange(speed); 
  };

  return (
    <View style={styles.speedSelectorContainer}>
      <Text style={styles.speedLabel}>VITESSE:</Text>
      <View style={styles.speedOptions}>
        {[1, 2, 3].map((speed) => (
          <TouchableOpacity key={speed} onPress={() => handleSpeedChange(speed)}>
            <View style={[
                styles.speedOption, 
                selectedSpeed === speed && styles.selectedOption
              ]}>
              <Text style={[
                  styles.speedText, 
                  selectedSpeed === speed && styles.selectedText
                ]}>
                {speed}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  speedSelectorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  speedLabel: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Orbitron-Black',
    marginBottom: 5,
  },
  speedOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  speedOption: {
    width: 30, 
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  selectedOption: {
    borderRadius: 15,
    backgroundColor: '#121216',
    borderWidth: 2,
    borderColor: '#3730A3',
  },
  speedText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Orbitron-Medium',
  },
  selectedText: {
    color: 'white', 
  },
});

export default SpeedSelector;
