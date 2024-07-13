import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    id: number;
    email: string;
    created_at: string;
    updated_at: string;
}

const initialState: AuthState = {
    id: 0,
    email: '',
    created_at: '',
    updated_at: '',
};

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserState: (state, action: PayloadAction<AuthState>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.created_at = action.payload.created_at;
            state.updated_at = action.payload.updated_at;
        },
    },
});

export const { setUserState } = authSlice.actions;
export default authSlice.reducer;
