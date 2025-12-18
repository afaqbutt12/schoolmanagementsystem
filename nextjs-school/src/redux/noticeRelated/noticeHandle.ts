import { AppDispatch } from '../store';
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
} from './noticeSlice';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export const getAllNotices = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/notices/school/${id}`);
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

