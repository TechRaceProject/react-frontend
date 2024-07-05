import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginState: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        setAuthToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
    },
});

export const { setLoginState, setAuthToken } = authSlice.actions;
export default authSlice.reducer;
