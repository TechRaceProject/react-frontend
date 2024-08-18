import { api } from '~/utils/api.utils';
import { ApiProps, ApiReturn } from '~/interfaces/utils/api.interface';
import store from '~/store/store';
import { setAuthState, logout } from '~/store/slice/auth.slice';
import { setUserState, resetUserState } from '~/store/slice/user.slice';
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

        if (!data.errors) {
            const loginResponse = await ApiAuth.login({
                email: registerData.email,
                password: registerData.password,
            });

            if (!loginResponse.error) {
                store.dispatch(
                    setAuthState({
                        isLoggedIn: true,
                        token: loginResponse.data.token,
                    })
                );
                store.dispatch(
                    setUserState({
                        id: loginResponse.data.user.id,
                        username: loginResponse.data.user.username,
                        email: loginResponse.data.user.email,
                        pp:
                            loginResponse.data.pp ||
                            'https://static1.squarespace.com/static/656f4e4dababbd7c042c4946/657236350931ee4538eea52c/65baf15103d8ad2826032a8a/1707422532886/how-to-stop-being-a-people-pleaser-1_1.jpg?format=1500w',
                        created_at: loginResponse.data.user.created_at,
                        updated_at: loginResponse.data.user.updated_at,
                    })
                );
            }

            const mapErrors = data.errors.map(
                (error: { message: string }) => error.message
            );

            return { data, error: mapErrors.join(', '), isLoading };
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
            if (data.errors) {
                const mapErrors = data.errors.map(
                    (error: { message: string }) => error.message
                );

                return { data, error: mapErrors.join(', '), isLoading };
            }

            store.dispatch(
                setAuthState({
                    isLoggedIn: true,
                    token: data.token,
                })
            );
            store.dispatch(
                setUserState({
                    id: data.user.id,
                    username: data.user.username,
                    email: data.user.email,
                    pp:
                        data.pp ||
                        'https://static1.squarespace.com/static/656f4e4dababbd7c042c4946/657236350931ee4538eea52c/65baf15103d8ad2826032a8a/1707422532886/how-to-stop-being-a-people-pleaser-1_1.jpg?format=1500w',
                    created_at: data.user.created_at,
                    updated_at: data.user.updated_at,
                })
            );
        }

        return { data, error, isLoading };
    }

    static async logout(): Promise<void> {
        store.dispatch(logout());
        store.dispatch(resetUserState());
    }
}

export default ApiAuth;
