import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import CarControlScreen from './src/screens/CarControlScreen';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <CarControlScreen/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});

export default App;
