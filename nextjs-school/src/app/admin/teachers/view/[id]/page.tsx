'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Chip,
  CircularProgress,
  Divider,
  Avatar,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import BookIcon from '@mui/icons-material/Book';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ViewTeacherPage = () => {
  const router = useRouter();
  const params = useParams();
  const [teacher, setTeacher] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await fetch(`/api/teacher/${params.id}`);
        const data = await res.json();
        if (res.ok) {
          setTeacher(data);
        }
      } catch (error) {
        console.error('Failed to fetch teacher:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchTeacher();
    }
  }, [params.id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!teacher) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>Teacher record not found</Typography>
        <Button onClick={() => router.back()} sx={{ mt: 2 }}>Go Back</Button>
      </Container>
    );
  }

  // Calculate attendance statistics
  const totalPresent = teacher.attendance?.reduce((sum: number, a: any) => sum + (a.presentCount || 0), 0) || 0;
  const totalAbsent = teacher.attendance?.reduce((sum: number, a: any) => sum + (a.absentCount || 0), 0) || 0;
  const totalDays = totalPresent + totalAbsent;
  const attendanceRate = totalDays > 0 ? ((totalPresent / totalDays) * 100).toFixed(1) : 'N/A';

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
            Teacher Details
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => router.push(`/admin/teachers/edit/${params.id}`)}
          sx={{ backgroundColor: '#7f56da' }}
        >
          Edit
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: '#7f56da',
                fontSize: '3rem',
                mx: 'auto',
                mb: 2,
              }}
            >
              {teacher.name?.charAt(0)}
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              {teacher.name}
            </Typography>
            <Chip label={teacher.role || 'Teacher'} color="primary" size="small" sx={{ mb: 2 }} />
            
            <Box sx={{ mt: 2, textAlign: 'left' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <EmailIcon color="action" fontSize="small" />
                <Typography variant="body2">{teacher.email}</Typography>
              </Box>
            </Box>
          </Paper>

          {/* Stats Card */}
          <Paper sx={{ p: 3, borderRadius: 2, mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Attendance Statistics
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
              <Box>
                <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                  {totalPresent}
                </Typography>
                <Typography variant="body2" color="textSecondary">Present</Typography>
              </Box>
              <Box>
                <Typography variant="h4" color="error.main" sx={{ fontWeight: 'bold' }}>
                  {totalAbsent}
                </Typography>
                <Typography variant="body2" color="textSecondary">Absent</Typography>
              </Box>
              <Box>
                <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                  {attendanceRate}%
                </Typography>
                <Typography variant="body2" color="textSecondary">Rate</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Details Card */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Teaching Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <BookIcon color="primary" />
                      <Typography variant="subtitle2" color="textSecondary">Subject</Typography>
                    </Box>
                    <Typography variant="h6">
                      {teacher.teachSubject?.subName || 'Not Assigned'}
                    </Typography>
                    {teacher.teachSubject?.subCode && (
                      <Chip 
                        label={`Code: ${teacher.teachSubject.subCode}`} 
                        size="small" 
                        variant="outlined"
                        sx={{ mt: 1 }}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <ClassIcon color="secondary" />
                      <Typography variant="subtitle2" color="textSecondary">Class</Typography>
                    </Box>
                    <Typography variant="h6">
                      {teacher.teachSclass?.sclassName || 'Not Assigned'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Recent Attendance */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Recent Attendance Records
            </Typography>
            
            {teacher.attendance && teacher.attendance.length > 0 ? (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Present Count</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Absent Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teacher.attendance.slice(0, 10).map((record: any, index: number) => (
                      <TableRow key={index} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarTodayIcon fontSize="small" color="action" />
                            {new Date(record.date).toLocaleDateString()}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={record.presentCount || 0} 
                            size="small" 
                            color="success" 
                            variant="outlined" 
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={record.absentCount || 0} 
                            size="small" 
                            color="error" 
                            variant="outlined" 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography color="textSecondary">No attendance records found</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewTeacherPage;

