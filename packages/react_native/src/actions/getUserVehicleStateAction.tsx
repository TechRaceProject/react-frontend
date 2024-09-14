import { Alert } from 'react-native';

export const getUserVehicleState = async (userId: number) => {
    try {
        // @TODO : fix Url
        const response = await fetch(
            `http://10.0.2.2:8000/api/users/1/vehicle-states`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJleHAiOjE3MjYyODA0NjJ9.n_XYVw6MCDvFwysy7JtvBWU7ShHYp_nX92vSzYMRCNQ`,
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
