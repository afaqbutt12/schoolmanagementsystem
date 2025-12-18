'use client';

import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';

const AttendancePage = () => {
  const router = useRouter();

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Attendance Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push('/admin/attendance/take')}
          sx={{ backgroundColor: '#7f56da' }}
        >
          Take Attendance
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <PeopleIcon sx={{ fontSize: 60, color: '#7f56da', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Student Attendance</Typography>
              <Typography color="textSecondary">
                Track and manage student attendance records
              </Typography>
              <Button 
                variant="outlined" 
                sx={{ mt: 2 }}
                onClick={() => router.push('/admin/attendance/students')}
              >
                View Records
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <SchoolIcon sx={{ fontSize: 60, color: '#4caf50', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Teacher Attendance</Typography>
              <Typography color="textSecondary">
                Monitor teacher attendance and leave
              </Typography>
              <Button 
                variant="outlined" 
                sx={{ mt: 2 }}
                onClick={() => router.push('/admin/attendance/teachers')}
              >
                View Records
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <EventAvailableIcon sx={{ fontSize: 60, color: '#ff9800', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Reports</Typography>
              <Typography color="textSecondary">
                Generate attendance reports and analytics
              </Typography>
              <Button 
                variant="outlined" 
                sx={{ mt: 2 }}
                onClick={() => router.push('/admin/attendance/reports')}
              >
                View Reports
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AttendancePage;
