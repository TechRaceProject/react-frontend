import { Alert } from 'react-native';
import socket from '../socket.config';
import { SendAutoModeCommand } from '../commands/SendAutoModeCommand';

export const toggleModeAction = (
    isManualMode: boolean,
    setMode: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        try {
            SendAutoModeCommand(isManualMode ? 1 : 0);

            socket.onmessage = (e) => {
                if (e.data === 'ok') {
                    setMode(!isManualMode);
                }
            };
        } catch (error) {
            Alert.alert(
                'Erreur',
                'Une erreur est survenue lors du changement de mode.'
            );
        }
    } else {
        Alert.alert(
            'Erreur',
            'Impossible d’envoyer la commande. WebSocket déconnecté.'
        );
    }
};
