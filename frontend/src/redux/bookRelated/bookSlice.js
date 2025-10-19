import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    booksList: [],
    bookDetails: null,
    loading: false,
    error: null,
    response: null,
    getMsg: null
};

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.loading = false;
            if (Array.isArray(action.payload)) {
                state.booksList = action.payload;
                state.bookDetails = action.payload[0] || null;
            } else {
                state.bookDetails = action.payload;
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
        clearBook: (state) => {
            state.booksList = [];
            state.bookDetails = null;
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
    clearBook
} = bookSlice.actions;

export default bookSlice.reducer;
