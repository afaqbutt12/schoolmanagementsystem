'use client';

import { useState, useEffect } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppSelector } from '@/redux/hooks';

const AttendanceReportsPage = () => {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.user);
  
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      if (currentUser?._id) {
        try {
          const res = await fetch(`/api/sclass/school/${currentUser._id}`);
          if (res.ok) {
            const data = await res.json();
            setClasses(Array.isArray(data) ? data : []);
          }
        } catch (error) {
          console.error('Failed to fetch classes:', error);
        }
      }
      setLoading(false);
    };

    fetchClasses();
  }, [currentUser]);

  // Mock statistics - in real app, this would come from API
  const stats = {
    totalStudents: 150,
    avgAttendance: 87.5,
    totalPresent: 4200,
    totalAbsent: 600,
    bestDay: 'Wednesday',
    worstDay: 'Monday',
  };

  const classStats = [
    { name: 'Class 1', attendance: 92 },
    { name: 'Class 2', attendance: 88 },
    { name: 'Class 3', attendance: 85 },
    { name: 'Class 4', attendance: 90 },
    { name: 'Class 5', attendance: 87 },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Attendance Reports
        </Typography>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Select Class</InputLabel>
            <Select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              label="Select Class"
            >
              <MenuItem value="">All Classes</MenuItem>
              {classes.map((cls: any) => (
                <MenuItem key={cls._id} value={cls._id}>
                  {cls.sclassName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Month"
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 200 }}
          />
          <Button variant="contained" sx={{ backgroundColor: '#7f56da' }}>
            Generate Report
          </Button>
        </Box>
      </Paper>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e3f2fd' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <PeopleIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                {stats.totalStudents}
              </Typography>
              <Typography variant="body2" color="textSecondary">Total Students</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e8f5e9' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUpIcon sx={{ fontSize: 40, color: '#2e7d32', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                {stats.avgAttendance}%
              </Typography>
              <Typography variant="body2" color="textSecondary">Avg Attendance</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#f3e5f5' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 40, color: '#7b1fa2', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#7b1fa2' }}>
                {stats.totalPresent}
              </Typography>
              <Typography variant="body2" color="textSecondary">Total Present</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#ffebee' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CancelIcon sx={{ fontSize: 40, color: '#c62828', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#c62828' }}>
                {stats.totalAbsent}
              </Typography>
              <Typography variant="body2" color="textSecondary">Total Absent</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Class-wise Attendance */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Class-wise Attendance
            </Typography>
            {classStats.map((cls, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">{cls.name}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{cls.attendance}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={cls.attendance} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: cls.attendance >= 90 ? '#4caf50' : cls.attendance >= 80 ? '#ff9800' : '#f44336',
                      borderRadius: 4,
                    }
                  }}
                />
              </Box>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Quick Insights
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="textSecondary">Best Attendance Day</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <TrendingUpIcon color="success" />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{stats.bestDay}</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">Lowest Attendance Day</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <TrendingDownIcon color="error" />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{stats.worstDay}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AttendanceReportsPage;

