import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SectionState } from '~/interfaces/store/section.interface';

const initialState: SectionState = {
    activeSection: '',
    isModalOpen: false,
};

const sectionSlice = createSlice({
    name: 'section',
    initialState,
    reducers: {
        setActiveSection: (state, action: PayloadAction<string>) => {
            state.activeSection = action.payload;
        },
        openModal: (state) => {
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
    },
});

export const { setActiveSection, openModal, closeModal } = sectionSlice.actions;

export default sectionSlice.reducer;
