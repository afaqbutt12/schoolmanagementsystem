import { AppDispatch } from '../store';
import {
  getRequest,
  doneSuccess,
  getSuccess,
  getFailed,
  getError,
  stuffDone,
} from './teacherSlice';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export const getAllTeachers = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/teachers/school/${id}`);
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

export const getTeacherDetails = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/teacher/${id}`);
    const result = await response.json();
    
    if (result) {
      dispatch(doneSuccess(result));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const updateTeacherFields = (id: string, fields: any) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/teacher/${id}`, {
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

export const deleteTeacher = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());
  dispatch(getFailed("Sorry the delete function has been disabled for now."));
};

