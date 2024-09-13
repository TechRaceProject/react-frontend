import { CommandCar } from '../enums/CarCommandEnum';
import { createCarCommandValidator } from '../validators/CarCommandValidator';
import socket from '../socket.config';

export const SendHeadRotationCommand = (HeadRotation: number[]) => {
    try {
        const command = createCarCommandValidator(
            CommandCar.HeadRotation,
            HeadRotation
        );

        socket.send(JSON.stringify(command));
    } catch (error) {
        console.error(error);
    }
};
