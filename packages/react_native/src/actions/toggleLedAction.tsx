import { Alert } from 'react-native';
import socket from '../socket.config';  
import { SendLedAnimationCommand } from '../commands/SendLedAnimationCommand';
export const toggleLedAction = (
  isLedOn: boolean,
  setLedActive: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    try {
      SendLedAnimationCommand(isLedOn ? 0 : 1);

      socket.onmessage = (e) => {
        if (e.data === 'ok') {
          setLedActive(!isLedOn);  
        } else {
          console.log('Réponse inattendue du serveur:', e.data);
        }
      };
    } catch (error) {
      console.error('Erreur dans toggleLedAction:', error);
    }
  } else {
    console.error("Le WebSocket n'est pas ouvert. Impossible d'envoyer la commande LED.");
    Alert.alert('Erreur', 'Impossible d’envoyer la commande. WebSocket déconnecté.');
  }
};
