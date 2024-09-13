import { Alert } from 'react-native';
import socket from '../socket.config';  
import { SendVehiculeModeCommand } from '../commands/SendVehiculeModeCommand';

export const toggleModeAction = (
  isManualMode: boolean,
  setMode: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    try {

      SendVehiculeModeCommand (isManualMode ? 1 : 0,)

      socket.onmessage = (e) => {
        if (e.data === 'ok') {
          setMode(!isManualMode); 
        } else {
          console.log('Réponse inattendue du serveur:', e.data);
        }
      };
    } catch (error) {
      console.error('Erreur dans toggleModeAction:', error);
    }
  } else {
    console.error("Le WebSocket n'est pas ouvert. Impossible d'envoyer la commande de mode.");
    Alert.alert('Erreur', 'Impossible d’envoyer la commande. WebSocket déconnecté.');
  }
};
