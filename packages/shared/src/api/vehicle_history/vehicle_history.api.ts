import { api } from '../../utils/api.utils';
import { ApiProps, ApiReturn } from '../../interfaces/utils/api.interface';
import BaseApi from '../base.api';
import { getHostUrl } from '../../../index';

class ApiVehicleHistory extends BaseApi {

    static async getAllVehicleHistories(
        token: string
    ): Promise<ApiReturn> {
        const baseUrl = getHostUrl();

        const apiProps: ApiProps = {
            url: `http://${baseUrl}/api/vehicle-histories/`,
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

