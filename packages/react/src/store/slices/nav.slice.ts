import { createSlice } from '@reduxjs/toolkit';
import { NavState } from '~/interfaces/store/nav.interface';

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
