const router = require('express').Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const { adminRegister, adminLogIn, getAdminDetail} = require('../controllers/admin-controller.js');

const { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents } = require('../controllers/class-controller.js');
const { complainCreate, complainList } = require('../controllers/complain-controller.js');
const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('../controllers/notice-controller.js');
const {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance } = require('../controllers/student_controller.js');
const { subjectCreate, classSubjects, deleteSubjectsByClass, getSubjectDetail, deleteSubject, freeSubjectList, allSubjects, deleteSubjects } = require('../controllers/subject-controller.js');
const { teacherRegister, teacherLogIn, getTeachers, getTeacherDetail, deleteTeachers, deleteTeachersByClass, deleteTeacher, updateTeacherSubject, updateTeacher, teacherAttendance } = require('../controllers/teacher-controller.js');

// New controllers
const { parentCreate, getParents, getParentDetail, updateParent, deleteParent, deleteParents, addChildToParent, removeChildFromParent } = require('../controllers/parent-controller.js');
const { bookCreate, getBooks, getBookDetail, updateBook, deleteBook, deleteBooks, borrowBook, returnBook, getBooksByStatus, searchBooks } = require('../controllers/book-controller.js');
const { feeCreate, getFees, getFeeDetail, updateFee, deleteFee, deleteFees, markFeeAsPaid, getFeesByStatus, getFeesByStudent, getFeesByClass, searchFees, getFeeStatistics } = require('../controllers/fees-controller.js');
const { expenseCreate, getExpenses, getExpenseDetail, updateExpense, deleteExpense, deleteExpenses, markExpenseAsPaid, getExpensesByStatus, getExpensesByType, getExpensesByCategory, searchExpenses, getExpenseStatistics, approveExpense } = require('../controllers/expense-controller.js');
const { createTeacherPayment, getTeacherPayments, getTeacherPaymentDetail, updateTeacherPayment, deleteTeacherPayment, deleteTeacherPayments, markPaymentAsPaid, getPaymentsByStatus, getPaymentsByTeacher, getPaymentsByMonth, searchPayments, getPaymentStatistics } = require('../controllers/teacherPayment-controller.js');

// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);

router.get("/Admin/:id", getAdminDetail)
// router.delete("/Admin/:id", deleteAdmin)

// router.put("/Admin/:id", updateAdmin)

// Student

router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn)

router.get("/Students/:id", getStudents)
router.get("/Student/:id", getStudentDetail)

router.delete("/Students/:id", deleteStudents)
router.delete("/StudentsClass/:id", deleteStudentsByClass)
router.delete("/Student/:id", deleteStudent)

router.put("/Student/:id", updateStudent)

router.put('/UpdateExamResult/:id', updateExamResult)

router.put('/StudentAttendance/:id', studentAttendance)

router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);

router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance)

// Teacher

router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn)

router.get("/Teachers/:id", getTeachers)
router.get("/Teacher/:id", getTeacherDetail)

router.delete("/Teachers/:id", deleteTeachers)
router.delete("/TeachersClass/:id", deleteTeachersByClass)
router.delete("/Teacher/:id", deleteTeacher)

router.put("/TeacherSubject", updateTeacherSubject)

router.put("/Teacher/:id", updateTeacher)

router.post('/TeacherAttendance/:id', teacherAttendance)

// Notice

router.post('/NoticeCreate', noticeCreate);

router.get('/NoticeList/:id', noticeList);

router.delete("/Notices/:id", deleteNotices)
router.delete("/Notice/:id", deleteNotice)

router.put("/Notice/:id", updateNotice)

// Complain

router.post('/ComplainCreate', complainCreate);

router.get('/ComplainList/:id', complainList);

// Sclass

router.post('/SclassCreate', sclassCreate);

router.get('/SclassList/:id', sclassList);
router.get("/Sclass/:id", getSclassDetail)

router.get("/Sclass/Students/:id", getSclassStudents)

