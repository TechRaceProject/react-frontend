import AsyncStorage from '@react-native-async-storage/async-storage';
import { getHostUrl } from '../../../shared/index';

export const patchUserVehicleState = async (
    vehicleStateId: number,
    patchData: any
): Promise<any> => {
    try {
        const token = await AsyncStorage.getItem('authToken');

        const hostUrl = getHostUrl();

        const response = await fetch(
            `http://${hostUrl}/api/vehicle-states/${vehicleStateId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(patchData),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message ||
                    "Erreur lors de la mise à jour de l'état du véhicule"
            );
        }

        return data;
    } catch (error) {
        console.error(
            'Erreur API:',
            error instanceof Error ? error.message : error
        );
        throw error;
    }
};
