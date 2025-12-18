'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Collapse,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import QuizIcon from '@mui/icons-material/Quiz';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MessageIcon from '@mui/icons-material/Message';
import MapIcon from '@mui/icons-material/Map';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FaceIcon from '@mui/icons-material/Face';

import { useAppDispatch } from '@/redux/hooks';
import { logoutUser } from '@/redux/userRelated/userHandle';

interface AdminSidebarProps {
  toggleDrawer: () => void;
}

interface MenuItem {
  icon: React.ReactNode;
  text: string;
  path: string;
  active: boolean;
}

const AdminSidebar = ({ toggleDrawer }: AdminSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Collapsible menu states
  const [adminOpen, setAdminOpen] = useState(true);
  const [studentsOpen, setStudentsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [parentsOpen, setParentsOpen] = useState(false);
  const [teachersOpen, setTeachersOpen] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/');
  };

  // Active color - coral/orange as in the design
  const activeColor = '#FF7043';
  const activeBgColor = '#FF7043';

  // Other menu items (non-collapsible)
  const otherMenuItems: MenuItem[] = [
    { icon: <ClassOutlinedIcon />, text: 'Class', path: '/admin/classes', active: pathname?.startsWith('/admin/classes') || false },
    { icon: <AssignmentIcon />, text: 'Subject', path: '/admin/subjects', active: pathname?.startsWith('/admin/subjects') || false },
    { icon: <ScheduleIcon />, text: 'Class Routine', path: '/admin/routine', active: pathname === '/admin/routine' },
    { icon: <EventAvailableIcon />, text: 'Attendance', path: '/admin/attendance', active: pathname === '/admin/attendance' },
    { icon: <QuizIcon />, text: 'Exam', path: '/admin/exam', active: pathname === '/admin/exam' },
    { icon: <AssessmentIcon />, text: 'Reports', path: '/admin/reports', active: pathname === '/admin/reports' },
    { icon: <DirectionsBusIcon />, text: 'Transport', path: '/admin/transport', active: pathname === '/admin/transport' },
    { icon: <HomeWorkIcon />, text: 'Hostel', path: '/admin/hostel', active: pathname === '/admin/hostel' },
    { icon: <AnnouncementOutlinedIcon />, text: 'Notice', path: '/admin/notices', active: pathname?.startsWith('/admin/notices') || false },
    { icon: <MessageIcon />, text: 'Message', path: '/admin/messages', active: pathname === '/admin/messages' },
    { icon: <MapIcon />, text: 'Map', path: '/admin/map', active: pathname === '/admin/map' },
  ];

  const renderMenuItem = (item: MenuItem, isSubItem = false) => (
    <ListItemButton
      key={item.text}
      component={Link}
      href={item.path}
      sx={{
        backgroundColor: item.active ? activeBgColor : 'transparent',
        borderRadius: '4px',
        py: 1,
        px: 2,
        mb: 0.5,
        ml: isSubItem ? 3 : 0,
        '&:hover': {
          backgroundColor: item.active ? activeBgColor : 'rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <ListItemIcon sx={{ color: 'white', minWidth: 35 }}>
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.text}
        sx={{
          color: 'white',
          '& .MuiListItemText-primary': {
            fontSize: '14px',
            fontWeight: item.active ? 500 : 400,
          },
        }}
      />
      <ChevronRightIcon sx={{ color: 'white', fontSize: 18, opacity: 0.7 }} />
    </ListItemButton>
  );

  const renderCollapsibleSection = (
    title: string,
    icon: React.ReactNode,
    isOpen: boolean,
    toggleFn: () => void,
    subItems: MenuItem[],
    pathPrefix: string
  ) => {
    const isActive = pathname?.startsWith(pathPrefix) || false;
    
    return (
      <Box sx={{ mb: 0.5 }}>
        <ListItemButton
          onClick={toggleFn}
          sx={{
            borderRadius: '4px',
            py: 1,
            px: 2,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: 35 }}>
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={title}
            sx={{
              color: 'white',
              '& .MuiListItemText-primary': { fontSize: '14px', fontWeight: 400 },
            }}
          />
          {isOpen ? (
            <ExpandLessIcon sx={{ color: 'white', fontSize: 20 }} />
          ) : (
            <ExpandMoreIcon sx={{ color: 'white', fontSize: 20 }} />
          )}
        </ListItemButton>

        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 1 }}>
            {subItems.map((item) => renderMenuItem(item, true))}
          </List>
        </Collapse>
      </Box>
    );
  };

  return (
    <SidebarWrapper>
      {/* Header Section */}
      <SidebarHeader>
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'rgba(255,255,255,0.5)', 
            fontSize: '11px', 
            mb: 0.5, 
            display: 'block',
            letterSpacing: '0.5px'
          }}
        >
          envato market
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: '#F5C518', 
            px: 1.5, 
            py: 0.5, 
            borderRadius: '6px' 
          }}>
            <SchoolIcon sx={{ color: 'white', mr: 0.5, fontSize: 20 }} />
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>
              AKKHOR
            </Typography>
          </Box>
          <IconButton sx={{ color: 'white', p: 0.5 }} onClick={toggleDrawer}>
            <MenuIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </SidebarHeader>

      {/* Navigation Menu */}
      <List sx={{ px: 1, pt: 2 }}>
        {/* Profile */}
        {renderMenuItem({ 
          icon: <FaceIcon />, 
          text: 'Profile', 
          path: '/admin/profile', 
          active: pathname === '/admin/profile' 
        })}

        {/* Admin Section */}
        {renderCollapsibleSection(
          'Admin', 
          <AdminPanelSettingsIcon />, 
          adminOpen, 
          () => setAdminOpen(!adminOpen), 
          [
            { 
              icon: <HomeIcon />, 
              text: 'Dashboard', 
              path: '/admin/dashboard', 
              active: pathname === '/admin/dashboard' 
            },
          ],
          '/admin/dashboard'
        )}

        {/* Account Section */}
        {renderCollapsibleSection(
          'Account', 
          <AccountCircleOutlinedIcon />, 
          accountOpen, 
          () => setAccountOpen(!accountOpen), 
          [
            { icon: <PersonOutlineIcon />, text: 'Fees Collection', path: '/admin/account/fees', active: pathname === '/admin/account/fees' },
            { icon: <PersonOutlineIcon />, text: 'Add Fees', path: '/admin/account/fees/add', active: pathname === '/admin/account/fees/add' },
            { icon: <PersonOutlineIcon />, text: 'Expenses', path: '/admin/account/expenses', active: pathname === '/admin/account/expenses' },
            { icon: <PersonOutlineIcon />, text: 'Add Expenses', path: '/admin/account/expenses/add', active: pathname === '/admin/account/expenses/add' },
          ],
          '/admin/account'
        )}

        {/* Parents Section */}
        {renderCollapsibleSection(
          'Parents', 
          <GroupIcon />, 
          parentsOpen, 
          () => setParentsOpen(!parentsOpen), 
          [
            { icon: <GroupIcon />, text: 'All Parents', path: '/admin/parents', active: pathname === '/admin/parents' },
            { icon: <GroupIcon />, text: 'Add Parent', path: '/admin/parents/add', active: pathname === '/admin/parents/add' },
          ],
          '/admin/parents'
        )}

        {/* Teachers Section */}
        {renderCollapsibleSection(
          'Teachers', 
          <SupervisorAccountOutlinedIcon />, 
          teachersOpen, 
          () => setTeachersOpen(!teachersOpen), 
          [
            { icon: <SupervisorAccountOutlinedIcon />, text: 'All Teachers', path: '/admin/teachers', active: pathname === '/admin/teachers' },
            { icon: <SupervisorAccountOutlinedIcon />, text: 'Add Teacher', path: '/admin/teachers/add', active: pathname === '/admin/teachers/add' },
            { icon: <SupervisorAccountOutlinedIcon />, text: 'Payment', path: '/admin/teachers/payment', active: pathname === '/admin/teachers/payment' },
          ],
          '/admin/teachers'
        )}

        {/* Library Section */}
        {renderCollapsibleSection(
          'Library', 
          <MenuBookIcon />, 
          libraryOpen, 
          () => setLibraryOpen(!libraryOpen), 
          [
            { icon: <MenuBookIcon />, text: 'All Books', path: '/admin/library/books', active: pathname === '/admin/library/books' },
            { icon: <MenuBookIcon />, text: 'Add Book', path: '/admin/library/books/add', active: pathname === '/admin/library/books/add' },
          ],
          '/admin/library'
        )}

        {/* Other Menu Items */}
        {otherMenuItems.map((item) => renderMenuItem(item))}
      </List>
    </SidebarWrapper>
  );
};

export default AdminSidebar;

const SidebarWrapper = styled(Box)({
  height: '100%',
  padding: '16px 8px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '4px',
  },
});

const SidebarHeader = styled(Box)({
  padding: '0 8px',
  marginBottom: '8px',
});
