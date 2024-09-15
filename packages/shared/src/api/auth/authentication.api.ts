import { api } from '../../utils/api.utils';
import { ApiProps, ApiReturn } from '../../interfaces/utils/api.interface';
import { authFormPropsApi } from '../../interfaces/other/auth.interface';
import BaseApi from '../base.api';

class ApiAuth extends BaseApi {
    static async register(
        apiUrl: string,
        registerData: authFormPropsApi
    ): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `${apiUrl}/api/signup`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: registerData,
        };

        const { data, error, isLoading } = await api(apiProps);

        return { data, error, isLoading };
    }

    static async login(
        apiUrl: string,
        loginData: authFormPropsApi
    ): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `${apiUrl}/api/login`,
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
