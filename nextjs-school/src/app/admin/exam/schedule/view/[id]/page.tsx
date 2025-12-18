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
  Card,
  CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';
import GradeIcon from '@mui/icons-material/Grade';

const ViewExamPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState<any>(null);

  // Mock exam data - in real app, fetch from API
  const mockExams: { [key: string]: any } = {
    '1': { 
      _id: '1', 
      examName: 'Midterm Exam', 
      examType: 'Midterm', 
      subject: 'Mathematics',
      class: 'Class 10A',
      date: '2024-03-15', 
      startTime: '09:00', 
      endTime: '12:00', 
      totalMarks: 100, 
      passingMarks: 40,
      room: 'Hall A',
      instructions: 'Bring calculator and ID card. Mobile phones are not allowed.',
      studentsCount: 45
    },
    '2': { 
      _id: '2', 
      examName: 'Unit Test 1', 
      examType: 'Unit Test', 
      subject: 'Physics',
      class: 'Class 10A',
      date: '2024-03-18', 
      startTime: '10:00', 
      endTime: '11:30', 
      totalMarks: 50, 
      passingMarks: 20,
      room: 'Room 101',
      instructions: '',
      studentsCount: 45
    },
    '3': { 
      _id: '3', 
      examName: 'Midterm Exam', 
      examType: 'Midterm', 
      subject: 'English',
      class: 'Class 10B',
      date: '2024-03-20', 
      startTime: '09:00', 
      endTime: '12:00', 
      totalMarks: 100, 
      passingMarks: 40,
      room: 'Hall B',
      instructions: 'Answer all questions. Use black or blue pen only.',
      studentsCount: 42
    },
    '4': { 
      _id: '4', 
      examName: 'Quiz 1', 
      examType: 'Quiz', 
      subject: 'Chemistry',
      class: 'Class 9A',
      date: '2024-03-22', 
      startTime: '14:00', 
      endTime: '14:45', 
      totalMarks: 25, 
      passingMarks: 10,
      room: 'Room 205',
      instructions: '',
      studentsCount: 38
    },
    '5': { 
      _id: '5', 
      examName: 'Practical Exam', 
      examType: 'Practical', 
      subject: 'Biology',
      class: 'Class 11A',
      date: '2024-03-25', 
      startTime: '10:00', 
      endTime: '13:00', 
      totalMarks: 50, 
      passingMarks: 20,
      room: 'Lab 1',
      instructions: 'Wear lab coat. Follow safety guidelines.',
      studentsCount: 35
    },
  };

  useEffect(() => {
    // Simulate API fetch
    const fetchExam = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (mockExams[id]) {
        setExam(mockExams[id]);
      }
      setLoading(false);
    };

    fetchExam();
  }, [id]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Midterm': return 'primary';
      case 'Final': return 'error';
      case 'Quiz': return 'info';
      case 'Unit Test': return 'warning';
      case 'Practical': return 'success';
      default: return 'default';
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!exam) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5">Exam not found</Typography>
        <Button onClick={() => router.back()} sx={{ mt: 2 }}>Go Back</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
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
            Exam Details
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={() => window.print()}
          >
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => router.push(`/admin/exam/schedule/edit/${id}`)}
            sx={{ backgroundColor: '#7f56da' }}
          >
            Edit
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 2, mb: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {exam.examName}
            </Typography>
            <Chip 
              label={exam.examType} 
              color={getTypeColor(exam.examType) as any}
              size="small"
            />
          </Box>
          <Typography variant="body1" color="textSecondary">
            {exam.subject} • {exam.class}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Quick Info Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <Card sx={{ bgcolor: '#f5f5f5', boxShadow: 'none' }}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <CalendarTodayIcon sx={{ color: '#7f56da', mb: 1 }} />
                <Typography variant="body2" color="textSecondary">Date</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {new Date(exam.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card sx={{ bgcolor: '#f5f5f5', boxShadow: 'none' }}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <AccessTimeIcon sx={{ color: '#4caf50', mb: 1 }} />
                <Typography variant="body2" color="textSecondary">Time</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {formatTime(exam.startTime)} - {formatTime(exam.endTime)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card sx={{ bgcolor: '#f5f5f5', boxShadow: 'none' }}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <RoomIcon sx={{ color: '#ff9800', mb: 1 }} />
                <Typography variant="body2" color="textSecondary">Room</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {exam.room}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card sx={{ bgcolor: '#f5f5f5', boxShadow: 'none' }}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <GradeIcon sx={{ color: '#f44336', mb: 1 }} />
                <Typography variant="body2" color="textSecondary">Total Marks</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {exam.totalMarks}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Details */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">Subject</Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{exam.subject}</Typography>
            
            <Typography variant="subtitle2" color="textSecondary">Class</Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{exam.class}</Typography>
            
            <Typography variant="subtitle2" color="textSecondary">Students</Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{exam.studentsCount} students</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">Passing Marks</Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
              {exam.passingMarks} / {exam.totalMarks} ({((exam.passingMarks / exam.totalMarks) * 100).toFixed(0)}%)
            </Typography>
            
            <Typography variant="subtitle2" color="textSecondary">Duration</Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
              {(() => {
                const start = exam.startTime.split(':').map(Number);
                const end = exam.endTime.split(':').map(Number);
                const diffMins = (end[0] * 60 + end[1]) - (start[0] * 60 + start[1]);
                const hours = Math.floor(diffMins / 60);
                const mins = diffMins % 60;
                return hours > 0 ? `${hours}h ${mins}m` : `${mins} minutes`;
              })()}
            </Typography>
          </Grid>
        </Grid>

        {exam.instructions && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
              Instructions
            </Typography>
            <Paper sx={{ p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
              <Typography variant="body2">{exam.instructions}</Typography>
            </Paper>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ViewExamPage;

