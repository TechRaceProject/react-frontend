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
        flex: 1,
    };

    return (
        <SafeAreaView style={[backgroundStyle, styles.safeArea]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <View style={styles.appContainer}>
                <Text>Toto</Text>
                <Text>Toto</Text>
                <JoyStick
                    dimension={{ width: 300, height: 300 }}
                    position={{ x: 150, y: 150 }}
                    size={100}
                    styles={{ ...styles }}
                    uri={'../assets/joystick.svg'}
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
    container: {
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 5,
    },
    containerJoystick: {
        width: '100%',
        height: '100%',
        borderColor: 'yellow',
        borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    joystick: {
        backgroundColor: 'blue',
        borderColor: 'white',
        borderWidth: 5,
        position: 'absolute',
        width: 100,
        height: 100,
    },
    joystickArrow: {
        width: '100%',
        height: '100%',
    },
});

export default App;
