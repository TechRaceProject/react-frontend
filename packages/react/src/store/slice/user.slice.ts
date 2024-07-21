import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: number;
    pp: string;
    email: string;
    username: string;
    created_at: string;
    updated_at: string;
}

const initialState: UserState = {
    id: 0,
    pp: 'https://static1.squarespace.com/static/656f4e4dababbd7c042c4946/657236350931ee4538eea52c/65baf15103d8ad2826032a8a/1707422532886/how-to-stop-being-a-people-pleaser-1_1.jpg?format=1500w',
    email: '',
    username: '',
    created_at: '',
    updated_at: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserState: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            state.pp = action.payload.pp;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.created_at = action.payload.created_at;
            state.updated_at = action.payload.updated_at;
        },
    },
});

export const { setUserState } = userSlice.actions;
export default userSlice.reducer;
