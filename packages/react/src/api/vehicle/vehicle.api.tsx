import { ApiReturn } from '@shared/interfaces/utils/api.interface';

class ApiVehicle {
    static async fetchData(): Promise<ApiReturn> {
        try {
            const response = await fetch('../../data/fake.data.json');
            const data = await response.json();
            return { data, error: null, isLoading: false };
        } catch (error) {
            console.error('Failed to fetch data', error);
            return {
                data: null,
                error: 'Failed to fetch data',
                isLoading: false,
            };
        }
    }
}

export default ApiVehicle;
