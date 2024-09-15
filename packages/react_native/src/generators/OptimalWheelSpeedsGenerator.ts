import { CarLowSpeedDifferentialRatioEnum } from '../enums/CarDifferentialRatio/CarLowSpeedDifferentialRatioEnum';
import { CarNormalSpeedDifferentialRatioEnum } from '../enums/CarDifferentialRatio/CarNormalSpeedDifferentialRatioEnum';
import { CarHighSpeedDifferentialRatioEnum } from '../enums/CarDifferentialRatio/CarHighSpeedDifferentialRatioEnum';
import { CarJoystickStepPowerEnum } from '../enums/CarJoystickStepPowerEnum';
import { CarModePowerEnum } from '../enums/CarModePowerEnum';

function OptimalWheelSpeedsGenerator(
    x: number,
    y: number,
    maxX: number,
    maxY: number,
    powerMode: number
): number[] {
    const wheelSpeeds = calculateSpeedCarWheel(x, y, maxX);
    const ratioSpeed = Math.round((powerMode / maxY) * y);

    for (let i = 0; i < wheelSpeeds.length; i++) {
        wheelSpeeds[i] = Math.round(wheelSpeeds[i] * ratioSpeed);
    }

    return wheelSpeeds;
}

function getTypeCarDifferentialRatio(y: number) {
    if (Math.abs(y) <= CarJoystickStepPowerEnum.Low) {
        return CarLowSpeedDifferentialRatioEnum;
    }

    if (
        Math.abs(y) > CarJoystickStepPowerEnum.Low &&
        Math.abs(y) <= CarJoystickStepPowerEnum.Medium
    ) {
        return CarNormalSpeedDifferentialRatioEnum;
    }

    return CarHighSpeedDifferentialRatioEnum;
}

function calculateSpeedCarWheel(x: number, y: number, maxX: number): number[] {
    let wheelSpeeds = [1, 1, 1, 1];

    if (x > -maxX * 0.12 && x < maxX * 0.12) {
        return wheelSpeeds;
    }

    const carDifferentialRatioEnum = getTypeCarDifferentialRatio(y);

    if (Math.abs(y) <= CarJoystickStepPowerEnum.Low) {
        wheelSpeeds = calculateAngleCarWheel(
            carDifferentialRatioEnum.Low,
            wheelSpeeds,
            x
        );
    }

    if (
        Math.abs(y) > CarJoystickStepPowerEnum.Low &&
        Math.abs(y) <= CarJoystickStepPowerEnum.Medium
    ) {
        wheelSpeeds = calculateAngleCarWheel(
            carDifferentialRatioEnum.Middle,
            wheelSpeeds,
            x
        );
    }

    if (
        Math.abs(y) > CarJoystickStepPowerEnum.Medium &&
        Math.abs(y) <= CarJoystickStepPowerEnum.High
    ) {
        wheelSpeeds = calculateAngleCarWheel(
            carDifferentialRatioEnum.High,
            wheelSpeeds,
            x
        );
    }

    return wheelSpeeds;
}

function calculateAngleCarWheel(
    carDifferentialRatio: number,
    wheelSpeeds: number[],
    x: number
): number[] {
    if (Math.sign(x) === 1) {
        wheelSpeeds[2] = wheelSpeeds[2] - carDifferentialRatio / 100;
        wheelSpeeds[3] = wheelSpeeds[3] - carDifferentialRatio / 100;
    } else if (Math.sign(x) === -1) {
        wheelSpeeds[0] = wheelSpeeds[0] - carDifferentialRatio / 100;
        wheelSpeeds[1] = wheelSpeeds[1] - carDifferentialRatio / 100;
    }

    return wheelSpeeds;
}

export default OptimalWheelSpeedsGenerator;
