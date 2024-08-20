import {
    MockingProps,
    ApiReturn,
} from '@shared/interfaces/utils/api.interface';
import { fetchLocalData } from '@shared/utils/api.utils';
import store from '~/store/store';

class ApiVehicle {
    static getToken(): string | null {
        return store.getState().auth.token;
    }

    static async getHistoryRace(): Promise<ApiReturn> {
        const apiProps: MockingProps = {
            url: '../../mocking/race/historyRace.json',
        };

        return fetchLocalData(apiProps);
    }

    static async getLeaderboardRace(): Promise<ApiReturn> {
        const apiProps: MockingProps = {
            url: '../../mocking/race/leaderboardRace.json',
        };

        return fetchLocalData(apiProps);
    }
}

export default ApiVehicle;
