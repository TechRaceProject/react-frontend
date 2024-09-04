import { ApiProps, ApiReturn } from '../../interfaces/utils/api.interface';
import { api } from '../../utils/api.utils';

class ApiVehicle {
    static async getVehicles(token: string): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: 'http://localhost:8000/api/vehicles/',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const { data, error, isLoading } = await api(apiProps);
        return { data, error, isLoading };
    }

    static async getVehicleState(
        vehicleId: number,
        token: string
    ): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `http://localhost:8000/api/vehicle-states/${vehicleId}`,
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
        vehicleId: number,
        token: string,
        body: object
    ): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `http://localhost:8000/api/vehicle-states/${vehicleId}`,
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

export default ApiVehicle;
