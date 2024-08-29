import { ApiReturn } from '@shared/interfaces/utils/api.interface';
import store from '~/store/store';
import { setAuthState, logout } from '~/store/slices/auth.slice';
import { setUserState, resetUserState } from '~/store/slices/user.slice';
import { authFormPropsApi } from '@shared/interfaces/other/auth.interface';
import ApiAuth from '@shared/api/auth/authentication.api';
import ProfileDefault from '~/assets/images/profile-default.svg';
import { handleApiResponse } from '~/utils/api.utils';

class ApiAuthHandler {
    static async register(registerData: authFormPropsApi): Promise<ApiReturn> {
        const response = await ApiAuth.register(registerData);
        const { data, error, isLoading } = await handleApiResponse(response);

        if (data && !error) {
            if (!data.errors) {
                return await ApiAuthHandler.login({
                    email: registerData.email,
                    password: registerData.password,
                });
            }

            const mapErrors = data.errors.map(
                (error: { message: string }) => error.message
            );
            return { data, error: mapErrors.join(', '), isLoading };
        }
        return { data, error, isLoading };
    }

    static async login(loginData: authFormPropsApi): Promise<ApiReturn> {
        const response = await ApiAuth.login(loginData);
        const { data, error, isLoading } = await handleApiResponse(response);

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
