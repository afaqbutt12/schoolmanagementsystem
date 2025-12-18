import { AppDispatch } from '../store';
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
} from './complainSlice';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export const getAllComplains = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/complains/school/${id}`);
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

export const addComplain = (fields: any) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/complain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
    
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

