import { AppDispatch } from '../store';
import {
  authRequest,
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
} from './userSlice';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export const loginUser = (fields: any, role: string) => async (dispatch: AppDispatch) => {
  dispatch(authRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/${role.toLowerCase()}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
    
    const result = await response.json();
    
    if (result.role) {
      dispatch(authSuccess(result));
    } else {
      dispatch(authFailed(result.message));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

export const registerUser = (fields: any, role: string) => async (dispatch: AppDispatch) => {
  dispatch(authRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/${role.toLowerCase()}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
    
    const result = await response.json();
    
    if (result.schoolName) {
      dispatch(authSuccess(result));
    } else if (result.school) {
      dispatch(stuffAdded(result));
    } else {
      dispatch(authFailed(result.message));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(authLogout());
};

export const getUserDetails = (id: string, address: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/${address}/${id}`);
    const result = await response.json();
    
    if (result) {
      dispatch(doneSuccess(result));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const deleteUser = (id: string, address: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());
  dispatch(getFailed("Sorry the delete function has been disabled for now."));
};

export const updateUser = (fields: any, id: string, address: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/${address}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
    
    const result = await response.json();
    
    if (result.schoolName) {
      dispatch(authSuccess(result));
    } else {
      dispatch(doneSuccess(result));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const addStuff = (fields: any, address: string) => async (dispatch: AppDispatch) => {
  dispatch(authRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/${address}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
    
    const result = await response.json();
    
    if (result.message) {
      dispatch(authFailed(result.message));
    } else {
      dispatch(stuffAdded(result));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

