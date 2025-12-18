import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ParentState {
  parentsList: any[];
  parentDetails: any;
  loading: boolean;
  error: any;
  response: string | null;
}

const initialState: ParentState = {
  parentsList: [],
  parentDetails: null,
  loading: false,
  error: null,
  response: null,
};

const parentSlice = createSlice({
  name: 'parent',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getSuccess: (state, action: PayloadAction<any[]>) => {
      state.parentsList = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getDetailsSuccess: (state, action: PayloadAction<any>) => {
      state.parentDetails = action.payload;
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
} = parentSlice.actions;

export default parentSlice.reducer;

