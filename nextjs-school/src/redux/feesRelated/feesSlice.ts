import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeesState {
  feesList: any[];
  feeDetails: any;
  loading: boolean;
  error: any;
  response: string | null;
}

const initialState: FeesState = {
  feesList: [],
  feeDetails: null,
  loading: false,
  error: null,
  response: null,
};

const feesSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getSuccess: (state, action: PayloadAction<any[]>) => {
      state.feesList = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getDetailsSuccess: (state, action: PayloadAction<any>) => {
      state.feeDetails = action.payload;
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
} = feesSlice.actions;

export default feesSlice.reducer;

