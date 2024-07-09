export enum CommandCar {
    WheelSpeed = 1,
    VehiculeFace = 2,
    HeadRotation = 3,
    LedAnimation = 4,
    LedPrincipalColor = 5,
    LedSecondaryColor = 6,
    BuzzerAlarm = 7,
    BuzzerAlarmFrequency = 8,
    VideoCaptor = 9
}

export interface CarCommand {
    cmd: CommandCar;
    data: number | number[];
}

export function createCarCommand(command: CommandCar, data: number | number[]): CarCommand {
    switch (command) {
        case CommandCar.WheelSpeed:
            if (Array.isArray(data) && data.length === 4) {
                return { cmd: command, data: data };
            } else {
                throw new Error("Invalid data for WheelSpeed. Expected an array of 4 numbers.");
            }
        case CommandCar.VehiculeFace:
            if (typeof data === "number") {
                return { cmd: command, data: data };
            } else {
                throw new Error("Invalid data for VehiculeFace. Expected a single number.");
            }
        case CommandCar.HeadRotation:
            if (Array.isArray(data) && data.length === 2) {
                return { cmd: command, data: data };
            } else {
                throw new Error("Invalid data for HeadRotation. Expected an array of 2 numbers.");
            }
        case CommandCar.LedAnimation:
            if (typeof data === "number") {
                return { cmd: command, data: data };
            } else {
                throw new Error("Invalid data for LedAnimation. Expected a single number.");
            }
        case CommandCar.LedPrincipalColor:
        case CommandCar.LedSecondaryColor:
            if (Array.isArray(data) && data.length === 4) {
                return { cmd: command, data: data };
            } else {
                throw new Error("Invalid data for LedPrincipalColor or LedSecondaryColor. Expected an array of 4 numbers.");
            }
        case CommandCar.BuzzerAlarm:
            if (typeof data === "number") {
                return { cmd: command, data: data };
            } else {
                throw new Error("Invalid data for BuzzerAlarm. Expected a single number.");
            }
        case CommandCar.BuzzerAlarmFrequency:
            if (Array.isArray(data) && data.length === 2) {
                return { cmd: command, data: data };
            } else {
                throw new Error("Invalid data for BuzzerAlarmFrequency. Expected an array of 2 numbers.");
            }
        case CommandCar.VideoCaptor:
            if (typeof data === "number") {
                return { cmd: command, data: data };
            } else {
                throw new Error("Invalid data for VideoCaptor. Expected a single number.");
            }
        default:
            throw new Error("Unknown command.");
    }
}