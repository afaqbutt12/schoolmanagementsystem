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
import QuizIcon from '@mui/icons-material/Quiz';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';

const ExamPage = () => {
  const router = useRouter();

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Exam Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push('/admin/exam/create')}
          sx={{ backgroundColor: '#7f56da' }}
        >
          Create Exam
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <QuizIcon sx={{ fontSize: 60, color: '#7f56da', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Exam Schedule</Typography>
              <Typography color="textSecondary">
                Create and manage exam schedules
              </Typography>
              <Button 
                variant="outlined" 
                sx={{ mt: 2 }}
                onClick={() => router.push('/admin/exam/schedule')}
              >
                View Schedule
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <AssignmentIcon sx={{ fontSize: 60, color: '#4caf50', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Exam Results</Typography>
              <Typography color="textSecondary">
                Enter and manage exam results
              </Typography>
              <Button 
                variant="outlined" 
                sx={{ mt: 2 }}
                onClick={() => router.push('/admin/exam/results')}
              >
                View Results
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <GradeIcon sx={{ fontSize: 60, color: '#ff9800', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Grade System</Typography>
              <Typography color="textSecondary">
                Configure grading and marking system
              </Typography>
              <Button 
                variant="outlined" 
                sx={{ mt: 2 }}
                onClick={() => router.push('/admin/exam/grades')}
              >
                Configure
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExamPage;
