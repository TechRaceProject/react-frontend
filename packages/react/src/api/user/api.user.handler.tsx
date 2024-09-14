import { ApiReturn } from '@shared/interfaces/utils/api.interface';
import store from '~/store/store';
import UserApi from '@shared/api/user/user.api';

class UserApiHandler {
    static async getUsers(): Promise<ApiReturn> {
        UserApi.setToken = store.getState().auth.token;

        const response = await UserApi.getUsers();

        return response;
    }

    static async getCurrentUsers(): Promise<ApiReturn> {
        UserApi.setToken = store.getState().auth.token;

        const response = await UserApi.getCurrentUsers();

        return response;
    }

    static async getUserById(userId: number): Promise<ApiReturn> {
        UserApi.setToken = store.getState().auth.token;

        const response = await UserApi.getUserById(userId);

        return response;
    }

    static async updateUser(userData: any): Promise<ApiReturn> {
        UserApi.setToken = store.getState().auth.token;

        const response = await UserApi.updateUser(userData);

        return response;
    }

    static async deleteUser(userId: number): Promise<ApiReturn> {
        UserApi.setToken = store.getState().auth.token;

        const response = await UserApi.deleteUser(userId);

        return response;
    }
}

export default UserApiHandler;
