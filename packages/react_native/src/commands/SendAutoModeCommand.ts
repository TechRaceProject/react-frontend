import { CommandCar } from '../enums/CarCommandEnum';
import { createCarCommandValidator } from '../validators/CarCommandValidator';
import socket from '../socket.config';

export const SendAutoModeCommand = (CarAutoMode: number) => {
    try {
        const command = createCarCommandValidator(
            CommandCar.AutoMode,
            CarAutoMode
        );
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(command));
        }
    } catch (error) {
        console.error(error);
    }
};
