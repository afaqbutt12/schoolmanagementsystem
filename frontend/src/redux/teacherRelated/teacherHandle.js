import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    postDone,
    doneSuccess
} from './teacherSlice';

export const getAllTeachers = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Teachers/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.response?.data?.message || error.message || 'Network error occurred'));
    }
}

export const getTeacherDetails = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Teacher/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.response?.data?.message || error.message || 'Network error occurred'));
    }
}

export const updateTeachSubject = (teacherId, teachSubject) => async (dispatch) => {
    dispatch(getRequest());

    try {
        await axios.put(`${process.env.REACT_APP_BASE_URL}/TeacherSubject`, { teacherId, teachSubject }, {
            headers: { 'Content-Type': 'application/json' },
        });
        dispatch(postDone());
    } catch (error) {
        dispatch(getError(error.response?.data?.message || error.message || 'Network error occurred'));
    }
}

export const deleteTeacher = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.delete(`${process.env.REACT_APP_BASE_URL}/Teacher/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(postDone());
        }
    } catch (error) {
        dispatch(getError(error.response?.data?.message || error.message || 'Network error occurred'));
    }
}

export const updateTeacher = (id, teacherData) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/Teacher/${id}`, teacherData);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(postDone());
        }
    } catch (error) {
        dispatch(getError(error.response?.data?.message || error.message || 'Network error occurred'));
    }
}

export const createTeacher = (teacherData) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/TeacherReg`, teacherData);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(postDone());
        }
    } catch (error) {
        dispatch(getError(error.response?.data?.message || error.message || 'Network error occurred'));
    }
}