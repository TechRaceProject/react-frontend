/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import JoyStick from './src/components/Joystick.tsx';

type SectionProps = PropsWithChildren<{
    title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return <View style={styles.sectionContainer}></View>;
}

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <Text>Toto</Text>
            <Text>Toto</Text>
            <JoyStick
                dimension={{ width: 300, height: 300 }}
                position={{ x: 150, y: 150 }}
                size={100}
                styles={{ ...styles }}
                uri={'../assets/joystick.svg'}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    dimension: { width: 100, height: 100 },
    container: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        // display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        borderColor: 'red',
        position: 'relative',
        borderWidth: 5,
    },
    containerJoystick: {
        // position:'absolute',
        // top: '50%',
        // left: '50%',
        // transform: [{ translateX: -80 }, { translateY: -80 }],
        width: '50%',
        height: '50%',
        borderColor: 'yellow',
        borderWidth: 5,
    },
    joystick: {
        backgroundColor: 'blue',
        borderColor: 'white',
        borderWidth: 5,
        // borderRadius: 50,
        position: 'absolute',
    },
    joystickArrow: {
        width: '100%',
        height: '100%',
        // width: '100%',
        // height: '100%',
        // resizeMode: 'contain',
    },
});

export default App;
