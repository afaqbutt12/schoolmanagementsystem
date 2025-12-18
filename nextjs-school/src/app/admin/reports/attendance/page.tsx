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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Chip,
  LinearProgress,
  TextField,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useAppSelector } from '@/redux/hooks';

const AttendanceReportsPage = () => {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.user);
  
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [loading, setLoading] = useState(true);

  // Mock data
  const stats = {
    avgAttendance: 93.5,
    presentToday: 1156,
    absentToday: 94,
    onLeave: 12,
  };

  const attendanceByClass = [
    { class: 'Class 10A', totalStudents: 45, present: 42, absent: 2, leave: 1, percentage: 93.3 },
    { class: 'Class 10B', totalStudents: 42, present: 40, absent: 1, leave: 1, percentage: 95.2 },
    { class: 'Class 9A', totalStudents: 48, present: 44, absent: 3, leave: 1, percentage: 91.7 },
    { class: 'Class 9B', totalStudents: 46, present: 43, absent: 2, leave: 1, percentage: 93.5 },
    { class: 'Class 8A', totalStudents: 50, present: 47, absent: 2, leave: 1, percentage: 94.0 },
    { class: 'Class 8B', totalStudents: 44, present: 41, absent: 2, leave: 1, percentage: 93.2 },
    { class: 'Class 7A', totalStudents: 52, present: 48, absent: 3, leave: 1, percentage: 92.3 },
    { class: 'Class 7B', totalStudents: 38, present: 36, absent: 1, leave: 1, percentage: 94.7 },
  ];

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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()}>
            Print
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />} sx={{ backgroundColor: '#ff9800' }}>
            Export PDF
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e3f2fd' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TrendingUpIcon sx={{ fontSize: 40, color: '#1976d2' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  {stats.avgAttendance}%
                </Typography>
                <Typography variant="body2" color="textSecondary">Avg Attendance</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e8f5e9' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CheckCircleIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                  {stats.presentToday}
                </Typography>
                <Typography variant="body2" color="textSecondary">Present Today</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#ffebee' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CancelIcon sx={{ fontSize: 40, color: '#c62828' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#c62828' }}>
                  {stats.absentToday}
                </Typography>
                <Typography variant="body2" color="textSecondary">Absent Today</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#fff3e0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <EventAvailableIcon sx={{ fontSize: 40, color: '#ed6c02' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ed6c02' }}>
                  {stats.onLeave}
                </Typography>
                <Typography variant="body2" color="textSecondary">On Leave</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Filter by Class</InputLabel>
              <Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                label="Filter by Class"
              >
                <MenuItem value="">All Classes</MenuItem>
                {classes.map((cls: any) => (
                  <MenuItem key={cls._id} value={cls._id}>{cls.sclassName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Start Date"
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              label="End Date"
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Attendance by Class Table */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Attendance by Class
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Class</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Total Students</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Present</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Absent</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>On Leave</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Attendance %</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceByClass.map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{row.class}</TableCell>
                  <TableCell>{row.totalStudents}</TableCell>
                  <TableCell>
                    <Chip label={row.present} size="small" color="success" />
                  </TableCell>
                  <TableCell>
                    <Chip label={row.absent} size="small" color="error" />
                  </TableCell>
                  <TableCell>
                    <Chip label={row.leave} size="small" color="warning" />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={row.percentage} 
                        sx={{ width: 80, height: 8, borderRadius: 4 }}
                        color={row.percentage >= 95 ? 'success' : row.percentage >= 90 ? 'primary' : 'warning'}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {row.percentage}%
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default AttendanceReportsPage;

