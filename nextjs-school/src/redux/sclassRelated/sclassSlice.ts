import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SclassState {
  sclassesList: any[];
  sclassStudents: any[];
  sclassDetails: any;
  subjectsList: any[];
  subjectDetails: any;
  loading: boolean;
  subloading: boolean;
  error: any;
  response: string | null;
  getresponse: string | null;
}

const initialState: SclassState = {
  sclassesList: [],
  sclassStudents: [],
  sclassDetails: null,
  subjectsList: [],
  subjectDetails: null,
  loading: false,
  subloading: false,
  error: null,
  response: null,
  getresponse: null,
};

const sclassSlice = createSlice({
  name: 'sclass',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getSubDetailsRequest: (state) => {
      state.subloading = true;
    },
    getSuccess: (state, action: PayloadAction<any[]>) => {
      state.sclassesList = action.payload;
      state.loading = false;
      state.error = null;
      state.getresponse = null;
    },
    getStudentsSuccess: (state, action: PayloadAction<any[]>) => {
      state.sclassStudents = action.payload;
      state.loading = false;
      state.error = null;
      state.getresponse = null;
    },
    getSubjectsSuccess: (state, action: PayloadAction<any[]>) => {
      state.subjectsList = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getFailed: (state, action: PayloadAction<string>) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    },
    getFailedTwo: (state, action: PayloadAction<string>) => {
      state.getresponse = action.payload;
      state.loading = false;
      state.error = null;
    },
    getError: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getDetailsSuccess: (state, action: PayloadAction<any>) => {
      state.sclassDetails = action.payload;
      state.loading = false;
      state.error = null;
    },
    getSubDetailsSuccess: (state, action: PayloadAction<any>) => {
      state.subjectDetails = action.payload;
      state.subloading = false;
      state.error = null;
    },
    resetSubjects: (state) => {
      state.subjectsList = [];
      state.sclassesList = [];
    },
  },
});

export const {
  getRequest,
  getSubDetailsRequest,
  getSuccess,
  getStudentsSuccess,
  getSubjectsSuccess,
  getFailed,
  getFailedTwo,
  getError,
  getDetailsSuccess,
  getSubDetailsSuccess,
  resetSubjects,
} = sclassSlice.actions;

export default sclassSlice.reducer;

