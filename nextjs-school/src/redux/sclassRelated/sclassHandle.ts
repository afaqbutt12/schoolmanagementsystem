import { AppDispatch } from '../store';
import {
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
} from './sclassSlice';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export const getAllSclasses = (id: string, address: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/${address}/school/${id}`);
    const result = await response.json();
    
    if (result.message) {
      dispatch(getFailedTwo(result.message));
    } else {
      dispatch(getSuccess(result));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getClassStudents = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/students/school/${id}`);
    const result = await response.json();
    
    if (result.message) {
      dispatch(getFailedTwo(result.message));
    } else {
      dispatch(getStudentsSuccess(result));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getClassDetails = (id: string, address: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/${address}/${id}`);
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

export const getSubjectList = (id: string, address: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/${address}/class/${id}`);
    const result = await response.json();
    
    if (result.message) {
      dispatch(getFailed(result.message));
    } else {
      dispatch(getSubjectsSuccess(result));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getSubjectDetails = (id: string, address: string) => async (dispatch: AppDispatch) => {
  dispatch(getSubDetailsRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/${address}/${id}`);
    const result = await response.json();
    
    if (result.message) {
      dispatch(getFailed(result.message));
    } else {
      dispatch(getSubDetailsSuccess(result));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getFreeSubjectList = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getRequest());

  try {
    const response = await fetch(`${BASE_URL}/api/subjects/free/${id}`);
    const result = await response.json();
    
    if (result.message) {
      dispatch(getFailed(result.message));
    } else {
      dispatch(getSubjectsSuccess(result));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

