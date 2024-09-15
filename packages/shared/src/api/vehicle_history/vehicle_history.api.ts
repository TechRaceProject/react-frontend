import { api } from '../../utils/api.utils';
import { ApiProps, ApiReturn } from '../../interfaces/utils/api.interface';
import BaseApi from '../base.api';

class ApiVehicleHistory extends BaseApi {

    static async getAllVehicleHistories(
        apiUrl: string,
        token: string
    ): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `${apiUrl}/api/vehicle-histories/`,
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

export default ApiVehicleHistory;
