'use client';

import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

const ProfilePage = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Profile
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                fontSize: 48,
                bgcolor: '#7f56da',
                mx: 'auto',
                mb: 2,
              }}
            >
              {currentUser?.name?.charAt(0) || 'A'}
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {currentUser?.name}
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 2 }}>
              Administrator
            </Typography>
            <Button variant="outlined" fullWidth>
              Change Photo
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Account Information
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                  <PersonIcon sx={{ color: '#7f56da' }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Full Name</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{currentUser?.name}</Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                  <EmailIcon sx={{ color: '#7f56da' }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Email Address</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{currentUser?.email}</Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                  <SchoolIcon sx={{ color: '#7f56da' }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">School Name</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{currentUser?.schoolName}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Update Profile
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  defaultValue={currentUser?.name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  defaultValue={currentUser?.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="School Name"
                  defaultValue={currentUser?.schoolName}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button variant="outlined">Cancel</Button>
                  <Button variant="contained" sx={{ bgcolor: '#7f56da' }}>
                    Save Changes
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;

