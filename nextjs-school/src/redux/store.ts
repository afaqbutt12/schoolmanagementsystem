import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userRelated/userSlice';
import studentReducer from './studentRelated/studentSlice';
import teacherReducer from './teacherRelated/teacherSlice';
import noticeReducer from './noticeRelated/noticeSlice';
import complainReducer from './complainRelated/complainSlice';
import sclassReducer from './sclassRelated/sclassSlice';
import parentReducer from './parentRelated/parentSlice';
import bookReducer from './bookRelated/bookSlice';
import feesReducer from './feesRelated/feesSlice';
import expenseReducer from './expenseRelated/expenseSlice';
import teacherPaymentReducer from './teacherPaymentRelated/teacherPaymentSlice';

export const makeStore = () => {
  return configureStore({
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
      teacherPayment: teacherPaymentReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

