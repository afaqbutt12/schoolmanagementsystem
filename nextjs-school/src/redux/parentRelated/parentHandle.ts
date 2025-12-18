import { AppDispatch } from '../store';
import {
  getRequest,
  getSuccess,
  getDetailsSuccess,
  getFailed,
  getError,
} from './parentSlice';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export const getAllParents = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/parents/school/${id}`);
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

export const getParentDetails = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/parent/${id}`);
    const result = await response.json();
    
    if (result.message) {
      dispatch(getFailed(result.message));
    } else {
      dispatch(getDetailsSuccess(result));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

