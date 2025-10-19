import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';
import parentReducer from './parentRelated/parentSlice';
import bookReducer from './bookRelated/bookSlice';
import feesReducer from './feesRelated/feesSlice';
import expenseReducer from './expenseRelated/expenseSlice';
import teacherPaymentReducer from './teacherPaymentRelated/teacherPaymentSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer,
        parent: parentReducer,
        book: bookReducer,
        fees: feesReducer,
        expense: expenseReducer,
        teacherPayment: teacherPaymentReducer
    },
});

export default store;
