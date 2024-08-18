import { api } from '../../utils/api.utils';
import { ApiProps, ApiReturn } from '../../interfaces/utils/api.interface';
import { authFormPropsApi } from '../../interfaces/other/auth.interface';

class ApiAuth {
    static async register(registerData: authFormPropsApi): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: 'http://localhost:8000/api/signup',
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
        const apiProps: ApiProps = {
            url: 'http://localhost:8000/api/login',
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
