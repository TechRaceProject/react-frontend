import { CommandCar } from '../enums/CarCommandEnum';
import { createCarCommandValidator } from '../validators/CarCommandValidator';
import socket from '../socket.config';

export const SendCameraCommand = (
    cameraActivate: number,
    setCameraInitialized: (initialized: boolean) => void
) => {
    try {
        const command = createCarCommandValidator(
            CommandCar.VideoCaptor,
            cameraActivate || 0
        );

        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(command));
            setCameraInitialized(true);
        }
    } catch (error) {
        console.log('Error in SendCameraCommand:', error.message);
    }
};
