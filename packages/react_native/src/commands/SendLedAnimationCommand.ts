import { CommandCar } from '../enums/CarCommandEnum';
import { createCarCommandValidator } from '../validators/CarCommandValidator';
import socket from '../socket.config';

export const SendLedAnimationCommand = (ledAnimation) => {
    try {
        const command = createCarCommandValidator(
            CommandCar.LedAnimation,
            parseInt(ledAnimation, 10) || 0
        );

        socket.send(JSON.stringify(command));
    } catch (error) {
        console.error(error.message);
    }
};
