import { CommandCar } from '../enums/CarCommandEnum';
import { createCarCommandValidator } from '../validators/CarCommandValidator';
import socket from '../socket.config';

export const SendPrimaryLedColorCommand = (PrimaryLedColor: number[]) => {
    try {
        const command = createCarCommandValidator(
            CommandCar.LedPrincipalColor,
            PrimaryLedColor
        );

        socket.send(JSON.stringify(command));
    } catch (error) {
        console.error(error);
    }
};
