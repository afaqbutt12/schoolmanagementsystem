'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Typography,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { registerUser } from '@/redux/userRelated/userHandle';
import { LightPurpleButton } from '@/components/buttonStyles';
import Popup from '@/components/Popup';

const AdminRegisterPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, currentUser, response, error, currentRole } = useAppSelector((state) => state.user);

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('adminName') as string;
    const schoolName = data.get('schoolName') as string;
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (!name || !schoolName || !email || !password) {
      setMessage('All fields are required');
      setShowPopup(true);
      return;
    }

    const fields = { name, schoolName, email, password };
    setLoader(true);
    dispatch(registerUser(fields, 'Admin'));
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        router.push('/admin/dashboard');
      }
    } else if (status === 'failed') {
      setMessage(response || 'Registration failed');
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage('Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, currentRole, router, error, response, currentUser]);

  return (
    <StyledContainer>
      <CssBaseline />
      <StyledPaper>
        <Typography variant="h4" sx={{ mb: 2, color: '#2c2143', fontWeight: 'bold' }}>
          Admin Register
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Create your own school by registering as an admin
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="adminName"
            label="Enter your name"
            name="adminName"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="schoolName"
            label="Create your school name"
            name="schoolName"
            autoComplete="organization"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Enter your email"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={toggle ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
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
          <FormControlLabel
            control={<Checkbox value="agree" color="primary" required />}
            label="I agree to the terms and conditions"
          />
          <LightPurpleButton type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {loader ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </LightPurpleButton>
          <Box sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link href="/admin/login" style={{ color: '#7f56da', textDecoration: 'none' }}>
              Log in
            </Link>
          </Box>
        </Box>
      </StyledPaper>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default AdminRegisterPage;

const StyledContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '20px',
});

const StyledPaper = styled(Box)({
  backgroundColor: 'white',
  padding: '40px',
  borderRadius: '16px',
  maxWidth: '450px',
  width: '100%',
  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
});

