import {
    MockingProps,
    ApiReturn,
} from '@shared/interfaces/utils/api.interface';
import { fetchLocalData } from '@shared/utils/api.utils';
import store from '~/store/store';

class ApiVehicle {
    static getToken(): string | null {
        return store.getState().auth.token;
    }

    static async getVehicleStatistics(): Promise<ApiReturn> {
        const apiProps: MockingProps = {
            url: '../../mocking/vehicle/vehicleStatistics.json',
        };

        return fetchLocalData(apiProps);
    }

    static async getSpeedData(): Promise<ApiReturn> {
        const apiProps: MockingProps = {
            url: '../../mocking/vehicle/speedData.json',
        };

        return fetchLocalData(apiProps);
    }

    static async getMovementHistory(): Promise<ApiReturn> {
        const apiProps: MockingProps = {
            url: '../../mocking/vehicle/movementHistory.json',
        };

        return fetchLocalData(apiProps);
    }

    static async getAllData(): Promise<ApiReturn> {
        try {
            const [vehicleStatistics, speedData, movementHistory] =
                await Promise.all([
                    ApiVehicle.getVehicleStatistics(),
                    ApiVehicle.getSpeedData(),
                    ApiVehicle.getMovementHistory(),
                ]);

            if (
                vehicleStatistics.error ||
                speedData.error ||
                movementHistory.error
            ) {
                return {
                    data: null,
                    error: 'Failed to fetch one or more data sources',
                    isLoading: false,
                };
            }

            const data = {
                vehicleStatistics: vehicleStatistics.data,
                speedData: speedData.data,
                movementHistory: movementHistory.data,
            };

            return { data, error: null, isLoading: false };
        } catch (error) {
            console.error('Failed to fetch all vehicle data', error);
            return {
                data: null,
                error: 'Failed to fetch all vehicle data',
                isLoading: false,
            };
        }
    }
}

export default ApiVehicle;
