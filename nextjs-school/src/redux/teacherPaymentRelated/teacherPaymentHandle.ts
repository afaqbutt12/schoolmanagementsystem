import { AppDispatch } from '../store';
import {
  getRequest,
  getSuccess,
  getDetailsSuccess,
  getFailed,
  getError,
} from './teacherPaymentSlice';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export const getAllTeacherPayments = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/teacher-payments/school/${id}`);
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

export const getTeacherPaymentDetails = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/teacher-payment/${id}`);
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

