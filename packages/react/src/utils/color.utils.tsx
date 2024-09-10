import { LedColor } from '~/interfaces/store/vehicle.interface';

export const rgbToHex = (r: number = 0, g: number = 0, b: number = 0) => {
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const hexToRgb = (hex: string): LedColor => {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        led_identifier: 0,
        red: (bigint >> 16) & 255,
        green: (bigint >> 8) & 255,
        blue: bigint & 255,
    };
};
