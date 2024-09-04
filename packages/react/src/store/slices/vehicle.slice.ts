import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    VehicleState,
    Vehicle,
    VehicleStateData,
} from '~/interfaces/store/vehicle.interface';

const initialState: VehicleState = {
    vehicles: [],
    selectedVehicle: null,
    vehicleState: null,
    loading: false,
    error: null,
};

const vehicleSlice = createSlice({
    name: 'vehicles',
    initialState,
    reducers: {
        setVehicles(state, action: PayloadAction<Vehicle[]>) {
            state.vehicles = action.payload;
            state.loading = false;
            state.error = null;
        },
        setVehicleState(state, action: PayloadAction<VehicleStateData>) {
            state.vehicleState = action.payload;
            state.loading = false;
            state.error = null;
        },
        setSelectedVehicle(state, action: PayloadAction<number | null>) {
            state.selectedVehicle = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const {
    setVehicles,
    setVehicleState,
    setSelectedVehicle,
    setLoading,
    setError,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;
