import { ApiReturn } from '@shared/interfaces/utils/api.interface';
import ApiVehicle from '@shared/api/race/race.api';
import store from '~/store/store';

class ApiVehicleHandler {
    static async getHistoryRace(): Promise<ApiReturn> {
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

        const { data, error, isLoading } = await ApiVehicle.getHistoryRace(
            userId,
            token
        );

        return { data, error, isLoading };
    }

    static async getLeaderboardRace(): Promise<ApiReturn> {
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
            await ApiVehicle.getLeaderboardRace(token);

        return { data, error, isLoading };
    }

    static async deleteRace(raceId: number): Promise<ApiReturn> {
        const state = store.getState();
        const token = state.auth.token;

        if (!token) {
            return {
                data: null,
                error: 'Token is missing.',
                isLoading: false,
            };
        }

        const { data, error, isLoading } = await ApiVehicle.deleteRace(
            raceId,
            token
        );

        return { data, error, isLoading };
    }
}

export default ApiVehicleHandler;
