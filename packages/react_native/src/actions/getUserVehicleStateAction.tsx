import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getHostUrl } from '../../../shared/index';

export const getUserVehicleState = async () => {
    try {
        const userId = await AsyncStorage.getItem('user:id');
        const token = await AsyncStorage.getItem('authToken');

        const hostUrl = getHostUrl();

        const response = await fetch(
            `http://${hostUrl}/api/users/${userId}/vehicle-states`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();
        if (response.ok) {
            return data.data;
        } else {
            Alert.alert(
                'Erreur',
                'Impossible de récupérer les états du véhicule.'
            );
            return null;
        }
    } catch (error) {
        Alert.alert(
            'Erreur',
            'Une erreur est survenue lors de la récupération des états du véhicule.'
        );
        return null;
    }
};
