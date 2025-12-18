'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAppDispatch } from '@/redux/hooks';
import { logoutUser } from '@/redux/userRelated/userHandle';

const LogoutPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logoutUser());
    router.push('/');
  }, [dispatch, router]);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}
    >
      <CircularProgress />
      <Typography sx={{ mt: 2 }}>Logging out...</Typography>
    </Box>
  );
};

export default LogoutPage;

