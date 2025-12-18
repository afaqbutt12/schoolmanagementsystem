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
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useAppSelector } from '@/redux/hooks';

const PerformanceAnalyticsPage = () => {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.user);
  
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock data
  const stats = {
    avgScore: 78.5,
    passRate: 92.3,
    topScorers: 45,
    improvementRate: 8.5,
  };

  const subjectPerformance = [
    { subject: 'Mathematics', avgScore: 75.2, passRate: 88, topScore: 98, lowestScore: 32, students: 245 },
    { subject: 'Physics', avgScore: 72.8, passRate: 85, topScore: 96, lowestScore: 28, students: 198 },
    { subject: 'Chemistry', avgScore: 78.4, passRate: 90, topScore: 100, lowestScore: 35, students: 198 },
    { subject: 'Biology', avgScore: 82.1, passRate: 94, topScore: 99, lowestScore: 42, students: 210 },
    { subject: 'English', avgScore: 80.5, passRate: 95, topScore: 98, lowestScore: 45, students: 280 },
    { subject: 'History', avgScore: 76.8, passRate: 91, topScore: 95, lowestScore: 38, students: 165 },
    { subject: 'Geography', avgScore: 74.2, passRate: 87, topScore: 94, lowestScore: 30, students: 165 },
    { subject: 'Computer Science', avgScore: 85.6, passRate: 97, topScore: 100, lowestScore: 52, students: 156 },
  ];

  const classPerformance = [
    { class: 'Class 10A', avgScore: 82.5, passRate: 96, rank: 1, trend: 'up' },
    { class: 'Class 10B', avgScore: 79.8, passRate: 94, rank: 2, trend: 'up' },
    { class: 'Class 9A', avgScore: 78.2, passRate: 92, rank: 3, trend: 'down' },
    { class: 'Class 9B', avgScore: 76.5, passRate: 90, rank: 4, trend: 'up' },
    { class: 'Class 8A', avgScore: 81.2, passRate: 95, rank: 5, trend: 'up' },
    { class: 'Class 8B', avgScore: 74.8, passRate: 88, rank: 6, trend: 'down' },
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

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'success';
    if (score >= 70) return 'primary';
    if (score >= 50) return 'warning';
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
            Performance Analytics
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()}>
            Print
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />} sx={{ backgroundColor: '#2196f3' }}>
            Export PDF
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e3f2fd' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AssessmentIcon sx={{ fontSize: 40, color: '#1976d2' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  {stats.avgScore}%
                </Typography>
                <Typography variant="body2" color="textSecondary">Average Score</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e8f5e9' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <SchoolIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                  {stats.passRate}%
                </Typography>
                <Typography variant="body2" color="textSecondary">Pass Rate</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#fff3e0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <EmojiEventsIcon sx={{ fontSize: 40, color: '#ed6c02' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ed6c02' }}>
                  {stats.topScorers}
                </Typography>
                <Typography variant="body2" color="textSecondary">Top Scorers (90%+)</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#f3e5f5' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TrendingUpIcon sx={{ fontSize: 40, color: '#7b1fa2' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#7b1fa2' }}>
                  +{stats.improvementRate}%
                </Typography>
                <Typography variant="body2" color="textSecondary">Improvement Rate</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Grid container spacing={2}>
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
            <FormControl fullWidth size="small">
              <InputLabel>Filter by Subject</InputLabel>
              <Select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                label="Filter by Subject"
              >
                <MenuItem value="">All Subjects</MenuItem>
                {subjectPerformance.map((sub) => (
                  <MenuItem key={sub.subject} value={sub.subject}>{sub.subject}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Subject Performance */}
        <Grid item xs={12} lg={7}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Subject-wise Performance
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Avg Score</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Pass Rate</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Highest</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Lowest</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjectPerformance.map((sub) => (
                    <TableRow key={sub.subject} hover>
                      <TableCell sx={{ fontWeight: 500 }}>{sub.subject}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={sub.avgScore} 
                            sx={{ width: 50, height: 6, borderRadius: 3 }}
                            color={getScoreColor(sub.avgScore) as any}
                          />
                          {sub.avgScore}%
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={`${sub.passRate}%`} size="small" color="success" />
                      </TableCell>
                      <TableCell>{sub.topScore}</TableCell>
                      <TableCell>{sub.lowestScore}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Class Rankings */}
        <Grid item xs={12} lg={5}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Class Rankings
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Rank</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Class</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Avg Score</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Trend</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classPerformance.map((cls) => (
                    <TableRow key={cls.class} hover>
                      <TableCell>
                        <Chip 
                          label={`#${cls.rank}`} 
                          size="small" 
                          color={cls.rank <= 3 ? 'warning' : 'default'}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{cls.class}</TableCell>
                      <TableCell>{cls.avgScore}%</TableCell>
                      <TableCell>
                        <Chip 
                          label={cls.trend === 'up' ? '↑' : '↓'} 
                          size="small" 
                          color={cls.trend === 'up' ? 'success' : 'error'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PerformanceAnalyticsPage;

