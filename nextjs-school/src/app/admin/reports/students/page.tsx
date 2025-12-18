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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useAppSelector } from '@/redux/hooks';

const StudentReportsPage = () => {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.user);
  
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock data
  const stats = {
    totalStudents: 1250,
    avgAttendance: 92.5,
    avgGrade: 'B+',
    topPerformers: 156,
  };

  const studentPerformance = [
    { name: 'John Doe', class: '10A', attendance: 95, avgMarks: 88, grade: 'A', rank: 1 },
    { name: 'Jane Smith', class: '10A', attendance: 98, avgMarks: 92, grade: 'A+', rank: 2 },
    { name: 'Bob Wilson', class: '10B', attendance: 89, avgMarks: 75, grade: 'B+', rank: 3 },
    { name: 'Alice Brown', class: '10A', attendance: 92, avgMarks: 82, grade: 'A-', rank: 4 },
    { name: 'Charlie Davis', class: '10C', attendance: 85, avgMarks: 68, grade: 'B', rank: 5 },
    { name: 'Eva Martinez', class: '10B', attendance: 96, avgMarks: 95, grade: 'A+', rank: 6 },
    { name: 'Frank Garcia', class: '10A', attendance: 78, avgMarks: 62, grade: 'C+', rank: 7 },
    { name: 'Grace Lee', class: '10C', attendance: 94, avgMarks: 85, grade: 'A', rank: 8 },
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

  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return 'success';
    if (grade.includes('B')) return 'primary';
    if (grade.includes('C')) return 'warning';
    return 'error';
  };

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
            Student Reports
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()}>
            Print
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />} sx={{ backgroundColor: '#7f56da' }}>
            Export PDF
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e8f5e9' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PeopleIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                  {stats.totalStudents}
                </Typography>
                <Typography variant="body2" color="textSecondary">Total Students</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
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
          <Card sx={{ borderRadius: 2, bgcolor: '#fff3e0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <SchoolIcon sx={{ fontSize: 40, color: '#ed6c02' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ed6c02' }}>
                  {stats.avgGrade}
                </Typography>
                <Typography variant="body2" color="textSecondary">Average Grade</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#f3e5f5' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <EmojiEventsIcon sx={{ fontSize: 40, color: '#7b1fa2' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#7b1fa2' }}>
                  {stats.topPerformers}
                </Typography>
                <Typography variant="body2" color="textSecondary">Top Performers</Typography>
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
        </Grid>
      </Paper>

      {/* Student Performance Table */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Student Performance Overview
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Rank</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Student Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Class</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Attendance</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Avg Marks</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentPerformance.map((student) => (
                <TableRow key={student.rank} hover>
                  <TableCell>
                    <Chip 
                      label={`#${student.rank}`} 
                      size="small" 
                      color={student.rank <= 3 ? 'warning' : 'default'}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={student.attendance} 
                        sx={{ width: 60, height: 6, borderRadius: 3 }}
                      />
                      {student.attendance}%
                    </Box>
                  </TableCell>
                  <TableCell>{student.avgMarks}%</TableCell>
                  <TableCell>
                    <Chip 
                      label={student.grade} 
                      size="small" 
                      color={getGradeColor(student.grade) as any}
                    />
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

export default StudentReportsPage;

