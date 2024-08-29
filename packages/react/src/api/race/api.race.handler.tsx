import { ApiReturn } from '@shared/interfaces/utils/api.interface';
import ApiVehicle from '@shared/api/race/race.api';
import store from '~/store/store';
import { handleApiResponse } from '~/utils/api.utils';

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

        const response = await ApiVehicle.getHistoryRace(userId, token);
        return await handleApiResponse(response);
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

        const response = await ApiVehicle.getLeaderboardRace(token);
        return await handleApiResponse(response);
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

        const response = await ApiVehicle.deleteRace(raceId, token);
        return await handleApiResponse(response);
    }
}

export default ApiVehicleHandler;
