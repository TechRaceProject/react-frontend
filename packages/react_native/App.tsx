import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import JoystickComponent from './components/JoystickComponent'; // Assurez-vous que le chemin est correct

const App = () => {
    const [roue1, setRoue1] = useState('');
    const [roue2, setRoue2] = useState('');
    const [roue3, setRoue3] = useState('');
    const [roue4, setRoue4] = useState('');
    const [submittedValues, setSubmittedValues] = useState('');

    const handleSubmit = () => {
        const values = `Roue 1: ${roue1}, Roue 2: ${roue2}, Roue 3: ${roue3}, Roue 4: ${roue4}`;
        setSubmittedValues(values);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <StatusBar />
                <View style={styles.container}>
                    <Text style={styles.title}>Contrôle de Puissance des Roues</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Puissance Roue 1"
                        keyboardType="numeric"
                        value={roue1}
                        onChangeText={setRoue1}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Puissance Roue 2"
                        keyboardType="numeric"
                        value={roue2}
                        onChangeText={setRoue2}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Puissance Roue 3"
                        keyboardType="numeric"
                        value={roue3}
                        onChangeText={setRoue3}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Puissance Roue 4"
                        keyboardType="numeric"
                        value={roue4}
                        onChangeText={setRoue4}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    {submittedValues ? (
                        <Text style={styles.submittedValues}>{submittedValues}</Text>
                    ) : null}

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        width: '100%',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    submittedValues: {
        marginTop: 20,
        fontSize: 18,
        color: 'green',
    },
});

export default App;
