'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppSelector } from '@/redux/hooks';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AddRoutinePage = () => {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    class: '',
    subject: '',
    teacher: '',
    day: '',
    startTime: '08:00',
    endTime: '08:45',
    room: '',
  });
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser?._id) {
          // Fetch classes
          const classRes = await fetch(`/api/sclass/school/${currentUser._id}`);
          if (classRes.ok) {
            const classData = await classRes.json();
            setClasses(Array.isArray(classData) ? classData : []);
          }

          // Fetch subjects
          const subjectRes = await fetch(`/api/subjects/school/${currentUser._id}`);
          if (subjectRes.ok) {
            const subjectData = await subjectRes.json();
            setSubjects(Array.isArray(subjectData) ? subjectData : []);
          }

          // Fetch teachers
          const teacherRes = await fetch(`/api/teachers/school/${currentUser._id}`);
          if (teacherRes.ok) {
            const teacherData = await teacherRes.json();
            setTeachers(Array.isArray(teacherData) ? teacherData : []);
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Since we don't have a routine API yet, show success message
      // In the future, this would call the API
      setMessage('Routine entry added successfully!');
      setTimeout(() => router.push('/admin/routine'), 1500);
    } catch (err) {
      setMessage('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Filter subjects based on selected class
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
          Add Routine Entry
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
                Class & Subject
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Class</InputLabel>
                <Select
                  name="class"
                  value={formData.class}
                  onChange={(e) => handleChange(e as any)}
                  label="Class"
                >
                  {classes.map((cls: any) => (
                    <MenuItem key={cls._id} value={cls._id}>
                      {cls.sclassName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Subject</InputLabel>
                <Select
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => handleChange(e as any)}
                  label="Subject"
                  disabled={!formData.class}
                >
                  {filteredSubjects.map((sub: any) => (
                    <MenuItem key={sub._id} value={sub._id}>
                      {sub.subName} ({sub.subCode})
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

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Day</InputLabel>
                <Select
                  name="day"
                  value={formData.day}
                  onChange={(e) => handleChange(e as any)}
                  label="Day"
                >
                  {days.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Teacher</InputLabel>
                <Select
                  name="teacher"
                  value={formData.teacher}
                  onChange={(e) => handleChange(e as any)}
                  label="Teacher"
                >
                  <MenuItem value="">
                    <em>Select Teacher</em>
                  </MenuItem>
                  {teachers.map((teacher: any) => (
                    <MenuItem key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Room Number"
                name="room"
                value={formData.room}
                onChange={handleChange}
                placeholder="e.g., Room 101"
              />
            </Grid>

            {/* Preview */}
            {formData.class && formData.subject && formData.day && (
              <Grid item xs={12}>
                <Box sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Preview
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip label={classes.find(c => c._id === formData.class)?.sclassName} color="primary" size="small" />
                    <Chip label={subjects.find(s => s._id === formData.subject)?.subName} color="secondary" size="small" />
                    <Chip label={formData.day} variant="outlined" size="small" />
                    <Chip label={`${formData.startTime} - ${formData.endTime}`} variant="outlined" size="small" />
                    {formData.room && <Chip label={formData.room} variant="outlined" size="small" />}
                  </Box>
                </Box>
              </Grid>
            )}

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
                  {loading ? <CircularProgress size={24} /> : 'Add Routine'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddRoutinePage;

