'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Grid,
  Box,
  Typography,
  Paper,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loginUser } from '@/redux/userRelated/userHandle';
import { LightPurpleButton } from '@/components/buttonStyles';
import Popup from '@/components/Popup';

const StudentLoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, currentUser, response, error, currentRole } = useAppSelector((state) => state.user);

  const [toggle, setToggle] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const rollNum = data.get('rollNumber') as string;
    const studentName = data.get('studentName') as string;
    const password = data.get('password') as string;

    if (!rollNum || !studentName || !password) {
      setMessage('All fields are required');
      setShowPopup(true);
      return;
    }

    const fields = { rollNum, studentName, password };
    setLoader(true);
    dispatch(loginUser(fields, 'Student'));
  };

  const guestModeHandler = () => {
    const rollNum = '1';
    const studentName = 'Dipesh Awasthi';
    const password = 'zxc';
    const fields = { rollNum, studentName, password };
    setGuestLoader(true);
    dispatch(loginUser(fields, 'Student'));
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Student') {
        router.push('/student/dashboard');
      }
    } else if (status === 'failed') {
      setMessage(response || 'Login failed');
      setShowPopup(true);
      setLoader(false);
      setGuestLoader(false);
    } else if (status === 'error') {
      setMessage('Network Error');
      setShowPopup(true);
      setLoader(false);
      setGuestLoader(false);
    }
  }, [status, currentRole, router, error, response, currentUser]);

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, color: '#2c2143' }}>
            Student Login
          </Typography>
          <Typography variant="body1">
            Welcome back! Please enter your details
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="rollNumber"
              label="Enter your Roll Number"
              name="rollNumber"
              type="number"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="studentName"
              label="Enter your name"
              name="studentName"
              autoComplete="name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={toggle ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setToggle(!toggle)}>
                      {toggle ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LightPurpleButton type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              {loader ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </LightPurpleButton>
            <Button
              fullWidth
              onClick={guestModeHandler}
              variant="outlined"
              sx={{ mt: 2, mb: 3, color: '#7f56da', borderColor: '#7f56da' }}
            >
              Login as Guest
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ textAlign: 'center', color: 'white', p: 4 }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
            Student Portal
          </Typography>
          <Typography variant="h6">
            Access your courses, assignments, and track your progress
          </Typography>
        </Box>
      </Grid>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={guestLoader}>
        <CircularProgress color="primary" />
        <Typography sx={{ ml: 2 }}>Please Wait</Typography>
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Grid>
  );
};

export default StudentLoginPage;

