import ApiRace from '@shared/api/race/race.api';
import { ApiReturn } from '@shared/interfaces/utils/api.interface';
import store from '~/store/store';

class ApiRaceHandler {
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

        const { data, error, isLoading } = await ApiRace.getAllUserRaces(
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

        const { data, error, isLoading } = await ApiRace.getAllRaces(token);

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

        const { data, error, isLoading } = await ApiRace.deleteRace(
            raceId,
            token
        );

        return { data, error, isLoading };
    }
}

export default ApiRaceHandler;
