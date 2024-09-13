import { Alert } from 'react-native';
import socket from '../socket.config';  
import { SendBuzzerCommand } from '../commands/SendBuzzerCommand';
export const toggleBuzzerAction = (
  isBuzzOn: boolean,
  setBuzzerActive: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
 

    if (socket.readyState === WebSocket.OPEN) {
      SendBuzzerCommand(isBuzzOn ? 0 : 1);

      socket.onmessage = (e) => {
        if (e.data === 'ok') {
          setBuzzerActive(!isBuzzOn);  
        } else {
          console.log('Réponse inattendue du serveur:', e.data);
        }
      };
    } else {
      console.error('WebSocket n\'est pas ouvert. État actuel:', socket.readyState);
      Alert.alert('Erreur', 'Impossible de communiquer avec le serveur. WebSocket déconnecté.');
    }
  } catch (error) {
    console.error('Erreur dans toggleBuzzerAction:', error);
  }
};
