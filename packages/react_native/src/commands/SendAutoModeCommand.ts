import { CommandCar } from '../enums/CarCommandEnum';
import { createCarCommandValidator } from '../validators/CarCommandValidator';
import socket from '../socket.config';

export const SendAutoModeCommand = (CarAutoMode: number) => {
    try {
        const command = createCarCommandValidator(CommandCar.AutoMode, CarAutoMode);

        // console.log('Sending WheelSpeed data:', command);
        // console.log('!!!!!!!!!!!!!!', socket.ping());
        console.log('Sending AutoMode data:', command);
        socket.send(JSON.stringify(command));
    } catch (error) {
        // console.error(error.message);
    }
};
