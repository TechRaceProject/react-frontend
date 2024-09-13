import { CommandCar } from '../enums/CarCommandEnum';
import { createCarCommandValidator } from '../validators/CarCommandValidator';
import socket from '../socket.config';

export const SendRaceModeCommand = (RaceMode: number[]) => {
    try {
        const command = createCarCommandValidator(
            CommandCar.RaceMode,
            RaceMode
        );

        socket.send(JSON.stringify(command));
    } catch (error) {
        console.error(error);
    }
};
