import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    expire_at: string;
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: null,
    expire_at: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<AuthState>) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
            state.expire_at = action.payload.expire_at;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
            state.expire_at = '';
        },
    },
});

export const { setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
