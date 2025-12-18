'use client';

import { useRouter } from 'next/navigation';
import { Container, Grid, Paper, Box, Typography, CircularProgress, Backdrop } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loginUser } from '@/redux/userRelated/userHandle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useEffect, useState } from 'react';

const ChooseUserAsGuest = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, currentRole } = useAppSelector((state) => state.user);
  const [loader, setLoader] = useState(false);

  const handleGuestLogin = (role: string) => {
    const password = "zxc";
    setLoader(true);

    if (role === "Admin") {
      const email = "yogendra@12";
      const fields = { email, password };
      dispatch(loginUser(fields, role));
    } else if (role === "Student") {
      const rollNum = "1";
      const studentName = "Dipesh Awasthi";
      const fields = { rollNum, studentName, password };
      dispatch(loginUser(fields, role));
    } else if (role === "Teacher") {
      const email = "tony@12";
      const fields = { email, password };
      dispatch(loginUser(fields, role));
    }
  };

  useEffect(() => {
    if (status === 'success') {
      if (currentRole === 'Admin') {
        router.push('/admin/dashboard');
      } else if (currentRole === 'Student') {
        router.push('/student/dashboard');
      } else if (currentRole === 'Teacher') {
        router.push('/teacher/dashboard');
      }
    } else if (status === 'failed' || status === 'error') {
      setLoader(false);
    }
  }, [status, currentRole, router]);

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3} onClick={() => handleGuestLogin('Admin')}>
              <Box>
                <AccountCircleIcon sx={{ fontSize: 80, color: '#7f56da' }} />
              </Box>
              <StyledTypography>Admin</StyledTypography>
              <Typography variant="body2" color="textSecondary" align="center">
                Login as an administrator to access the dashboard to manage app data.
              </Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3} onClick={() => handleGuestLogin('Student')}>
              <Box>
                <SchoolIcon sx={{ fontSize: 80, color: '#7f56da' }} />
              </Box>
              <StyledTypography>Student</StyledTypography>
              <Typography variant="body2" color="textSecondary" align="center">
                Login as a student to explore course materials and assignments.
              </Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3} onClick={() => handleGuestLogin('Teacher')}>
              <Box>
                <SupervisorAccountIcon sx={{ fontSize: 80, color: '#7f56da' }} />
              </Box>
              <StyledTypography>Teacher</StyledTypography>
              <Typography variant="body2" color="textSecondary" align="center">
                Login as a teacher to create courses, assignments, and track student progress.
              </Typography>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="primary" />
        <Typography sx={{ ml: 2 }}>Please Wait</Typography>
      </Backdrop>
    </StyledContainer>
  );
};

export default ChooseUserAsGuest;

const StyledContainer = styled(Box)({
  background: 'linear-gradient(to bottom, #411d70, #19118b)',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
});

const StyledPaper = styled(Paper)({
  padding: '40px',
  textAlign: 'center',
  backgroundColor: '#fff',
  cursor: 'pointer',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
  },
});

const StyledTypography = styled(Typography)({
  marginTop: '16px',
  marginBottom: '8px',
  fontWeight: 'bold',
  fontSize: '1.5rem',
});

