'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppSelector } from '@/redux/hooks';

const EditExamPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { currentUser } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    examName: '',
    examType: '',
    class: '',
    subject: '',
    date: '',
    startTime: '',
    endTime: '',
    totalMarks: '',
    passingMarks: '',
    room: '',
    instructions: '',
  });
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [message, setMessage] = useState('');

  // Mock exam data - in real app, fetch from API
  const mockExams: { [key: string]: any } = {
    '1': { examName: 'Midterm Exam', examType: 'Midterm', class: '', subject: '', date: '2024-03-15', startTime: '09:00', endTime: '12:00', totalMarks: '100', passingMarks: '40', room: 'Hall A', instructions: 'Bring calculator and ID card' },
    '2': { examName: 'Unit Test 1', examType: 'Unit Test', class: '', subject: '', date: '2024-03-18', startTime: '10:00', endTime: '11:30', totalMarks: '50', passingMarks: '20', room: 'Room 101', instructions: '' },
    '3': { examName: 'Midterm Exam', examType: 'Midterm', class: '', subject: '', date: '2024-03-20', startTime: '09:00', endTime: '12:00', totalMarks: '100', passingMarks: '40', room: 'Hall B', instructions: '' },
    '4': { examName: 'Quiz 1', examType: 'Quiz', class: '', subject: '', date: '2024-03-22', startTime: '14:00', endTime: '14:45', totalMarks: '25', passingMarks: '10', room: 'Room 205', instructions: '' },
    '5': { examName: 'Practical Exam', examType: 'Practical', class: '', subject: '', date: '2024-03-25', startTime: '10:00', endTime: '13:00', totalMarks: '50', passingMarks: '20', room: 'Lab 1', instructions: 'Wear lab coat' },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load exam data
        if (mockExams[id]) {
          setFormData(mockExams[id]);
        }

        if (currentUser?._id) {
          const classRes = await fetch(`/api/sclass/school/${currentUser._id}`);
          if (classRes.ok) {
            const classData = await classRes.json();
            setClasses(Array.isArray(classData) ? classData : []);
          }

          const subjectRes = await fetch(`/api/subjects/school/${currentUser._id}`);
          if (subjectRes.ok) {
            const subjectData = await subjectRes.json();
            setSubjects(Array.isArray(subjectData) ? subjectData : []);
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
  }, [currentUser, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // In real app, this would update via API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Exam updated successfully!');
      setTimeout(() => router.push('/admin/exam/schedule'), 1500);
    } catch (err) {
      setMessage('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const examTypes = ['Midterm', 'Final', 'Quiz', 'Unit Test', 'Practical', 'Assignment'];

  const filteredSubjects = formData.class 
    ? subjects.filter((sub: any) => sub.sclassName?._id === formData.class || sub.sclassName === formData.class)
    : subjects;

  if (fetchingData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Edit Exam
        </Typography>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 2 }}>
        {message && (
          <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Exam Details
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Exam Name"
                name="examName"
                value={formData.examName}
                onChange={handleChange}
                required
                placeholder="e.g., Midterm Examination 2024"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Exam Type</InputLabel>
                <Select
                  name="examType"
                  value={formData.examType}
                  onChange={(e) => handleChange(e as any)}
                  label="Exam Type"
                >
                  {examTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                  name="class"
                  value={formData.class}
                  onChange={(e) => handleChange(e as any)}
                  label="Class"
                >
                  <MenuItem value="">Select Class</MenuItem>
                  {classes.map((cls: any) => (
                    <MenuItem key={cls._id} value={cls._id}>
                      {cls.sclassName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Subject</InputLabel>
                <Select
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => handleChange(e as any)}
                  label="Subject"
                  disabled={!formData.class}
                >
                  <MenuItem value="">Select Subject</MenuItem>
                  {filteredSubjects.map((sub: any) => (
                    <MenuItem key={sub._id} value={sub._id}>
                      {sub.subName} {sub.subCode ? `(${sub.subCode})` : ''}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, mt: 2 }}>
                Schedule
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Start Time"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="End Time"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, mt: 2 }}>
                Marks & Room
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Total Marks"
                name="totalMarks"
                type="number"
                value={formData.totalMarks}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Passing Marks"
                name="passingMarks"
                type="number"
                value={formData.passingMarks}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Room/Hall"
                name="room"
                value={formData.room}
                onChange={handleChange}
                placeholder="e.g., Hall A"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                multiline
                rows={3}
                placeholder="Exam instructions for students..."
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="outlined" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ backgroundColor: '#7f56da' }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Update Exam'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditExamPage;

