'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Grid, Paper, Typography, Box, CircularProgress, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutUser } from '@/redux/userRelated/userHandle';
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/Subject';

const TeacherDashboard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser, currentRole } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser || currentRole !== 'Teacher') {
      router.push('/teacher/login');
    }
  }, [currentUser, currentRole, router]);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/');
  };

  if (!currentUser) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Welcome, {currentUser.name}!
        </Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper elevation={3} sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
                  0
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Students
                </Typography>
              </Box>
              <PeopleIcon sx={{ fontSize: 60, color: 'rgba(255,255,255,0.3)' }} />
            </Box>
          </StyledPaper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper elevation={3} sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
                  0
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Classes
                </Typography>
              </Box>
              <ClassIcon sx={{ fontSize: 60, color: 'rgba(255,255,255,0.3)' }} />
            </Box>
          </StyledPaper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper elevation={3} sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
                  0
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Subjects
                </Typography>
              </Box>
              <SubjectIcon sx={{ fontSize: 60, color: 'rgba(255,255,255,0.3)' }} />
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Teacher Information
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Name:</strong> {currentUser.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Email:</strong> {currentUser.email}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeacherDashboard;

const StyledPaper = styled(Paper)({
  padding: '24px',
  borderRadius: '16px',
  color: 'white',
});

