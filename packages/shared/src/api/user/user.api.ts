import { ApiProps, ApiReturn } from '../../interfaces/utils/api.interface';
import { api } from '../../utils/api.utils';
import BaseApi from '../base.api';

class ApiUser extends BaseApi {
    static async getUsers(apiUrl: string): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `${apiUrl}/api/users`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ApiUser.getToken}`,
            },
        };

        return api(apiProps);
    }

    static async getCurrentUsers(apiUrl: string): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `${apiUrl}/api/users/current`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ApiUser.getToken}`,
            },
        };

        return api(apiProps);
    }

    static async getUserById(apiUrl: string,userId: number): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `${apiUrl}/api/users/${userId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ApiUser.getToken}`,
            },
        };

        return api(apiProps);
    }

    static async updateUser(apiUrl: string, userData: any): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `${apiUrl}/api/users/update`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ApiUser.getToken}`,
            },
            body: userData,
        };

        return api(apiProps);
    }

    static async deleteUser(apiUrl: string,userId: number): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `${apiUrl}/api/users/${userId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ApiUser.getToken}`,
            },
        };

        return api(apiProps);
    }
}

export default ApiUser;
