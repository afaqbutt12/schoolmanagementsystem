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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAllSclasses } from '@/redux/sclassRelated/sclassHandle';

const AddTeacherPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const { sclassesList } = useAppSelector((state) => state.sclass);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    teachSclass: '',
    teachSubject: '',
  });
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getAllSclasses(currentUser._id, 'sclass'));
      // Fetch subjects
      fetch(`/api/subjects/school/${currentUser._id}`)
        .then(res => res.json())
        .then(data => {
          if (!data.message) setSubjects(data);
        })
        .catch(console.error);
    }
  }, [dispatch, currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setMessage('User not authenticated');
      return;
    }
    
    setLoading(true);
    setMessage('');

    try {
      const teacherData = {
        ...formData,
        school: currentUser._id,
        role: 'Teacher',
      };

      const res = await fetch('/api/teacher/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacherData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Teacher added successfully!');
        setTimeout(() => router.push('/admin/teachers'), 1500);
      } else {
        setMessage(data.message || 'Failed to add teacher');
      }
    } catch (err) {
      setMessage('An error occurred');
    } finally {
      setLoading(false);
    }
  };

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
          Add New Teacher
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Teacher Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                  name="teachSclass"
                  value={formData.teachSclass}
                  onChange={(e) => handleChange(e as any)}
                  label="Class"
                >
                  {Array.isArray(sclassesList) && sclassesList.map((sclass: any) => (
                    <MenuItem key={sclass._id} value={sclass._id}>
                      {sclass.sclassName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Subject</InputLabel>
                <Select
                  name="teachSubject"
                  value={formData.teachSubject}
                  onChange={(e) => handleChange(e as any)}
                  label="Subject"
                >
                  {subjects.map((subject: any) => (
                    <MenuItem key={subject._id} value={subject._id}>
                      {subject.subName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ backgroundColor: '#7f56da' }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Add Teacher'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddTeacherPage;

