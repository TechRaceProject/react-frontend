import { CommandCar } from '../enums/CarCommandEnum';

export interface CarCommand {
    cmd: CommandCar;
    data: number | number[];
}

export function createCarCommandValidator(
    command: CommandCar,
    data: number | number[]
): CarCommand {
    switch (command) {
        case CommandCar.WheelSpeed:
            if (Array.isArray(data) && data.length === 4) {
                return { cmd: command, data: data };
            } else {
                throw new Error(
                    'Invalid data for WheelSpeed. Expected an array of 4 numbers.'
                );
            }
        case CommandCar.VehiculeFace:
            if (typeof data === 'number') {
                return { cmd: command, data: data };
            } else {
                throw new Error(
                    'Invalid data for VehiculeFace. Expected a single number.'
                );
            }
        case CommandCar.HeadRotation:
            if (Array.isArray(data) && data.length === 2) {
                return { cmd: command, data: data };
            } else {
                throw new Error(
                    'Invalid data for HeadRotation. Expected an array of 2 numbers.'
                );
            }
        case CommandCar.LedAnimation:
            if (typeof data === 'number') {
                return { cmd: command, data: data };
            } else {
                throw new Error(
                    'Invalid data for LedAnimation. Expected a single number.'
                );
            }
        case CommandCar.LedPrincipalColor:
        case CommandCar.LedSecondaryColor:
            if (Array.isArray(data) && data.length === 4) {
                return { cmd: command, data: data };
            } else {
                throw new Error(
                    'Invalid data for LedPrincipalColor or LedSecondaryColor. Expected an array of 4 numbers.'
                );
            }
        case CommandCar.BuzzerAlarm:
            if (typeof data === 'number') {
                return { cmd: command, data: data };
            } else {
                throw new Error(
                    'Invalid data for BuzzerAlarm. Expected a single number.'
                );
            }
        case CommandCar.BuzzerAlarmFrequency:
            if (Array.isArray(data) && data.length === 2) {
                return { cmd: command, data: data };
            } else {
                throw new Error(
                    'Invalid data for BuzzerAlarmFrequency. Expected an array of 2 numbers.'
                );
            }
        case CommandCar.VideoCaptor:
            if (typeof data === 'number') {
                return { cmd: command, data: data };
            } else {
                throw new Error(
                    'Invalid data for VideoCaptor. Expected a single number.'
                );
            }
        case CommandCar.VehiculeMode:
            if (typeof data === 'number') {
                return { cmd: command, data: data };
            } else {
                throw new Error(
                    'Invalid data for VehiculeMode. Expected a single number.'
                );
            }
        case CommandCar.RaceMode:
            if (Array.isArray(data) && data.length === 2) {
                return { cmd: command, data: data };
            } else {
                throw new Error(
                    'Invalid data for RaceMode. Expected an array of 2 numbers.'
                );
            }
        default:
            throw new Error('Unknown command.');
    }
}
