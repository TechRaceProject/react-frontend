import { ApiProps, ApiReturn } from '~/interfaces/utils/api.interface';

export async function api({
    url,
    method,
    headers,
    body,
}: ApiProps): Promise<ApiReturn> {
    try {
        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(body),
        });

        const data = await response.json();

        console.log('[api.utils.tsx] data : ', data);

        return { data, error: data.error || null, isLoading: false };
    } catch (err) {
        console.error('[api.utils.tsx] API error:', err);

        return { data: null, error: (err as Error).message, isLoading: false };
    }
}
