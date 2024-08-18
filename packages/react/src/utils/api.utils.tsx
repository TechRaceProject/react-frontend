import {
    ApiProps,
    ApiReturn,
    MockingProps,
} from '~/interfaces/utils/api.interface';
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

        if (response.status === 401 || response.status === 403) {
            ApiAuth.logout();
            return { data: null, error: 'Unauthorized', isLoading: false };
        }

        const data = await response.json();

        console.log('[api.utils.tsx] data : ', data);

        return { data, error: data.error || null, isLoading: false };
    } catch (err) {
        console.error('[api.utils.tsx] API error:', err);

        return { data: null, error: (err as Error).message, isLoading: false };
    }
}

export async function fetchLocalData({
    url,
}: MockingProps): Promise<ApiReturn> {
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log('[api.utils.tsx] data : ', data);

        return { data, error: data.error || null, isLoading: false };
    } catch (err) {
        console.error('Error loading local JSON data:', err);
        return { data: null, error: (err as Error).message, isLoading: false };
    }
}
