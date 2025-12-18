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
import { registerUser } from '@/redux/userRelated/userHandle';

const AddStudentPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const { sclassesList, loading: classLoading } = useAppSelector((state) => state.sclass);
  const { status, response, error } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    rollNum: '',
    password: '',
    sclassName: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getAllSclasses(currentUser._id, 'sclass'));
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
      const studentData = {
        ...formData,
        adminID: currentUser._id,
        school: currentUser._id,
        role: 'Student',
      };

      const res = await fetch('/api/student/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Student added successfully!');
        setTimeout(() => router.push('/admin/students'), 1500);
      } else {
        setMessage(data.message || 'Failed to add student');
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
          Add New Student
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
                label="Student Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Roll Number"
                name="rollNum"
                type="number"
                value={formData.rollNum}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Class</InputLabel>
                <Select
                  name="sclassName"
                  value={formData.sclassName}
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
                  {loading ? <CircularProgress size={24} /> : 'Add Student'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddStudentPage;

