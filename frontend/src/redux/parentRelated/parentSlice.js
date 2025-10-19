import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    parentsList: [],
    parentDetails: null,
    loading: false,
    error: null,
    response: null,
    getMsg: null
};

const parentSlice = createSlice({
    name: 'parent',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.loading = false;
            if (Array.isArray(action.payload)) {
                state.parentsList = action.payload;
                state.parentDetails = action.payload[0] || null;
            } else {
                state.parentDetails = action.payload;
            }
            state.error = null;
        },
        getFailed: (state, action) => {
            state.loading = false;
            state.getMsg = action.payload;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        stuffDone: (state) => {
            state.loading = false;
            state.response = 'success';
            state.error = null;
        },
        clearParent: (state) => {
            state.parentsList = [];
            state.parentDetails = null;
            state.loading = false;
            state.error = null;
            state.getMsg = null;
        }
    }
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone,
    clearParent
} = parentSlice.actions;

export default parentSlice.reducer;
