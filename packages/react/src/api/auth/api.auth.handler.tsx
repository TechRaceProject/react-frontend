import { ApiReturn } from '@shared/interfaces/utils/api.interface';
import store from '~/store/store';
import { setAuthState, logout } from '~/store/slices/auth.slice';
import { setUserState, resetUserState } from '~/store/slices/user.slice';
import { authFormPropsApi } from '@shared/interfaces/other/auth.interface';
import ApiAuth from '@shared/api/auth/authentication.api';
import ProfileDefault from '~/assets/images/profile-default.svg';
import { apiUrl } from '~/config/apiUrl';

class ApiAuthHandler {
    static async register(registerData: authFormPropsApi): Promise<ApiReturn> {
        const { data, error, isLoading } = await ApiAuth.register(
            apiUrl,
            registerData
        );

        if (data && !error) {
            return await ApiAuthHandler.login({
                email: registerData.email,
                password: registerData.password,
            });
        }

        return { data, error, isLoading };
    }

    static async login(loginData: authFormPropsApi): Promise<ApiReturn> {
        const { data, error, isLoading } = await ApiAuth.login(
            apiUrl,
            loginData
        );

        if (data && !error) {
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
        }

        return { data, error, isLoading };
    }

    static async logout(): Promise<void> {
        store.dispatch(logout());
        store.dispatch(resetUserState());
    }
}

export default ApiAuthHandler;
