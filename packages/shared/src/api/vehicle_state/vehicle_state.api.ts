import { ApiProps, ApiReturn } from '../../interfaces/utils/api.interface';
import { api } from '../../utils/api.utils';
import BaseApi from '../base.api';

class ApiVehicleState extends BaseApi {
    static async getAllVehicleStatesOfAUser(apiUrl: string, userId: number, token: string): Promise<ApiReturn> {

        const apiProps: ApiProps = {
            url: `${apiUrl}/api/users/${userId}/vehicle-states`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const { data, error, isLoading } = await api(apiProps);

        return { data, error, isLoading };
    }

    static async getAVehiculeState(
        apiUrl: string,
        vehicleStateId: number,
        token: string
    ): Promise<ApiReturn> {

        const apiProps: ApiProps = {
            url: `${apiUrl}/api/vehicle-states/${vehicleStateId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const { data, error, isLoading } = await api(apiProps);
        return { data, error, isLoading };
    }

    static async updateVehicleState(
        apiUrl: string,
        vehicleStateId: number,
        token: string,
        body: object
    ): Promise<ApiReturn> {

        const apiProps: ApiProps = {
            url: `${apiUrl}/api/vehicle-states/${vehicleStateId}`,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body,
        };

        const { data, error, isLoading } = await api(apiProps);

        return { data, error, isLoading };
    }
}

export default ApiVehicleState;
