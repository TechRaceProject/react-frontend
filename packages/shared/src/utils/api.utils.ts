import {
    ApiProps,
    MockingProps,
    ApiReturn,
} from '../interfaces/utils/api.interface';

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

        const data = await response.json();

        return { data, error: data.error || null, isLoading: false };
    } catch (err) {
        console.error('[@shared.api.utils.tsx] API error:', err);

        return { data: null, error: (err as Error).message, isLoading: false };
    }
}

export async function fetchLocalData({
    url,
}: MockingProps): Promise<ApiReturn> {
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
