import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookState {
  booksList: any[];
  bookDetails: any;
  loading: boolean;
  error: any;
  response: string | null;
}

const initialState: BookState = {
  booksList: [],
  bookDetails: null,
  loading: false,
  error: null,
  response: null,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getSuccess: (state, action: PayloadAction<any[]>) => {
      state.booksList = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getDetailsSuccess: (state, action: PayloadAction<any>) => {
      state.bookDetails = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getFailed: (state, action: PayloadAction<string>) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    },
    getError: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getRequest,
  getSuccess,
  getDetailsSuccess,
  getFailed,
  getError,
} = bookSlice.actions;

export default bookSlice.reducer;

