import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expensesList: [],
    expenseDetails: null,
    loading: false,
    error: null,
    response: null,
    getMsg: null
};

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.loading = false;
            state.expensesList = action.payload;
            state.expenseDetails = action.payload[0] || null;
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
        clearExpense: (state) => {
            state.expensesList = [];
            state.expenseDetails = null;
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
    clearExpense
} = expenseSlice.actions;

export default expenseSlice.reducer;
