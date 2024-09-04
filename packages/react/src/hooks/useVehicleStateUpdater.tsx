import { useDispatch, useSelector } from 'react-redux';
import {
    setVehicleState,
    setError,
    setLoading,
} from '~/store/slices/vehicle.slice';
import ApiVehicleHandler from '~/api/vehicle/api.vehicle.handler';
import { RootState } from '~/store/store';
import { VehicleStateData } from '~/interfaces/store/vehicle.interface';

function useVehicleStateUpdater() {
    const dispatch = useDispatch();
    const vehicleId = useSelector(
        (state: RootState) => state.vehicle.selectedVehicle
    );
    const currentVehicleState = useSelector(
        (state: RootState) => state.vehicle.vehicleState
    );

    const cleanData = (data: VehicleStateData): VehicleStateData => {
        return {
            ...data,
            primary_led_colors: data.primary_led_colors.map((led) => ({
                led_identifier: led.led_identifier,
                red: led.red,
                green: led.green,
                blue: led.blue,
            })),
            buzzer_variable: {
                activated: data.buzzer_variable.activated,
                frequency: data.buzzer_variable.frequency,
            },
            head_angle: {
                vertical_angle: data.head_angle.vertical_angle,
                horizontal_angle: data.head_angle.horizontal_angle,
            },
            face: data.face,
            led_animation: data.led_animation,
            buzzer_alarm: data.buzzer_alarm,
            video_activated: data.video_activated,
        };
    };

    const updateVehicleState = async (updates: Partial<VehicleStateData>) => {
        if (!vehicleId || !currentVehicleState) return;

        dispatch(setLoading(true));

        const payload: VehicleStateData = cleanData({
            ...currentVehicleState,
            ...updates,
        });

        try {
            const { data, error } = await ApiVehicleHandler.updateVehicleState(
                vehicleId,
                payload
            );

            if (error) {
                throw new Error(error);
            }

            dispatch(setVehicleState(data.data as VehicleStateData));
        } catch (error) {
            dispatch(setError((error as Error).message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return updateVehicleState;
}

export default useVehicleStateUpdater;
