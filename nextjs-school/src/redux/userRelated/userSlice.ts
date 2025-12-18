import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserDetails {
  _id: string;
  name: string;
  email?: string;
  role: string;
  schoolName?: string;
  rollNum?: number;
  [key: string]: any;
}

interface UserState {
  status: 'idle' | 'loading' | 'success' | 'failed' | 'error' | 'added';
  userDetails: any;
  tempDetails: any;
  loading: boolean;
  currentUser: UserDetails | null;
  currentRole: string | null;
  error: any;
  response: string | null;
  darkMode: boolean;
}

const getInitialUser = (): UserDetails | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const getInitialRole = (): string | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user)?.role || null : null;
  }
  return null;
};

const initialState: UserState = {
  status: 'idle',
  userDetails: [],
  tempDetails: [],
  loading: false,
  currentUser: null,
  currentRole: null,
  error: null,
  response: null,
  darkMode: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeUser: (state) => {
      if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          state.currentUser = parsedUser;
          state.currentRole = parsedUser?.role || null;
        }
      }
    },
    authRequest: (state) => {
      state.status = 'loading';
    },
    underControl: (state) => {
      state.status = 'idle';
      state.response = null;
    },
    stuffAdded: (state, action: PayloadAction<any>) => {
      state.status = 'added';
      state.response = null;
      state.error = null;
      state.tempDetails = action.payload;
    },
    authSuccess: (state, action: PayloadAction<UserDetails>) => {
      state.status = 'success';
      state.currentUser = action.payload;
      state.currentRole = action.payload.role;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
      state.response = null;
      state.error = null;
    },
    authFailed: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.response = action.payload;
    },
    authError: (state, action: PayloadAction<any>) => {
      state.status = 'error';
      state.error = action.payload;
    },
    authLogout: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
      state.currentUser = null;
      state.status = 'idle';
      state.error = null;
      state.currentRole = null;
    },
    doneSuccess: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getDeleteSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getRequest: (state) => {
      state.loading = true;
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
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const {
  initializeUser,
  authRequest,
  underControl,
  stuffAdded,
  authSuccess,
  authFailed,
  authError,
  authLogout,
  doneSuccess,
  getDeleteSuccess,
  getRequest,
  getFailed,
  getError,
  toggleDarkMode,
} = userSlice.actions;

export default userSlice.reducer;

