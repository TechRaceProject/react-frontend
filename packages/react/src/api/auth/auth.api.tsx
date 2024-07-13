import { api } from '~/utils/api.utils';
import { ApiProps, ApiReturn } from '~/interfaces/utils/api.interface';
import store from '~/store/store';
import { setAuthState, logout } from '~/store/slice/auth.slice';
import { setUserState } from '~/store/slice/user.slice';
import { authFormPropsApi } from '~/interfaces/other/auth.interface';

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

        if (data && !error) {
            const loginResponse = await ApiAuth.login({
                username: registerData.email,
                password: registerData.password,
            });

            if (!loginResponse.error) {
                store.dispatch(
                    setAuthState({
                        isLoggedIn: true,
                        token: loginResponse.data.token,
                        expire_at: loginResponse.data.expire_at,
                    })
                );
                store.dispatch(setUserState(loginResponse.data.user));
            }
        }

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

        if (data && !error) {
            store.dispatch(
                setAuthState({
                    isLoggedIn: true,
                    token: data.token,
                    expire_at: data.expire_at,
                })
            );
            store.dispatch(setUserState(data.user));
        }

        return { data, error, isLoading };
    }

    static async logout(): Promise<void> {
        store.dispatch(logout());
    }
}

export default ApiAuth;
