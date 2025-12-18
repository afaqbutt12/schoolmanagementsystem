import { AppDispatch } from '../store';
import {
  getRequest,
  getSuccess,
  getDetailsSuccess,
  getFailed,
  getError,
} from './bookSlice';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export const getAllBooks = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/books/school/${id}`);
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

export const getBookDetails = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/book/${id}`);
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

