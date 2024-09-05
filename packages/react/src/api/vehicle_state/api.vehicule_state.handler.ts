import ApiVehicleState from '@shared/api/vehicle_state/vehicle_state.api';
import { ApiReturn } from '@shared/interfaces/utils/api.interface';
import store from '~/store/store';

class ApiVehiculeStateHandler {
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

    static async getAllUserVehiculeState(): Promise<ApiReturn> {
        const state = store.getState();
        const token = state.auth.token;
        const userId = state.user.id;

        if (!token || !userId) {
            return {
                data: null,
                error: 'Token or User ID is missing.',
                isLoading: false,
            };
        }

        const { data, error, isLoading } =
            await ApiVehicleState.getAllVehicleStatesOfAUser(userId, token);
        return { data, error, isLoading };
    }

    static async updateVehicleState(): Promise<ApiReturn> {
        const state = store.getState();
        const token = state.auth.token;
        const vehicleState = state.vehicle_state;

        if (!token) {
            return {
                data: null,
                error: 'Token is missing.',
                isLoading: false,
            };
        }

        const { data, error, isLoading } =
            await ApiVehicleState.updateVehicleState(
                vehicleState.id,
                token,
                vehicleState
            );

        if (data && !error) {
            if (data.errors) {
                const mapErrors = data.errors.map(
                    (error: { message: string }) => error.message
                );
                return { data, error: mapErrors.join(', '), isLoading };
            }
        }

        return { data, error, isLoading };
    }
}

export default ApiVehiculeStateHandler;
