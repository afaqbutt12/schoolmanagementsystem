import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    paymentsList: [],
    paymentDetails: null,
    loading: false,
    error: null,
    getMsg: null
};

const teacherPaymentSlice = createSlice({
    name: 'teacherPayment',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.loading = false;
            state.paymentsList = action.payload;
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
        },
        clearTeacherPayment: (state) => {
            state.paymentsList = [];
            state.paymentDetails = null;
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
    clearTeacherPayment
} = teacherPaymentSlice.actions;

export default teacherPaymentSlice.reducer;
