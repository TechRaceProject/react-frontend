function AdjustPositionJoystickScreenModeGenerator(
    joystickPosition: { x: number; y: number },
    mode: 'landscape' | 'portrait'
): Array<number> {
    return mode === 'landscape'
        ? [joystickPosition.y, joystickPosition.x * -1]
        : [joystickPosition.x, joystickPosition.y];
}

export default AdjustPositionJoystickScreenModeGenerator;
