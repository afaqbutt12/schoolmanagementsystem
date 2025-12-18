import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NoticeState {
  noticesList: any[];
  loading: boolean;
  error: any;
  response: string | null;
}

const initialState: NoticeState = {
  noticesList: [],
  loading: false,
  error: null,
  response: null,
};

const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getSuccess: (state, action: PayloadAction<any[]>) => {
      state.noticesList = action.payload;
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
  getFailed,
  getError,
} = noticeSlice.actions;

export default noticeSlice.reducer;

