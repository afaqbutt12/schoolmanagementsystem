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
  Avatar,
  Rating,
  LinearProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useAppSelector } from '@/redux/hooks';

const TeacherReportsPage = () => {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  // Mock data
  const stats = {
    totalTeachers: 85,
    avgAttendance: 96.2,
    avgRating: 4.2,
    activeClasses: 120,
  };

  const teacherPerformance = [
    { name: 'Dr. Sarah Johnson', subject: 'Mathematics', classes: 4, attendance: 98, rating: 4.8, studentsCount: 145 },
    { name: 'Prof. Michael Chen', subject: 'Physics', classes: 3, attendance: 95, rating: 4.5, studentsCount: 112 },
    { name: 'Ms. Emily Davis', subject: 'English', classes: 5, attendance: 97, rating: 4.7, studentsCount: 178 },
    { name: 'Mr. Robert Wilson', subject: 'Chemistry', classes: 3, attendance: 92, rating: 4.2, studentsCount: 98 },
    { name: 'Dr. Lisa Anderson', subject: 'Biology', classes: 4, attendance: 99, rating: 4.9, studentsCount: 134 },
    { name: 'Mr. James Brown', subject: 'History', classes: 3, attendance: 94, rating: 4.0, studentsCount: 105 },
    { name: 'Ms. Maria Garcia', subject: 'Geography', classes: 2, attendance: 96, rating: 4.3, studentsCount: 72 },
    { name: 'Prof. David Lee', subject: 'Computer Science', classes: 4, attendance: 97, rating: 4.6, studentsCount: 156 },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

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
            Teacher Reports
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()}>
            Print
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />} sx={{ backgroundColor: '#4caf50' }}>
            Export PDF
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e8f5e9' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <SchoolIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                  {stats.totalTeachers}
                </Typography>
                <Typography variant="body2" color="textSecondary">Total Teachers</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e3f2fd' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AccessTimeIcon sx={{ fontSize: 40, color: '#1976d2' }} />
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
          <Card sx={{ borderRadius: 2, bgcolor: '#fff3e0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <StarIcon sx={{ fontSize: 40, color: '#ed6c02' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ed6c02' }}>
                  {stats.avgRating}
                </Typography>
                <Typography variant="body2" color="textSecondary">Average Rating</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#f3e5f5' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <MenuBookIcon sx={{ fontSize: 40, color: '#7b1fa2' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#7b1fa2' }}>
                  {stats.activeClasses}
                </Typography>
                <Typography variant="body2" color="textSecondary">Active Classes</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Teacher Performance Table */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Teacher Performance Overview
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Teacher</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Classes</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Students</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Attendance</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teacherPerformance.map((teacher, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ bgcolor: '#4caf50', width: 36, height: 36 }}>
                        {teacher.name.charAt(0)}
                      </Avatar>
                      <Typography sx={{ fontWeight: 500 }}>{teacher.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={teacher.subject} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>{teacher.classes}</TableCell>
                  <TableCell>{teacher.studentsCount}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={teacher.attendance} 
                        sx={{ width: 60, height: 6, borderRadius: 3 }}
                        color={teacher.attendance >= 95 ? 'success' : 'warning'}
                      />
                      {teacher.attendance}%
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Rating value={teacher.rating} precision={0.1} size="small" readOnly />
                      <Typography variant="body2">({teacher.rating})</Typography>
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

export default TeacherReportsPage;

