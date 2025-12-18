import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExpenseState {
  expensesList: any[];
  expenseDetails: any;
  loading: boolean;
  error: any;
  response: string | null;
}

const initialState: ExpenseState = {
  expensesList: [],
  expenseDetails: null,
  loading: false,
  error: null,
  response: null,
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getSuccess: (state, action: PayloadAction<any[]>) => {
      state.expensesList = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getDetailsSuccess: (state, action: PayloadAction<any>) => {
      state.expenseDetails = action.payload;
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
} = expenseSlice.actions;

export default expenseSlice.reducer;

