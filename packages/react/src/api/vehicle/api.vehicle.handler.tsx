import { ApiReturn } from '@shared/interfaces/utils/api.interface';
import ApiVehicle from '@shared/api/vehicle/vehicle.api';
import ApiVehicleState from '@shared/api/vehicle_state/vehicle_state.api';

import store from '~/store/store';

class ApiVehicleHandler {
    static async getVehicles(): Promise<ApiReturn> {
        const state = store.getState();
        const token = state.auth.token;

        if (!token) {
            return {
                data: null,
                error: 'Token is missing.',
                isLoading: false,
            };
        }

        const { data, error, isLoading } =
            await ApiVehicle.getAllVehicles(token);
        return { data, error, isLoading };
    }

    static async getVehicleState(vehicleId: number): Promise<ApiReturn> {
        const state = store.getState();
        const token = state.auth.token;

        if (!token) {
            return {
                data: null,
                error: 'Token is missing.',
                isLoading: false,
            };
        }

        const { data, error, isLoading } =
            await ApiVehicleState.getAVehiculeState(vehicleId, token);
        return { data, error, isLoading };
    }

    static async updateVehicleState(
        vehicleId: number,
        body: object
    ): Promise<ApiReturn> {
        const state = store.getState();
        const token = state.auth.token;

        if (!token) {
            return {
                data: null,
                error: 'Token is missing.',
                isLoading: false,
            };
        }

        const { data, error, isLoading } =
            await ApiVehicleState.updateVehicleState(vehicleId, token, body);
        return { data, error, isLoading };
    }
}

export default ApiVehicleHandler;
