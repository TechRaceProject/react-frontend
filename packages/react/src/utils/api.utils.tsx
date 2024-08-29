import store from '~/store/store';
import { logout } from '~/store/slices/auth.slice';
import { resetUserState } from '~/store/slices/user.slice';

export const handleApiResponse = async (response: any) => {
    const { data, error, isLoading } = response;

    console.log('response', response);

    if (error) {
        const statusCode = error;

        console.log('statusCode', statusCode);
        if (statusCode === 'Unauthorized') {
            store.dispatch(logout());
            store.dispatch(resetUserState());
            return {
                data: null,
                error: 'Unauthorized or Forbidden. Logged out.',
                isLoading: false,
            };
        }
    }

    return { data, error, isLoading };
};
