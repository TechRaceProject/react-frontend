import { api } from '../../utils/api.utils';
import { ApiProps, ApiReturn } from '../../interfaces/utils/api.interface';
import { authFormPropsApi } from '../../interfaces/other/auth.interface';
import BaseApi from '../base.api';

class ApiAuth extends BaseApi {
    static async register(registerData: authFormPropsApi): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `http://${BaseApi.baseUrl}/api/signup`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: registerData,
        };

        const { data, error, isLoading } = await api(apiProps);

        return { data, error, isLoading };
    }

    static async login(loginData: authFormPropsApi): Promise<ApiReturn> {
        console.log('baseUrl', baseUrl);
        const apiProps: ApiProps = {
            url: `http://${BaseApi.baseUrl}/api/login`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: loginData,
        };

        const { data, error, isLoading } = await api(apiProps);

        return { data, error, isLoading };
    }
}

export default ApiAuth;
