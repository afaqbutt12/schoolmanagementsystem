'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '@/redux/hooks';
import { LightPurpleButton } from '@/components/buttonStyles';

const Homepage = () => {
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
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <Box 
            sx={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              p: 4
            }}
          >
            <svg
              viewBox="0 0 500 400"
              style={{ width: '100%', maxWidth: '500px' }}
            >
              <rect x="50" y="100" width="400" height="250" fill="#7f56da" rx="10" />
              <rect x="80" y="130" width="340" height="190" fill="#fff" rx="5" />
              <circle cx="150" cy="200" r="30" fill="#FFD700" />
              <circle cx="250" cy="200" r="30" fill="#4CAF50" />
              <circle cx="350" cy="200" r="30" fill="#2196F3" />
              <rect x="120" y="260" width="60" height="40" fill="#E0E0E0" rx="5" />
              <rect x="220" y="260" width="60" height="40" fill="#E0E0E0" rx="5" />
              <rect x="320" y="260" width="60" height="40" fill="#E0E0E0" rx="5" />
              <text x="250" y="80" textAnchor="middle" fill="#333" fontSize="24" fontWeight="bold">
                📚 Students
              </text>
            </svg>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <StyledTitle>
              Welcome to
              <br />
              School Management
              <br />
              System
            </StyledTitle>
            <StyledText>
              Streamline school management, class organization, and add students and faculty.
              Seamlessly track attendance, assess performance, and provide feedback.
              Access records, view marks, and communicate effortlessly.
            </StyledText>
            <StyledBox>
              <Link href="/choose" style={{ width: '100%', textDecoration: 'none' }}>
                <LightPurpleButton variant="contained" fullWidth>
                  Login
                </LightPurpleButton>
              </Link>
              <Link href="/chooseasguest" style={{ width: '100%', textDecoration: 'none' }}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{ mt: 2, mb: 3, color: '#7f56da', borderColor: '#7f56da' }}
                >
                  Login as Guest
                </Button>
              </Link>
              <Typography>
                Don&apos;t have an account?{' '}
                <Link href="/admin/register" style={{ color: '#550080' }}>
                  Sign up
                </Link>
              </Typography>
            </StyledBox>
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Homepage;

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
});

const StyledPaper = styled(Box)({
  padding: '24px',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  padding: '24px',
});

const StyledTitle = styled(Typography)({
  fontSize: '3rem',
  color: '#252525',
  fontWeight: 'bold',
  paddingTop: 0,
  letterSpacing: 'normal',
  lineHeight: 'normal',
});

const StyledText = styled(Typography)({
  marginTop: '30px',
  marginBottom: '30px',
  letterSpacing: 'normal',
  lineHeight: 'normal',
});

