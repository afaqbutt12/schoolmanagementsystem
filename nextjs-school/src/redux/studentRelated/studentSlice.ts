import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StudentState {
  studentsList: any[];
  studentDetails: any;
  loading: boolean;
  error: any;
  response: string | null;
  statestatus: string;
}

const initialState: StudentState = {
  studentsList: [],
  studentDetails: null,
  loading: false,
  error: null,
  response: null,
  statestatus: 'idle',
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    doneSuccess: (state, action: PayloadAction<any>) => {
      state.studentDetails = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getSuccess: (state, action: PayloadAction<any[]>) => {
      state.studentsList = action.payload;
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
    underStudentControl: (state) => {
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
  underStudentControl,
  stuffDone,
} = studentSlice.actions;

export default studentSlice.reducer;

