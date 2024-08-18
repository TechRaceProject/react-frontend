import { api } from '~/utils/api.utils';
import { ApiProps, ApiReturn } from '~/interfaces/utils/api.interface';
import store from '~/store/store';
import { setAuthState, logout } from '~/store/slice/auth.slice';
import { setUserState, resetUserState } from '~/store/slice/user.slice';
import { authFormPropsApi } from '~/interfaces/other/auth.interface';
import ProfileDefault from '~/assets/images/profile-default.svg';

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

        if (!data.errors && !error) {
            await ApiAuth.login({
                email: registerData.email,
                password: registerData.password,
            });
        } else {
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

        if (!data.errors && !error) {
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
                    photo: data.photo || ProfileDefault,
                    created_at: data.user.created_at,
                    updated_at: data.user.updated_at,
                })
            );
        } else {
            const mapErrors = data.errors.map(
                (error: { message: string }) => error.message
            );

            return { data, error: mapErrors.join(', '), isLoading };
        }

        return { data, error, isLoading };
    }
    static async logout(): Promise<void> {
        store.dispatch(logout());
        store.dispatch(resetUserState());
    }
}
export default ApiAuth;
