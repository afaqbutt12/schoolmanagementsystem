'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container, Grid, Paper, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '@/redux/hooks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const ChooseUser = () => {
  const router = useRouter();
  const { currentRole } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (currentRole === 'Admin') {
      router.push('/admin/dashboard');
    } else if (currentRole === 'Student') {
      router.push('/student/dashboard');
    } else if (currentRole === 'Teacher') {
      router.push('/teacher/dashboard');
    }
  }, [currentRole, router]);

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Link href="/admin/login" style={{ textDecoration: 'none' }}>
              <StyledPaper elevation={3}>
                <Box>
                  <AccountCircleIcon sx={{ fontSize: 80, color: '#7f56da' }} />
                </Box>
                <StyledTypography>Admin</StyledTypography>
                <Typography variant="body2" color="textSecondary" align="center">
                  Login as an administrator to access the dashboard to manage app data.
                </Typography>
              </StyledPaper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link href="/student/login" style={{ textDecoration: 'none' }}>
              <StyledPaper elevation={3}>
                <Box>
                  <SchoolIcon sx={{ fontSize: 80, color: '#7f56da' }} />
                </Box>
                <StyledTypography>Student</StyledTypography>
                <Typography variant="body2" color="textSecondary" align="center">
                  Login as a student to explore course materials and assignments.
                </Typography>
              </StyledPaper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link href="/teacher/login" style={{ textDecoration: 'none' }}>
              <StyledPaper elevation={3}>
                <Box>
                  <SupervisorAccountIcon sx={{ fontSize: 80, color: '#7f56da' }} />
                </Box>
                <StyledTypography>Teacher</StyledTypography>
                <Typography variant="body2" color="textSecondary" align="center">
                  Login as a teacher to create courses, assignments, and track student progress.
                </Typography>
              </StyledPaper>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </StyledContainer>
  );
};

export default ChooseUser;

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

