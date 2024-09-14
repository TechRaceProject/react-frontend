import { api } from '../../utils/api.utils';
import { ApiProps, ApiReturn } from '../../interfaces/utils/api.interface';
import BaseApi from '../base.api';
import { getHostUrl } from '../../../index';

class ApiRace extends BaseApi {
    static async getAllUserRaces(
        userId: number,
        token: string
    ): Promise<ApiReturn> {
        const baseUrl = getHostUrl();

        const apiProps: ApiProps = {
            url: `http://${baseUrl}/api/users/${userId}/races`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const { data, error, isLoading } = await api(apiProps);

        return { data, error, isLoading };
    }
    static async getAllRaces(token: string): Promise<ApiReturn> {
        const baseUrl = getHostUrl();

        const apiProps: ApiProps = {
            url: `http://${baseUrl}/api/races`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const { data, error, isLoading } = await api(apiProps);

        return { data, error, isLoading };
    }

    static async deleteRace(raceId: number, token: string): Promise<ApiReturn> {
        const baseUrl = getHostUrl();

        const apiProps: ApiProps = {
            url: `http://${baseUrl}/api/races/${raceId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const { data, error, isLoading } = await api(apiProps);

        return { data, error, isLoading };
    }
}

export default ApiRace;
