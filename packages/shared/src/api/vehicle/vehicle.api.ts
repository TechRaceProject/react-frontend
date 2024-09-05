import { ApiProps, ApiReturn } from '../../interfaces/utils/api.interface';
import { api } from '../../utils/api.utils';

class ApiVehicle {
    static async getAllVehicles(token: string): Promise<ApiReturn> {
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
}

export default ApiVehicle;
