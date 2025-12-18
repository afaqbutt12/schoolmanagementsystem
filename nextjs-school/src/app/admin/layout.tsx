'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  CssBaseline,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Button,
  Select,
  FormControl,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AppBar, Drawer } from '@/components/styles';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { logoutUser } from '@/redux/userRelated/userHandle';
import { styled } from '@mui/material/styles';

const loginPages = ['/admin/login', '/admin/register'];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState('EN');
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { currentUser, currentRole } = useAppSelector((state) => state.user);

  const isLoginPage = loginPages.includes(pathname || '');

  useEffect(() => {
    if (!isLoginPage && (!currentUser || currentRole !== 'Admin')) {
      router.push('/admin/login');
    }
  }, [currentUser, currentRole, router, isLoginPage]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/');
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // If it's login page, just render children without layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        open={open} 
        position="fixed" 
        sx={{ 
          backgroundColor: '#ffffff', 
          color: '#333', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ pr: '24px', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '24px',
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
                    <SearchIcon sx={{ color: '#999' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
           

            {/* User Info */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                cursor: 'pointer',
              }}
              onClick={handleProfileMenuOpen}
            >
              <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2, color: '#333' }}>
                  {currentUser?.name || 'Admin'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#999' }}>
                  Admin
                </Typography>
              </Box>
              <Avatar 
                sx={{ 
                  width: 36, 
                  height: 36, 
                  backgroundColor: '#4a90d9',
                  fontSize: 14,
                  fontWeight: 600
                }}
              >
                {currentUser?.name?.charAt(0) || 'A'}
              </Avatar>
            </Box>

            {/* Mail Icon */}
            <IconButton size="small">
              <Badge badgeContent={5} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, minWidth: 16, height: 16 } }}>
                <MailIcon sx={{ fontSize: 22, color: '#666' }} />
              </Badge>
            </IconButton>
            
            {/* Notification Icon */}
            <IconButton size="small">
              <Badge badgeContent={8} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, minWidth: 16, height: 16 } }}>
                <NotificationsIcon sx={{ fontSize: 22, color: '#666' }} />
              </Badge>
            </IconButton>

            {/* Language Selector */}
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                {language}
              </Typography>
              <KeyboardArrowDownIcon sx={{ fontSize: 18, color: '#666' }} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2">{currentUser?.name}</Typography>
          <Typography variant="caption" color="textSecondary">{currentUser?.email}</Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => router.push('/admin/profile')}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => router.push('/admin/settings')}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: '#f44336' }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: '#f44336' }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      
      <Drawer 
        variant="permanent" 
        open={open}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#2c2143',
          }
        }}
      >
        <AdminSidebar toggleDrawer={toggleDrawer} />
      </Drawer>
      
      <Box
        component="main"
        sx={{
          backgroundColor: '#f5f5f5',
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

const SearchTextField = styled(TextField)({
  width: '280px',
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fff',
    borderRadius: '25px',
    border: '1px solid #e0e0e0',
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
  '@media (max-width: 768px)': {
    width: '200px',
  },
  '@media (max-width: 480px)': {
    width: '140px',
  },
});
