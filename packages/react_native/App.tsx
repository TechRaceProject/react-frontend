import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import Joystick from './src/components/Joystick';

function App(): React.JSX.Element {
    const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
    console.log('joystickPosition', joystickPosition);
    return (
        <SafeAreaView style={[styles.safeArea]}>
            <View style={styles.appContainer}>
                <Joystick
                    dimension={{ width: 300, height: 300 }}
                    size={100}
                    styles={{ ...styles }}
                    state={{ joystickPosition, setJoystickPosition }}
                    uriJoystick={require('./src/assets/joystick.png')}
                    uriJoystickArrow={require('./src/assets/joystick_arrow.png')}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    appContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerJoystick: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    joystick: {
        position: 'absolute',
    },
});

export default App;
