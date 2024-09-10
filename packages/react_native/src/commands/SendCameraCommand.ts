import { CommandCar } from '../enums/CarCommandEnum';
import { createCarCommandValidator } from '../validators/CarCommandValidator';
import socket from '../socket.config';

export const SendCameraCommand = (cameraActivate: number, setCameraInitialized: any) => {
  try {
    const command = createCarCommandValidator(
      CommandCar.VideoCaptor,
      cameraActivate || 0
    );

    console.log('Preparing to send CameraActivate data:', command);

    if (socket.readyState === WebSocket.OPEN) {
      // Si le WebSocket est déjà ouvert, envoyer la commande immédiatement
      console.log('Command sent immediately as WebSocket is already open.');
      socket.send(JSON.stringify(command));
      setCameraInitialized(true);
    }
  } catch (error) {
    console.log('Error in SendCameraCommand:', error.message);
  }
};
