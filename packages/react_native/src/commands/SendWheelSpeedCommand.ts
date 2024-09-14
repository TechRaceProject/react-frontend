import { CommandCar } from '../enums/CarCommandEnum';
import { createCarCommandValidator } from '../validators/CarCommandValidator';
import socket from '../socket.config';

export const SendWheelSpeedCommand = (CarWheels: number[]) => {
    try {
        const command = createCarCommandValidator(CommandCar.WheelSpeed, [
            ...CarWheels,
        ]);

        if (JSON.stringify(command.data) == JSON.stringify([0, 0, 0, 0])) {
            command.data = [0];
        }

        socket.send(JSON.stringify(command));
    } catch (error) {
        console.error(error);
    }
};
