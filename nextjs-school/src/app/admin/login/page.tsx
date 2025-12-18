'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Button,
  Grid,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loginUser } from '@/redux/userRelated/userHandle';
import { LightPurpleButton } from '@/components/buttonStyles';
import Popup from '@/components/Popup';

const AdminLoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, currentUser, response, error, currentRole } = useAppSelector((state) => state.user);

  const [toggle, setToggle] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (!email || !password) {
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    const fields = { email, password };
    setLoader(true);
    dispatch(loginUser(fields, 'Admin'));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
  };

  const guestModeHandler = () => {
    const email = 'yogendra@12';
    const password = 'zxc';
    const fields = { email, password };
    setGuestLoader(true);
    dispatch(loginUser(fields, 'Admin'));
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        router.push('/admin/dashboard');
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
            Admin Login
          </Typography>
          <Typography variant="body1">
            Welcome back! Please enter your details
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter your email"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
              helperText={emailError && 'Email is required'}
              onChange={handleInputChange}
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
              error={passwordError}
              helperText={passwordError && 'Password is required'}
              onChange={handleInputChange}
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
            <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <StyledLink href="#">Forgot password?</StyledLink>
            </Grid>
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
            <Grid container>
              <Grid item>Don&apos;t have an account?</Grid>
              <Grid item sx={{ ml: 2 }}>
                <Link href="/admin/register" style={{ color: '#7f56da', textDecoration: 'none' }}>
                  Sign up
                </Link>
              </Grid>
            </Grid>
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
            School Management System
          </Typography>
          <Typography variant="h6">
            Manage your school efficiently with our comprehensive solution
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

export default AdminLoginPage;

const StyledLink = styled('a')({
  marginTop: '9px',
  textDecoration: 'none',
  color: '#7f56da',
});

