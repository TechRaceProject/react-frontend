import { api } from '../../utils/api.utils';
import { ApiProps, ApiReturn } from '../../interfaces/utils/api.interface';
import BaseApi from '../base.api';

class ApiRace extends BaseApi {
    static async getAllUserRaces(
        apiUrl: string,
        userId: number,
        token: string
    ): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `${apiUrl}/api/users/${userId}/races`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const { data, error, isLoading } = await api(apiProps);

        return { data, error, isLoading };
    }
    static async getAllRaces(
        apiUrl: string,
        token: string
    ): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `${apiUrl}/api/races/`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const { data, error, isLoading } = await api(apiProps);

        return { data, error, isLoading };
    }

    static async deleteRace(
        apiUrl: string,
        raceId: number,
        token: string
    ): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `${apiUrl}/api/races/${raceId}`,
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
