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

const EditTeacherPage = () => {
  const router = useRouter();
  const params = useParams();
  const { currentUser } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    teachSubject: '',
    teachSclass: '',
  });
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch teacher data
        const teacherRes = await fetch(`/api/teacher/${params.id}`);
        const teacherData = await teacherRes.json();
        
        if (teacherRes.ok) {
          setFormData({
            name: teacherData.name || '',
            email: teacherData.email || '',
            password: '', // Don't pre-fill password
            teachSubject: teacherData.teachSubject?._id || '',
            teachSclass: teacherData.teachSclass?._id || '',
          });
        }

        // Fetch classes using correct API path
        if (currentUser?._id) {
          const classRes = await fetch(`/api/sclass/school/${currentUser._id}`);
          if (classRes.ok) {
            const classData = await classRes.json();
            setClasses(Array.isArray(classData) ? classData : []);
          } else {
            setClasses([]);
          }

          // Fetch subjects using correct API path
          const subjectRes = await fetch(`/api/subjects/school/${currentUser._id}`);
          if (subjectRes.ok) {
            const subjectData = await subjectRes.json();
            setSubjects(Array.isArray(subjectData) ? subjectData : []);
          } else {
            setSubjects([]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id, currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const updateData: any = {
        name: formData.name,
        email: formData.email,
        teachSubject: formData.teachSubject || undefined,
        teachSclass: formData.teachSclass || undefined,
      };

      // Only include password if it's been changed
      if (formData.password) {
        updateData.password = formData.password;
      }

      const res = await fetch(`/api/teacher/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Teacher updated successfully!');
        setTimeout(() => router.push('/admin/teachers'), 1500);
      } else {
        setMessage(data.message || 'Failed to update teacher');
      }
    } catch (err) {
      setMessage('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
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
          Edit Teacher
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
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Personal Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
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
              <TextField
                fullWidth
                label="New Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                helperText="Leave blank to keep current password"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, mt: 2 }}>
                Teaching Assignment
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Assigned Class</InputLabel>
                <Select
                  name="teachSclass"
                  value={formData.teachSclass}
                  onChange={(e) => handleChange(e as any)}
                  label="Assigned Class"
                >
                  <MenuItem value="">
                    <em>Not Assigned</em>
                  </MenuItem>
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
                <InputLabel>Assigned Subject</InputLabel>
                <Select
                  name="teachSubject"
                  value={formData.teachSubject}
                  onChange={(e) => handleChange(e as any)}
                  label="Assigned Subject"
                >
                  <MenuItem value="">
                    <em>Not Assigned</em>
                  </MenuItem>
                  {subjects.map((subject: any) => (
                    <MenuItem key={subject._id} value={subject._id}>
                      {subject.subName} {subject.subCode ? `(${subject.subCode})` : ''}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="outlined" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={saving}
                  sx={{ backgroundColor: '#7f56da' }}
                >
                  {saving ? <CircularProgress size={24} /> : 'Update Teacher'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditTeacherPage;
