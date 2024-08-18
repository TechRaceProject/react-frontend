export interface ApiProps {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: HeadersInit;
    body?: any;
}

export interface ApiReturn {
    data: any | null;
    error: string | null;
    isLoading: boolean;
}
