import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TeacherPaymentState {
  paymentsList: any[];
  paymentDetails: any;
  loading: boolean;
  error: any;
  response: string | null;
}

const initialState: TeacherPaymentState = {
  paymentsList: [],
  paymentDetails: null,
  loading: false,
  error: null,
  response: null,
};

const teacherPaymentSlice = createSlice({
  name: 'teacherPayment',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getSuccess: (state, action: PayloadAction<any[]>) => {
      state.paymentsList = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getDetailsSuccess: (state, action: PayloadAction<any>) => {
      state.paymentDetails = action.payload;
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
} = teacherPaymentSlice.actions;

export default teacherPaymentSlice.reducer;

