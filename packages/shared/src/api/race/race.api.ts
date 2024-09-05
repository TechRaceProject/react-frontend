import { api } from '../../utils/api.utils';
import { ApiProps, ApiReturn } from '../../interfaces/utils/api.interface';
import BaseApi from '../base.api';

class ApiRace extends BaseApi {
    static async getAllUserRaces(
        userId: number,
        token: string
    ): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `http://localhost:8000/api/users/${userId}/races`,
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
        const apiProps: ApiProps = {
            url: 'http://localhost:8000/api/races',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const { data, error, isLoading } = await api(apiProps);

        return { data, error, isLoading };
    }

    // New method to delete a race by ID
    static async deleteRace(raceId: number, token: string): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `http://localhost:8000/api/races/${raceId}`,
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
