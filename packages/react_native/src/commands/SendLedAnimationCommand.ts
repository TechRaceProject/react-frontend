import { CommandCar } from '../enums/CarCommandEnum';
import { createCarCommandValidator } from '../validators/CarCommandValidator';
import socket from '../socket.config';

export const SendLedAnimationCommand = (ledAnimation: number) => {
    try {
        const command = createCarCommandValidator(
            CommandCar.LedAnimation,
            ledAnimation
        );
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(command));
        }
    } catch (error) {
        console.error(error);
    }
};