router.delete("/Sclasses/:id", deleteSclasses)
router.delete("/Sclass/:id", deleteSclass)

// Subject

router.post('/SubjectCreate', subjectCreate);

router.get('/AllSubjects/:id', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get("/Subject/:id", getSubjectDetail)

router.delete("/Subject/:id", deleteSubject)
router.delete("/Subjects/:id", deleteSubjects)
router.delete("/SubjectsClass/:id", deleteSubjectsByClass)

// Parent Routes
router.post('/ParentCreate', parentCreate);
router.get('/Parents/:id', getParents);
router.get('/Parent/:id', getParentDetail);
router.put('/Parent/:id', updateParent);
router.delete('/Parent/:id', deleteParent);
router.delete('/Parents/:id', deleteParents);
router.put('/Parent/:id/addChild', addChildToParent);
router.put('/Parent/:id/removeChild', removeChildFromParent);

// Book Routes
router.post('/BookCreate', bookCreate);
router.get('/Books/:id', getBooks);
router.get('/Book/:id', getBookDetail);
router.put('/Book/:id', updateBook);
router.delete('/Book/:id', deleteBook);
router.delete('/Books/:id', deleteBooks);
router.put('/Book/:id/borrow', borrowBook);
router.put('/Book/:id/return', returnBook);
router.get('/Books/:id/status/:status', getBooksByStatus);
router.get('/Books/:id/search', searchBooks);

// Fees Routes
router.post('/FeeCreate', feeCreate);
router.get('/Fees/:id', getFees);
router.get('/Fee/:id', getFeeDetail);
router.put('/Fee/:id', updateFee);
router.delete('/Fee/:id', deleteFee);
router.delete('/Fees/:id', deleteFees);
router.put('/Fee/:id/pay', markFeeAsPaid);
router.get('/Fees/:id/status/:status', getFeesByStatus);
router.get('/Fees/:id/student/:studentId', getFeesByStudent);
router.get('/Fees/:id/class/:className', getFeesByClass);
router.get('/Fees/:id/search', searchFees);
router.get('/Fees/:id/statistics', getFeeStatistics);

// Expense Routes
router.post('/ExpenseCreate', expenseCreate);
router.get('/Expenses/:id', getExpenses);
router.get('/Expense/:id', getExpenseDetail);
router.put('/Expense/:id', updateExpense);
router.delete('/Expense/:id', deleteExpense);
router.delete('/Expenses/:id', deleteExpenses);
router.put('/Expense/:id/pay', markExpenseAsPaid);
router.put('/Expense/:id/approve', approveExpense);
router.get('/Expenses/:id/status/:status', getExpensesByStatus);
router.get('/Expenses/:id/type/:type', getExpensesByType);
router.get('/Expenses/:id/category/:category', getExpensesByCategory);
router.get('/Expenses/:id/search', searchExpenses);
router.get('/Expenses/:id/statistics', getExpenseStatistics);

// Teacher Payment Routes
router.post('/TeacherPaymentCreate', createTeacherPayment);
router.get('/TeacherPayments/:id', getTeacherPayments);
router.get('/TeacherPayment/:id', getTeacherPaymentDetail);
router.put('/TeacherPayment/:id', updateTeacherPayment);
router.delete('/TeacherPayment/:id', deleteTeacherPayment);
router.delete('/TeacherPayments/:id', deleteTeacherPayments);
router.put('/TeacherPayment/:id/pay', markPaymentAsPaid);
router.get('/TeacherPayments/:id/status/:status', getPaymentsByStatus);
router.get('/TeacherPayments/:id/teacher/:teacherId', getPaymentsByTeacher);
router.get('/TeacherPayments/:id/month/:month/:year', getPaymentsByMonth);
router.get('/TeacherPayments/:id/search', searchPayments);
router.get('/TeacherPayments/:id/statistics', getPaymentStatistics);

module.exports = router;