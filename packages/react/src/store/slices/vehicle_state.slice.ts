import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VehicleStateInterface } from '~/interfaces/store/vehicle_state.interface';

const initialState: VehicleStateInterface = {
    id: 0,
    vehicle_id: 0,
    face: 0,
    led_animation: 0,
    buzzer_alarm: 0,
    video_activated: 0,
    primary_led_colors: [],
    buzzer_variable: {
        activated: 0,
        frequency: 0,
    },
    head_angle: {
        vertical_angle: 0,
        horizontal_angle: 0,
    },
};

const vehicleStateSlice = createSlice({
    name: 'vehicle_state',
    initialState,
    reducers: {
        setVehicleState(
            state: VehicleStateInterface,
            action: PayloadAction<VehicleStateInterface>
        ) {
            state.id = action.payload.id;
            state.vehicle_id = action.payload.vehicle_id;
            state.face = action.payload.face;
            state.led_animation = action.payload.led_animation;
            state.buzzer_alarm = action.payload.buzzer_alarm;
            state.video_activated = action.payload.video_activated;
        },
        setVehicleStatePrimaryLedColors(
            state: VehicleStateInterface,
            action: PayloadAction<VehicleStateInterface['primary_led_colors']>
        ) {
            state.primary_led_colors = action.payload;
        },
        setVehicleStateBuzzerVariable(
            state: VehicleStateInterface,
            action: PayloadAction<VehicleStateInterface['buzzer_variable']>
        ) {
            state.buzzer_variable = action.payload;
        },
        setVehicleStateHeadAngle(
            state: VehicleStateInterface,
            action: PayloadAction<VehicleStateInterface['head_angle']>
        ) {
            state.head_angle = action.payload;
        },
        resetVehicleState() {
            return initialState;
        },
    },
});

export const {
    setVehicleState,
    setVehicleStatePrimaryLedColors,
    setVehicleStateBuzzerVariable,
    setVehicleStateHeadAngle,
    resetVehicleState,
} = vehicleStateSlice.actions;

export default vehicleStateSlice.reducer;
