export interface ApiProps {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: HeadersInit;
    body?: any;
}

export interface ApiReturn {
    data: any | null;
    error: string | null;
    isLoading: boolean;
}
