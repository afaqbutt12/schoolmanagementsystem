import { AppDispatch } from '../store';
import {
  getRequest,
  doneSuccess,
  getSuccess,
  getFailed,
  getError,
  stuffDone,
} from './studentSlice';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export const getAllStudents = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/students/school/${id}`);
    const result = await response.json();
    
    if (result.message) {
      dispatch(getFailed(result.message));
    } else {
      dispatch(getSuccess(result));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getStudentDetails = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/student/${id}`);
    const result = await response.json();
    
    if (result) {
      dispatch(doneSuccess(result));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const updateStudentFields = (id: string, fields: any, address: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/${address}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
    
    const result = await response.json();
    
    if (result.message) {
      dispatch(getFailed(result.message));
    } else {
      dispatch(stuffDone());
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const deleteStudent = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());
  dispatch(getFailed("Sorry the delete function has been disabled for now."));
};

