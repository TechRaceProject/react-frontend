import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '~/interfaces/store/user.interface';

export const initialState: UserState = {
    id: 0,
    email: '',
    username: '',
    photo: '',
    created_at: '',
    updated_at: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserState: (state: UserState, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.username = action.payload.username || '';
            state.photo = action.payload.photo;
            state.created_at = action.payload.created_at;
            state.updated_at = action.payload.updated_at;
        },
        resetUserState: (state: UserState) => {
            state.id = 0;
            state.email = '';
            state.username = '';
            state.photo = '';
            state.created_at = '';
            state.updated_at = '';
        },
    },
});

export const { setUserState, resetUserState } = userSlice.actions;
export default userSlice.reducer;
