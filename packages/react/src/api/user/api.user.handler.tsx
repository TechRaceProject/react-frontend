import { ApiReturn } from '@shared/interfaces/utils/api.interface';
import store from '~/store/store';
import UserApi from '@shared/api/user/user.api';
import { apiUrl } from '~/config/apiUrl';

class UserApiHandler {
    static async getUsers(): Promise<ApiReturn> {
        UserApi.setToken = store.getState().auth.token;

        const response = await UserApi.getUsers(apiUrl);

        return response;
    }

    static async getCurrentUsers(): Promise<ApiReturn> {
        UserApi.setToken = store.getState().auth.token;

        const response = await UserApi.getCurrentUsers(apiUrl);

        return response;
    }

    static async getUserById(userId: number): Promise<ApiReturn> {
        UserApi.setToken = store.getState().auth.token;

        const response = await UserApi.getUserById(apiUrl, userId);

        return response;
    }

    static async updateUser(userData: any): Promise<ApiReturn> {
        UserApi.setToken = store.getState().auth.token;

        const response = await UserApi.updateUser(apiUrl, userData);

        return response;
    }

    static async deleteUser(userId: number): Promise<ApiReturn> {
        UserApi.setToken = store.getState().auth.token;

        const response = await UserApi.deleteUser(apiUrl, userId);

        return response;
    }
}

export default UserApiHandler;
