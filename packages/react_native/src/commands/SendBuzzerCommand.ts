import { CommandCar } from '../enums/CarCommandEnum';
import { createCarCommandValidator } from '../validators/CarCommandValidator';
import socket from '../socket.config';

export const SendBuzzerCommand = (buzzer: number) => {
    try {
        const command = createCarCommandValidator(
            CommandCar.BuzzerAlarm,
            buzzer
        );

        socket.send(JSON.stringify(command));
    } catch (error) {
        console.error(error);
    }
};
