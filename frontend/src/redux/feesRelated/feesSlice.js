import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    feesList: [],
    feeDetails: null,
    feesDetails: null, // Alias for consistency
    loading: false,
    error: null,
    response: null,
    getMsg: null
};

const feesSlice = createSlice({
    name: 'fees',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.loading = false;
            // Check if payload is an array or single object
            if (Array.isArray(action.payload)) {
                // Array response (from getAllFees)
                state.feesList = action.payload;
                state.feeDetails = action.payload[0] || null;
                state.feesDetails = action.payload[0] || null;
            } else {
                // Single object response (from getFeeDetail)
                state.feeDetails = action.payload;
                state.feesDetails = action.payload;
                state.feesList = [];
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
        clearFees: (state) => {
            state.feesList = [];
            state.feeDetails = null;
            state.feesDetails = null; // Also clear this
            state.loading = false;
            state.error = null;
            state.response = null; // Clear response too
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
    clearFees
} = feesSlice.actions;

export default feesSlice.reducer;
