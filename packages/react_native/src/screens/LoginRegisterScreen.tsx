import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ApiAuth from '../../../shared/src/api/auth/authentication.api';
import { apiUrl } from '../config/apiUrl';

interface LoginErrors {
    username?: string;
    password: string;
    email: string;
}

const LoginRegisterScreen = ({ navigation }) => {
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<object>({});

    const loginRegisterButtonText = isLoginPage ? 'LOGIN' : 'REGISTER';

    const signUpSignInText = isLoginPage
        ? "Vous n'avez pas de compte ? "
        : 'Vous avez un compte ? ';

    const signUpSignInLink = isLoginPage
        ? 'Enregistrez-vous ici'
        : 'Identifier vous ici';

    const toggleLoginRegister = () => {
        setIsLoginPage((prevState) => !prevState);
    };

    const validateForm = () => {
        const errors: LoginErrors = {
            password: '',
            email: '',
        };

        if (!username && !isLoginPage) {
            errors.username = "Le nom d'utilisateur est requis.";
        }

        if (!email) {
            errors.email = "L'email est requis.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "L'email est incorrect.";
        }

        if (!password) {
            errors.password = 'Le mot de passe est requis.';
        } else if (password.length < 6) {
            errors.password =
                'Le mot de passe doit contenir au minimun 6 lettres.';
        }

        setErrors(errors);
        return Object.values(errors).every((value) => value === '');
    };

    const handleSubmit = async () => {
        const isFormValid = validateForm();

        if (isFormValid) {
            const { data, error, isLoading } = await ApiAuth[
                isLoginPage ? 'login' : 'register'
            ](
                apiUrl,
                isLoginPage
                    ? { email, password }
                    : { email, password, username }
            );

            if (!error) {
                await AsyncStorage.setItem('authToken', data.token);
                await AsyncStorage.setItem('user:id', data.user.id.toString());
                navigation.navigate('TechRace');
            } else {
                console.error('error !!', error);
                setErrors({ error });
            }
        }
    };

    return (
        <>
            <Video
                source={require('../assets/images/video.mp4')}
                style={styles.video}
                paused={false}
                repeat={true}
                resizeMode={'cover'}
                muted={true}
            />

            <View style={styles.container}>
                <Text style={styles.title}>TechRace</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#B0B0B0"
                        onChangeText={(newValue) => setEmail(newValue)}
                    />

                    {!isLoginPage && (
                        <TextInput
                            style={styles.input}
                            placeholder="Nom d'utilisateur"
                            placeholderTextColor="#B0B0B0"
                            onChangeText={(newValue) => setUsername(newValue)}
                        />
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        placeholderTextColor="#B0B0B0"
                        secureTextEntry
                        onChangeText={(newValue) => setPassword(newValue)}
                    />

                    <TouchableOpacity
                        onPress={() => handleSubmit()}
                        style={styles.loginRegisterButton}
                    >
                        <Text style={styles.loginRegisterButtonText}>
                            {loginRegisterButtonText}
                        </Text>
                    </TouchableOpacity>

                    {Object.values(errors).map((error, index) => (
                        <Text key={index} style={styles.error}>
                            {error}
                        </Text>
                    ))}
                </View>

                <View style={styles.signUpSignInContainer}>
                    <Text style={styles.signUpSignInText}>
                        {signUpSignInText}
                    </Text>
                    <TouchableOpacity onPress={() => toggleLoginRegister()}>
                        <Text
                            onPress={() => toggleLoginRegister()}
                            style={styles.signUpSignInLink}
                        >
                            {signUpSignInLink}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
    },
    title: {
        fontSize: 36,
        color: 'white',
        marginBottom: 30,
        fontFamily: 'Orbitron-Black',
        marginTop: '-15%',
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 50,
        backgroundColor: '#333',
        borderRadius: 8,
        color: '#FFF',
        marginBottom: 20,
        paddingLeft: 20,
    },
    recoverText: {
        color: '#4CAF50',
    },
    loginRegisterButton: {
        width: '80%',
        height: 50,
        backgroundColor: '#3730A3',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 100,
    },
    loginRegisterButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '100',
        fontFamily: 'Orbitron-Black',
    },
    signUpSignInContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
    },
    signUpSignInText: {
        color: '#FFF',
        fontFamily: 'Orbitron-Medium',
    },
    signUpSignInLink: {
        color: 'white',
        fontFamily: 'Orbitron-Medium',
        textDecorationLine: 'underline',
        textDecorationColor: 'red',
    },
    video: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.7,
        backgroundColor: 'rgb(0,0,0)',
    },
    error: {
        color: 'red',
        fontSize: 20,
        marginBottom: 12,
    },
});

export default LoginRegisterScreen;
