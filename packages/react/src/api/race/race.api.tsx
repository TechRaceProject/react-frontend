import { MockingReturn } from '@shared/interfaces/utils/api.interface';
import { fetchLocalData } from '@shared/utils/api.utils';
import store from '~/store/store';

class ApiVehicle {
    static getToken(): string | null {
        return store.getState().auth.token;
    }

    static async getHistoryRace(): Promise<MockingReturn> {
        try {
            return await fetchLocalData<MockingReturn>(
                '../../mocking/race/historyRace.json'
            );
        } catch (error) {
            console.error('Failed to fetch race history:', error);
            return {
                data: null,
                error: error instanceof Error ? error.message : 'Unknown error',
                isLoading: false,
            };
        }
    }

    static async getLeaderboardRace(): Promise<MockingReturn> {
        try {
            return await fetchLocalData(
                '../../mocking/race/leaderboardRace.json'
            );
        } catch (error) {
            console.error('Failed to fetch leaderboard race:', error);
            return {
                data: null,
                error: error instanceof Error ? error.message : 'Unknown error',
                isLoading: false,
            };
        }
    }
}

export default ApiVehicle;
