import { CommandCar } from '../enums/CarCommandEnum';
import { createCarCommandValidator } from '../validators/CarCommandValidator';
import socket from '../socket.config';

export const SendVehiculeModeCommand = (mode: number) => {
    try {
        const command = createCarCommandValidator(
            CommandCar.VehiculeMode,
            mode
        );

        socket.send(JSON.stringify(command));
    } catch (error) {
        console.error(error);
    }
};
