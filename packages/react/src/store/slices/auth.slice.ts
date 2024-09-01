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
        setAuthState: (state: AuthState, action: PayloadAction<AuthState>) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        logout: (state: AuthState) => {
            state.isLoggedIn = false;
            state.token = null;
        },
    },
});

export const { setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
