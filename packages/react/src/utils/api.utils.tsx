import { ApiProps, ApiReturn } from '~/interfaces/utils/api.interface';
import ApiAuth from '~/api/auth/auth.api';

export async function api({
    url,
    method = 'GET',
    headers = {},
    body = null,
}: ApiProps): Promise<ApiReturn> {
    try {
        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        });

        if (response.status === 401) {
            ApiAuth.logout();
            return { data: null, error: 'Unauthorized', isLoading: false };
        }

        const data = await response.json();
        console.log(data);
        return { data, error: data.error || null, isLoading: false };
    } catch (err) {
        console.error('API error:', err);
        return { data: null, error: (err as Error).message, isLoading: false };
    }
}

export async function fetchLocalData({ url }: ApiProps): Promise<ApiReturn> {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return { data, error: data.error || null, isLoading: false };
    } catch (err) {
        console.error('Error loading local JSON data:', err);
        return { data: null, error: (err as Error).message, isLoading: false };
    }
}
