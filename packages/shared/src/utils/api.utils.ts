import { ApiProps, ApiReturn } from '../interfaces/utils/api.interface';

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

        if (data && data.errors) {
            const mapErrors = data.errors.map(
                (error: { message: string }) => error.message
            );
            return { data, error: mapErrors.join(', '), isLoading: false };
        }

        return { data, error: data.error || null, isLoading: false };
    } catch (err) {
        console.error('[@shared.api.utils.tsx] API error:', err);

        return { data: null, error: (err as Error).message, isLoading: false };
    }
}
