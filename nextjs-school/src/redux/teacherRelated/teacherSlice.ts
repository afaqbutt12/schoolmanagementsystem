import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TeacherState {
  teachersList: any[];
  teacherDetails: any;
  loading: boolean;
  error: any;
  response: string | null;
  statestatus: string;
}

const initialState: TeacherState = {
  teachersList: [],
  teacherDetails: null,
  loading: false,
  error: null,
  response: null,
  statestatus: 'idle',
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    doneSuccess: (state, action: PayloadAction<any>) => {
      state.teacherDetails = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getSuccess: (state, action: PayloadAction<any[]>) => {
      state.teachersList = action.payload;
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
    underTeacherControl: (state) => {
      state.loading = false;
      state.response = null;
      state.error = null;
      state.statestatus = 'idle';
    },
    stuffDone: (state) => {
      state.loading = false;
      state.error = null;
      state.response = null;
      state.statestatus = 'added';
    },
  },
});

export const {
  getRequest,
  doneSuccess,
  getSuccess,
  getFailed,
  getError,
  underTeacherControl,
  stuffDone,
} = teacherSlice.actions;

export default teacherSlice.reducer;

