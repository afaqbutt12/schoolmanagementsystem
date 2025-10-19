import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    TextField,
    InputAdornment,
    Badge,
    Avatar,
    Button,
    Select,
    MenuItem,
    FormControl,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppBar, Drawer } from '../../components/styles';
import Logout from '../Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';
import styled from 'styled-components';

import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';
import StudentRecordView from './studentRelated/StudentRecordView';
import StudentReports from './reports/StudentReports';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

import ShowSubjects from './subjectRelated/ShowSubjects';
import SubjectForm from './subjectRelated/SubjectForm';
import ViewSubject from './subjectRelated/ViewSubject';

import AddTeacher from './teacherRelated/AddTeacher';
import EditTeacher from './teacherRelated/EditTeacher';
import ChooseClass from './teacherRelated/ChooseClass';
import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';

import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';
import AccountMenu from '../../components/AccountMenu';

// Account Related Imports
import FeesCollection from './accountRelated/FeesCollection';
import AddFeesCollection from './accountRelated/AddFeesCollection';
import EditFees from './accountRelated/EditFees';
import Expenses from './accountRelated/Expenses';
import AddExpenses from './accountRelated/AddExpenses';
import EditExpense from './accountRelated/EditExpense';

// Library Related Imports
import AllBooks from './libraryRelated/AllBooks';
import AddNewBook from './libraryRelated/AddNewBook';
import EditBook from './libraryRelated/EditBook';

// Parents Related Imports
import AllParents from './parentsRelated/AllParents';
import ParentDetails from './parentsRelated/ParentDetails';
import TeacherPayment from './teacherRelated/TeacherPayment';
import AddParent from './parentsRelated/AddParent';
import EditParent from './parentsRelated/EditParent';

const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState('EN');
    
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute' sx={{ backgroundColor: '#f5f5f5', color: 'black', boxShadow: 'none' }}>
                    <Toolbar sx={{ pr: '24px', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <SearchTextField
                                placeholder="Find Something..."
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <BuyNowButton variant="contained" color="success" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                Buy now
                            </BuyNowButton>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>Stevne Zone</Typography>
                                <Typography variant="body2" sx={{ color: 'gray', display: { xs: 'none', sm: 'block' } }}>Admin</Typography>
                                <Avatar sx={{ width: 32, height: 32, backgroundColor: '#1976d2' }}>
                                    A
                                </Avatar>
                            </Box>
                            
                            <Badge badgeContent={5} color="error">
                                <MailIcon />
                            </Badge>
                            
                            <Badge badgeContent={8} color="error">
                                <NotificationsIcon />
                            </Badge>
                            
                            <FormControl size="small" sx={{ minWidth: 60, display: { xs: 'none', sm: 'block' } }}>
                                <Select
                                    value={language}
                                    onChange={handleLanguageChange}
                                    IconComponent={KeyboardArrowDownIcon}
                                    sx={{ 
                                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                        '& .MuiSelect-icon': { color: 'black' }
                                    }}
                                >
                                    <MenuItem value="EN">EN</MenuItem>
                                    <MenuItem value="ES">ES</MenuItem>
                                    <MenuItem value="FR">FR</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Toolbar>
                </AppBar>
                
                <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <SideBar toggleDrawer={toggleDrawer} />
                </Drawer>
                
                <Box component="main" sx={styles.boxStyled}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<AdminHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                        <Route path="/Admin/profile" element={<AdminProfile />} />
                        <Route path="/Admin/complains" element={<SeeComplains />} />

                        {/* Notice */}
                        <Route path="/Admin/addnotice" element={<AddNotice />} />
                        <Route path="/Admin/notices" element={<ShowNotices />} />

                        {/* Subject */}
                        <Route path="/Admin/subjects" element={<ShowSubjects />} />
                        <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />

                        <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
                        <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />

                        <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                        {/* Class */}
                        <Route path="/Admin/addclass" element={<AddClass />} />
                        <Route path="/Admin/classes" element={<ShowClasses />} />
                        <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                        <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />

                        {/* Student */}
                        <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                        <Route path="/Admin/students" element={<StudentReports />} />
                        <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                        <Route path="/Admin/students/record/:id" element={<StudentRecordView />} />
                        <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                        <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

                        {/* Teacher */}
                        <Route path="/Admin/teachers" element={<ShowTeachers />} />
                        <Route path="/Admin/teachers/details" element={<TeacherDetails />} />
                        <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                        <Route path="/Admin/teachers/edit/:id" element={<EditTeacher />} />
                        <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                        <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                        <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                        <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />
                        <Route path="/Admin/teachers/add" element={<AddTeacher />} />
                        <Route path="/Admin/teachers/payment" element={<TeacherPayment />} />

                        {/* Additional Routes for New Menu Items */}
                        <Route path="/Admin/routine" element={<div>Class Routine - Coming Soon</div>} />
                        <Route path="/Admin/attendance" element={<div>Attendance Management - Coming Soon</div>} />
                        <Route path="/Admin/exam" element={<div>Exam Management - Coming Soon</div>} />
                        <Route path="/Admin/reports" element={<StudentReports />} />
                        <Route path="/Admin/transport" element={<div>Transport Management - Coming Soon</div>} />
                        <Route path="/Admin/hostel" element={<div>Hostel Management - Coming Soon</div>} />
                        <Route path="/Admin/messages" element={<div>Message Center - Coming Soon</div>} />
                        <Route path="/Admin/ui-elements" element={<div>UI Elements - Coming Soon</div>} />
                        <Route path="/Admin/map" element={<div>Map View - Coming Soon</div>} />

                        {/* Account Section Routes */}
                        <Route path="/Admin/account/fees-collection" element={<FeesCollection />} />
                        <Route path="/Admin/account/add-fees" element={<AddFeesCollection />} />
                        <Route path="/Admin/account/edit-fees/:id" element={<EditFees />} />
                        <Route path="/Admin/account/expenses" element={<Expenses />} />
                        <Route path="/Admin/account/add-expenses" element={<AddExpenses />} />
                        <Route path="/Admin/account/edit-expense/:id" element={<EditExpense />} />

                        {/* Library Section Routes */}
                        <Route path="/Admin/library/books" element={<AllBooks />} />
                        <Route path="/Admin/library/add-book" element={<AddNewBook />} />
                        <Route path="/Admin/library/edit/:id" element={<EditBook />} />

                        {/* Parents Section Routes */}
                        <Route path="/Admin/parents" element={<AllParents />} />
                        <Route path="/Admin/parents/all" element={<AllParents />} />
                        <Route path="/Admin/parents/details" element={<ParentDetails />} />
                        <Route path="/Admin/parents/add" element={<AddParent />} />
                        <Route path="/Admin/parents/edit/:id" element={<EditParent />} />
                        <Route path="/Profile/:id" element={<ParentDetails />} />

                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default AdminDashboard

const SearchTextField = styled(TextField)`
    width: 300px;
    & .MuiOutlinedInput-root {
        background-color: white;
        border-radius: 8px;
    }
    
    @media (max-width: 768px) {
        width: 200px;
    }
    
    @media (max-width: 480px) {
        width: 150px;
    }
`;

const BuyNowButton = styled(Button)`
    background-color: #4caf50 !important;
    color: white !important;
    text-transform: none !important;
    font-weight: 500 !important;
    padding: 8px 16px !important;
`;

const styles = {
    boxStyled: {
        backgroundColor: '#f8f9fa',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}