import { createSlice } from '@reduxjs/toolkit';

interface NavState {
    isOpen: boolean;
}

const initialState: NavState = {
    isOpen: true,
};

const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        toggleNavState: (state: NavState) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { toggleNavState } = navSlice.actions;
export default navSlice.reducer;
