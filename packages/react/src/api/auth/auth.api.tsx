import { api } from '~/utils/api.utils';
import { ApiProps, ApiReturn } from '~/interfaces/utils/api.interface';
import store from '~/store/store';
import { setLoginState } from '~/store/slice/auth.slice';

class ApiAuth {
    static async register(registerData: any): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8090/api/users/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: registerData,
        };

        const { data, error, isLoading } = await api(apiProps);

        if (data && !error) {
            store.dispatch(setLoginState(true));
        }

        return { data, error, isLoading };
    }

    static async login(loginData: any): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8090/api/login_check',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: loginData,
        };

        const { data, error, isLoading } = await api(apiProps);

        if (data && !error) {
            store.dispatch(setLoginState(true));
        }

        return { data, error, isLoading };
    }
}

export default ApiAuth;
