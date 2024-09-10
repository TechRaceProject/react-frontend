import { CommandCar } from '../enums/CarCommandEnum';
import { createCarCommandValidator } from '../validators/CarCommandValidator';
import socket from '../socket.config';

export const SendHornCommand = (horn: number) => {
    try {
        const command = createCarCommandValidator(
            CommandCar.BuzzerAlarm,
            horn
        );

        console.log('Sending Alarm data:', command);
        socket.send(JSON.stringify(command));
    } catch (error) {
        console.error(error);
    }
};
