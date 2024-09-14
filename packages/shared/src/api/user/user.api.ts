import { ApiProps, ApiReturn } from '../../interfaces/utils/api.interface';
import { api } from '../../utils/api.utils';
import BaseApi from '../base.api';
import { getHostUrl } from '../../../index';

class ApiUser extends BaseApi {
    static async getUsers(): Promise<ApiReturn> {
        const baseUrl = getHostUrl();

        const apiProps: ApiProps = {
            url: `http://${baseUrl}/api/users`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ApiUser.getToken}`,
            },
        };

        return api(apiProps);
    }

    static async getCurrentUsers(): Promise<ApiReturn> {
        const baseUrl = getHostUrl();

        const apiProps: ApiProps = {
            url: `http://${baseUrl}/api/users/current`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ApiUser.getToken}`,
            },
        };

        return api(apiProps);
    }

    static async getUserById(userId: number): Promise<ApiReturn> {
        const baseUrl = getHostUrl();

        const apiProps: ApiProps = {
            url: `http://${baseUrl}/api/users/${userId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ApiUser.getToken}`,
            },
        };

        return api(apiProps);
    }

    static async updateUser(userData: any): Promise<ApiReturn> {
        const baseUrl = getHostUrl();

        const apiProps: ApiProps = {
            url: `http://${baseUrl}/api/users/update`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ApiUser.getToken}`,
            },
            body: userData,
        };

        return api(apiProps);
    }

    static async deleteUser(userId: number): Promise<ApiReturn> {
        const baseUrl = getHostUrl();

        const apiProps: ApiProps = {
            url: `http://${baseUrl}/api/users/${userId}`,
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
