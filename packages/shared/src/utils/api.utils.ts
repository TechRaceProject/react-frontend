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

        return { data, error: data.error || null, isLoading: false };
    } catch (err) {
        console.error('[@shared.api.utils.tsx] API error:', err);

        return { data: null, error: (err as Error).message, isLoading: false };
    }
}

export const fetchLocalData = async <T>(url: string): Promise<T> => {
    try {
        const response = await fetch(url);

        const contentType = response.headers.get('content-type');
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Resource not found (404)');
            } else if (response.status === 500) {
                throw new Error('Server error (500)');
            } else {
                throw new Error(
                    `Network response was not ok: ${response.status} ${response.statusText}`
                );
            }
        }

        if (contentType && contentType.includes('application/json')) {
            const data: T = await response.json();
            return data;
        } else if (contentType && contentType.includes('text/html')) {
            const text = await response.text();
            throw new Error(
                `Expected JSON, but received HTML: ${text.substring(0, 200)}...`
            );
        } else {
            throw new Error(`Unexpected content-type: ${contentType}`);
        }
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        throw error;
    }
};
