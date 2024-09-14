import { Alert } from 'react-native';
import socket from '../socket.config';
import { SendWheelSpeedCommand } from '../commands/SendWheelSpeedCommand';
import { SendLedAnimationCommand } from '../commands/SendLedAnimationCommand';
import { SendHeadRotationCommand } from '../commands/SendHeadRotationCommand';

export const emergencyStopAction = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        SendWheelSpeedCommand([0, 0, 0, 0]);
        SendLedAnimationCommand(1);
        SendHeadRotationCommand([60, 0]);
    } else {
        Alert.alert(
            'Erreur',
            'Impossible d’envoyer la commande. WebSocket déconnecté.'
        );
    }
};
