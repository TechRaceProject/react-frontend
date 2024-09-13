import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonNavBar from './ButtonNavBar';  

const BottomNavigationBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('joystick');

  return (
    <View>
      <View style={styles.topBorder} />
      <View style={styles.container}>
        <ButtonNavBar
          iconSource={require('../assets/images/Joystick.png')}
          isActive={activeTab === 'joystick'}
          onPress={() => setActiveTab('joystick')}
          iconStyle={{ width: 32, height: 32 }} 
        />


        <ButtonNavBar
          iconSource={require('../assets/images/Profil.png')}
          isActive={activeTab === 'profil'}
          onPress={() => setActiveTab('profil')}
          iconStyle={{ width: 28, height: 28 }} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#121216',
    paddingVertical: 12,
  },
  topBorder: {
    height: 2,
    backgroundColor: '#929798',
    opacity: 0.28,
  },
});

export default BottomNavigationBar;
