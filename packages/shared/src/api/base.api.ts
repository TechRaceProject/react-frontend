class BaseApi {
    private static token: string | null = null;

    static get getToken(): string | null {
        return BaseApi.token;
    }

    static set setToken(token: string | null) {
        BaseApi.token = token;
    }
}

export default BaseApi;
