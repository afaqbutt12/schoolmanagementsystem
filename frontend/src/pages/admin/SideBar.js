import * as React from 'react';
import { 
    Divider, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    ListSubheader,
    Box,
    Typography,
    IconButton,
    List,
    Collapse
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import QuizIcon from '@mui/icons-material/Quiz';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MessageIcon from '@mui/icons-material/Message';
import PaletteIcon from '@mui/icons-material/Palette';
import MapIcon from '@mui/icons-material/Map';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';

const SideBar = ({ toggleDrawer }) => {
    const location = useLocation();
    const [adminOpen, setAdminOpen] = React.useState(true);
    const [accountOpen, setAccountOpen] = React.useState(false);
    const [libraryOpen, setLibraryOpen] = React.useState(false);
    const [parentsOpen, setParentsOpen] = React.useState(false);
    const [teachersOpen, setTeachersOpen] = React.useState(location.pathname.startsWith("/Admin/teachers"));
    
    const handleAdminToggle = () => {
        setAdminOpen(!adminOpen);
    };

    const handleAccountToggle = () => {
        setAccountOpen(!accountOpen);
    };

    const handleLibraryToggle = () => {
        setLibraryOpen(!libraryOpen);
    };

    const handleParentsToggle = () => {
        setParentsOpen(!parentsOpen);
    };

    const handleTeachersToggle = () => {
        setTeachersOpen(!teachersOpen);
    };

    // Main navigation items
    const mainMenuItems = [
        { icon: <AdminPanelSettingsIcon />, text: "Profile", path: "/Admin/profile", active: location.pathname.startsWith("/Admin/profile") },
    ];

    // Admin submenu items
    const adminSubItems = [
        { icon: <HomeIcon />, text: "Dasboard", path: "/Admin/dashboard", active: location.pathname.startsWith("/Admin/dashboard") },
        // { icon: <PersonOutlineIcon />, text: "Students", path: "/Admin/students", active: location.pathname.startsWith("/Admin/students") },
        // { icon: <GroupIcon />, text: "Parents", path: "/Admin/parents", active: location.pathname.startsWith("/Admin/parents") },
    ];

    // Account submenu items
    const accountSubItems = [
        { icon: <PaymentIcon />, text: "Fees ", path: "/Admin/account/fees-collection", active: location.pathname.startsWith("/Admin/account/fees-collection") },
        { icon: <ReceiptIcon />, text: "Add Fees ", path: "/Admin/account/add-fees", active: location.pathname.startsWith("/Admin/account/add-fees") },
        { icon: <AccountBalanceIcon />, text: "Expenses", path: "/Admin/account/expenses", active: location.pathname.startsWith("/Admin/account/expenses") },
        { icon: <ReceiptIcon />, text: "Add Expenses", path: "/Admin/account/add-expenses", active: location.pathname.startsWith("/Admin/account/add-expenses") },
    ];

    // Library submenu items
    const librarySubItems = [
        { icon: <LibraryBooksIcon />, text: "All Book", path: "/Admin/library/books", active: location.pathname.startsWith("/Admin/library/books") },
        { icon: <BookIcon />, text: "Add New Book", path: "/Admin/library/add-book", active: location.pathname.startsWith("/Admin/library/add-book") },
    ];

    // Teachers submenu items
    const teachersSubItems = [
        { icon: <SupervisorAccountOutlinedIcon />, text: "All Teachers", path: "/Admin/teachers", active: location.pathname === "/Admin/teachers" || (location.pathname.startsWith("/Admin/teachers") && !location.pathname.includes("/payment") && !location.pathname.includes("/add") && !location.pathname.includes("/teacher/") && !location.pathname.includes("/choose")) },
        { icon: <PersonIcon />, text: "Teacher Details", path: "/Admin/teachers/details", active: location.pathname.startsWith("/Admin/teachers/teacher") },
        { icon: <PersonIcon />, text: "Add Teacher", path: "/Admin/teachers/add", active: location.pathname.startsWith("/Admin/teachers/add") },
        { icon: <PaymentIcon />, text: "Payment", path: "/Admin/teachers/payment", active: location.pathname.startsWith("/Admin/teachers/payment") },
    ];

    // Parents submenu items
    const parentsSubItems = [
        { icon: <GroupIcon />, text: "All Parents", path: "/Admin/parents/all", active: location.pathname.startsWith("/Admin/parents/all") },
        { icon: <PersonIcon />, text: "Parents Details", path: "/Admin/parents/details", active: location.pathname.startsWith("/Admin/parents/details") },
        { icon: <PersonIcon />, text: "Add Parent", path: "/Admin/parents/add", active: location.pathname.startsWith("/Admin/parents/add") },
    ];

    // Other navigation items
    const otherMenuItems = [
        // { icon: <PersonOutlineIcon />, text: "Students", path: "/Admin/students", active: location.pathname.startsWith("/Admin/students") },
        // { icon: <SupervisorAccountOutlinedIcon />, text: "Teachers", path: "/Admin/teachers", active: location.pathname.startsWith("/Admin/teachers") },
        // { icon: <AccountCircleOutlinedIcon />, text: "Account", path: "/Admin/profile", active: location.pathname.startsWith("/Admin/profile") },
        { icon: <ClassOutlinedIcon />, text: "Class", path: "/Admin/classes", active: location.pathname.startsWith("/Admin/classes") },
        { icon: <AssignmentIcon />, text: "Subject", path: "/Admin/subjects", active: location.pathname.startsWith("/Admin/subjects") },
        { icon: <ScheduleIcon />, text: "Class Routine", path: "/Admin/routine", active: location.pathname.startsWith("/Admin/routine") },
        { icon: <EventAvailableIcon />, text: "Attendance", path: "/Admin/attendance", active: location.pathname.startsWith("/Admin/attendance") },
        { icon: <QuizIcon />, text: "Exam", path: "/Admin/exam", active: location.pathname.startsWith("/Admin/exam") },
        { icon: <AssessmentIcon />, text: "Reports", path: "/Admin/reports", active: location.pathname.startsWith("/Admin/reports") },
        { icon: <DirectionsBusIcon />, text: "Transport", path: "/Admin/transport", active: location.pathname.startsWith("/Admin/transport") },
        { icon: <HomeWorkIcon />, text: "Hostel", path: "/Admin/hostel", active: location.pathname.startsWith("/Admin/hostel") },
        { icon: <AnnouncementOutlinedIcon />, text: "Notice", path: "/Admin/notices", active: location.pathname.startsWith("/Admin/notices") },
        { icon: <MessageIcon />, text: "Message", path: "/Admin/messages", active: location.pathname.startsWith("/Admin/messages") },
        { icon: <PaletteIcon />, text: "UI Elements", path: "/Admin/ui-elements", active: location.pathname.startsWith("/Admin/ui-elements") },
        { icon: <MapIcon />, text: "Map", path: "/Admin/map", active: location.pathname.startsWith("/Admin/map") },
    ];

    const renderMenuItem = (item, index, isSubItem = false) => (
        <MenuItemWrapper key={index} isSubItem={isSubItem}>
            <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                    backgroundColor: item.active ? '#FFD700' : 'transparent',
                    borderRadius: 0,
                    py: 1.2,
                    px: isSubItem ? 4 : 2,
                    mb: 0.5,
                    ml: isSubItem ? 2 : 0,
                    '&:hover': {
                        backgroundColor: item.active ? '#FFD700' : 'rgba(255, 255, 255, 0.1)',
                    },
                    '&.Mui-selected': {
                        backgroundColor: '#FFD700',
                        '&:hover': {
                            backgroundColor: '#FFD700',
                        }
                    }
                }}
            >
                <ListItemIcon sx={{ color: 'white', minWidth: 35, mr: 1 }}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText 
                    primary={item.text} 
                    sx={{ 
                        color: 'white',
                        '& .MuiListItemText-primary': {
                            fontSize: '14px',
                            fontWeight: item.active ? 600 : 400
                        }
                    }}
                />
                <ChevronRightIcon sx={{ color: 'white', fontSize: 16, ml: 'auto' }} />
            </ListItemButton>
        </MenuItemWrapper>
    );

    return (
        <SidebarWrapper>
            {/* Header Section */}
            <SidebarHeader>
                <Typography variant="body2" sx={{ color: 'white', fontSize: '12px', mb: 1, fontWeight: 300 }}>
                    envato market
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFD700', px: 1.5, py: 0.8, borderRadius: 1 }}>
                        <SchoolIcon sx={{ color: 'white', mr: 1, fontSize: 20 }} />
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
                            AKKHOR
                        </Typography>
                    </Box>
                    <IconButton sx={{ color: 'white', p: 0.5 }} onClick={toggleDrawer}>
                        <MenuIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </Box>
            </SidebarHeader>

            {/* Navigation Menu */}
            <List sx={{ px: 0 }}>
                {/* Dashboard */}
                {mainMenuItems.map((item, index) => renderMenuItem(item, index))}
                
                {/* Admin Section */}
                <MenuItemWrapper>
                    <ListItemButton
                        onClick={handleAdminToggle}
                        sx={{
                            borderRadius: 0,
                            py: 1.2,
                            px: 2,
                            mb: 0.5,
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: 'white', minWidth: 35, mr: 1 }}>
                            <AdminPanelSettingsIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Admin" 
                            sx={{ 
                                color: 'white',
                                '& .MuiListItemText-primary': {
                                    fontSize: '14px',
                                    fontWeight: 600
                                }
                            }}
                        />
                        {adminOpen ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />}
                    </ListItemButton>
                    
                    <Collapse in={adminOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {adminSubItems.map((item, index) => renderMenuItem(item, index, true))}
                        </List>
                    </Collapse>
                </MenuItemWrapper>

                {/* Account Section */}
                <MenuItemWrapper>
                    <ListItemButton
                        onClick={handleAccountToggle}
                        sx={{
                            backgroundColor: accountOpen || location.pathname.startsWith("/Admin/account") ? '#FFD700' : 'transparent',
                            borderRadius: 0,
                            py: 1.2,
                            px: 2,
                            mb: 0.5,
                            '&:hover': {
                                backgroundColor: accountOpen || location.pathname.startsWith("/Admin/account") ? '#FFD700' : 'rgba(255, 255, 255, 0.1)',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: 'white', minWidth: 35, mr: 1 }}>
                            <AccountCircleOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Account" 
                            sx={{ 
                                color: 'white',
                                '& .MuiListItemText-primary': {
                                    fontSize: '14px',
                                    fontWeight: 600
                                }
                            }}
                        />
                        {accountOpen ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />}
                    </ListItemButton>
                    
                    <Collapse in={accountOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {accountSubItems.map((item, index) => renderMenuItem(item, index, true))}
                        </List>
                    </Collapse>
                </MenuItemWrapper>

                {/* Parents Section */}
                <MenuItemWrapper>
                    <ListItemButton
                        onClick={handleParentsToggle}
                        sx={{
                            backgroundColor: parentsOpen || location.pathname.startsWith("/Admin/parents") ? '#FFD700' : 'transparent',
                            borderRadius: 0,
                            py: 1.2,
                            px: 2,
                            mb: 0.5,
                            '&:hover': {
                                backgroundColor: parentsOpen || location.pathname.startsWith("/Admin/parents") ? '#FFD700' : 'rgba(255, 255, 255, 0.1)',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: 'white', minWidth: 35, mr: 1 }}>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Parents" 
                            sx={{ 
                                color: 'white',
                                '& .MuiListItemText-primary': {
                                    fontSize: '14px',
                                    fontWeight: 600
                                }
                            }}
                        />
                        {parentsOpen ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />}
                    </ListItemButton>
                    
                    <Collapse in={parentsOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {parentsSubItems.map((item, index) => renderMenuItem(item, index, true))}
                        </List>
                    </Collapse>
                </MenuItemWrapper>

                {/* Teachers Section */}
                <MenuItemWrapper>
                    <ListItemButton
                        onClick={handleTeachersToggle}
                        sx={{
                            backgroundColor: teachersOpen || location.pathname.startsWith("/Admin/teachers") ? '#FFD700' : 'transparent',
                            borderRadius: 0,
                            py: 1.2,
                            px: 2,
                            mb: 0.5,
                            '&:hover': {
                                backgroundColor: teachersOpen || location.pathname.startsWith("/Admin/teachers") ? '#FFD700' : 'rgba(255, 255, 255, 0.1)',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: 'white', minWidth: 35, mr: 1 }}>
                            <SupervisorAccountOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Teachers" 
                            sx={{ 
                                color: 'white',
                                '& .MuiListItemText-primary': {
                                    fontSize: '14px',
                                    fontWeight: 600
                                }
                            }}
                        />
                        {teachersOpen ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />}
                    </ListItemButton>
                    
                    <Collapse in={teachersOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {teachersSubItems.map((item, index) => renderMenuItem(item, index, true))}
                        </List>
                    </Collapse>
                </MenuItemWrapper>

                {/* Library Section */}
                <MenuItemWrapper>
                    <ListItemButton
                        onClick={handleLibraryToggle}
                        sx={{
                            backgroundColor: libraryOpen || location.pathname.startsWith("/Admin/library") ? '#FFD700' : 'transparent',
                            borderRadius: 0,
                            py: 1.2,
                            px: 2,
                            mb: 0.5,
                            '&:hover': {
                                backgroundColor: libraryOpen || location.pathname.startsWith("/Admin/library") ? '#FFD700' : 'rgba(255, 255, 255, 0.1)',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: 'white', minWidth: 35, mr: 1 }}>
                            <MenuBookIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Library" 
                            sx={{ 
                                color: 'white',
                                '& .MuiListItemText-primary': {
                                    fontSize: '14px',
                                    fontWeight: 600
                                }
                            }}
                        />
                        {libraryOpen ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />}
                    </ListItemButton>
                    
                    <Collapse in={libraryOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {librarySubItems.map((item, index) => renderMenuItem(item, index, true))}
                        </List>
                    </Collapse>
                </MenuItemWrapper>

                {/* Other Menu Items */}
                {otherMenuItems.map((item, index) => renderMenuItem(item, index))}
            </List>
        </SidebarWrapper>
    )
}

const SidebarWrapper = styled(Box)`
    height: 100%;
    padding: 20px 16px;
    overflow-y: auto;
`;

const SidebarHeader = styled(Box)`
    margin-bottom: 20px;
`;

const MenuItemWrapper = styled(Box)`
    margin-bottom: 4px;
    
    ${props => props.isSubItem && `
        margin-left: 16px;
    `}
`;

export default SideBar
