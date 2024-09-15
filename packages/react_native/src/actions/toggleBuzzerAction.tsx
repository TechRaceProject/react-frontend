import { Alert } from 'react-native';
import socket from '../socket.config';
import { SendBuzzerCommand } from '../commands/SendBuzzerCommand';
import { patchUserVehicleState } from './patchUserVehicleStateAction';

export const toggleBuzzerAction = async (
    isBuzzOn: boolean,
    setBuzzerActive: React.Dispatch<React.SetStateAction<boolean>>,
    vehicleStateId: number,
    vehicleState: any
) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        try {
            SendBuzzerCommand(isBuzzOn ? 0 : 1);

            socket.onmessage = async (e) => {
                if (e.data === 'ok') {
                    setBuzzerActive(!isBuzzOn);

                    try {
                        const updatedVehicleState = {
                            ...vehicleState,
                            buzzer_alarm: isBuzzOn ? 0 : 1,
                        };
                        await patchUserVehicleState(
                            vehicleStateId,
                            updatedVehicleState
                        );
                    } catch (apiError) {
                        Alert.alert(
                            'Erreur',
                            "Erreur lors de la mise à jour de l'état du véhicule."
                        );
                    }
                }
            };
        } catch (error) {
            Alert.alert(
                'Erreur',
                "Une erreur est survenue lors de l'envoi de la commande."
            );
        }
    } else {
        Alert.alert(
            'Erreur',
            'Impossible d’envoyer la commande. WebSocket déconnecté.'
        );
    }
};