import { Alert } from "react-native";
import { SendWheelSpeedCommand } from "../commands/SendWheelSpeedCommand";
import { SendHeadRotationCommand } from "../commands/SendHeadRotationCommand";
import { SendLedAnimationCommand } from "../commands/SendLedAnimationCommand";
let headIntervalId: NodeJS.Timeout | null = null; 
let wheelIntervalId: NodeJS.Timeout | null = null; 

export const wtfButtonAction = (ws: WebSocket) => {
  if (ws && ws.readyState === WebSocket.OPEN) {

    let speedValues=[4000, 4000, -4000, -4000]
    SendWheelSpeedCommand(speedValues)

    SendLedAnimationCommand(5)

    let headPosition = 60; 
    SendHeadRotationCommand([headPosition, 0]); 

    if (headIntervalId) {
      clearInterval(headIntervalId);
    }

    headIntervalId = setInterval(() => {
      headPosition = headPosition === 20 ? 80 : 20; 
      SendHeadRotationCommand([headPosition, 0]);
    }, 2000);

    if (wheelIntervalId) {
      clearInterval(wheelIntervalId);
    }

    wheelIntervalId = setInterval(() => {
      speedValues = speedValues.map(speed => -speed);
      SendWheelSpeedCommand([4000, 4000, -4000, -4000]) 
      console.log('Vitesses inversées:', speedValues);
    }, 5000);
  } else {
    console.error("Le WebSocket n'est pas ouvert. Impossible d'envoyer la commande.");
    Alert.alert('Erreur', 'Impossible d’envoyer la commande. WebSocket déconnecté.');
  }
};


export const stopWtfAnimations = () => {
  if (headIntervalId) {
    clearInterval(headIntervalId);
    headIntervalId = null;
    console.log("Animation de la tête arrêtée.");
  }


  if (wheelIntervalId) {
    clearInterval(wheelIntervalId);
    wheelIntervalId = null;
    console.log("Inversion des roues arrêtée.");
  }
};
