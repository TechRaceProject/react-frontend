import { getHostUrl } from '../../index';

class BaseApi {
    private static token: string | null = null;
    protected static baseUrl: string = getHostUrl();

    static get getToken(): string | null {
        return BaseApi.token;
    }

    static set setToken(token: string | null) {
        BaseApi.token = token;
    }
}

export default BaseApi;
