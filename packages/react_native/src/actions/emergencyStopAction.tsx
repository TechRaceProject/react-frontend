import { Alert } from 'react-native';
import socket from '../socket.config';  
import { SendWheelSpeedCommand } from '../commands/SendWheelSpeedCommand';
import { SendLedAnimationCommand } from '../commands/SendLedAnimationCommand';
import { SendHeadRotationCommand } from '../commands/SendHeadRotationCommand';

export const emergencyStopAction = () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
      SendWheelSpeedCommand([0,0,0,0])
      SendLedAnimationCommand(1);
      SendHeadRotationCommand([60,0])

    console.log("Toutes les actions d'arrêt d'urgence ont été envoyées.");
  } else {
    console.error("Le WebSocket n'est pas ouvert. Impossible d'envoyer la commande d'arrêt d'urgence.");
    Alert.alert('Erreur', 'Impossible d’envoyer la commande. WebSocket déconnecté.');
  }
};
