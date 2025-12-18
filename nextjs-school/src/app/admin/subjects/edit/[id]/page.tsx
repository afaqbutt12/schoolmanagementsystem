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

const EditSubjectPage = () => {
  const router = useRouter();
  const params = useParams();
  const { currentUser } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    subName: '',
    subCode: '',
    sessions: '',
    sclassName: '',
    teacher: '',
  });
  const [classes, setClasses] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch subject data
        const subjectRes = await fetch(`/api/subject/${params.id}`);
        const subjectData = await subjectRes.json();
        
        if (subjectRes.ok) {
          setFormData({
            subName: subjectData.subName || '',
            subCode: subjectData.subCode || '',
            sessions: subjectData.sessions || '',
            sclassName: subjectData.sclassName?._id || '',
            teacher: subjectData.teacher?._id || '',
          });
        }

        // Fetch classes and teachers
        if (currentUser?._id) {
          const classRes = await fetch(`/api/sclass/school/${currentUser._id}`);
          if (classRes.ok) {
            const classData = await classRes.json();
            setClasses(Array.isArray(classData) ? classData : []);
          }

          const teacherRes = await fetch(`/api/teachers/school/${currentUser._id}`);
          if (teacherRes.ok) {
            const teacherData = await teacherRes.json();
            setTeachers(Array.isArray(teacherData) ? teacherData : []);
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
        subName: formData.subName,
        subCode: formData.subCode,
        sessions: formData.sessions,
        sclassName: formData.sclassName,
      };

      // Only include teacher if selected
      if (formData.teacher) {
        updateData.teacher = formData.teacher;
      }

      const res = await fetch(`/api/subject/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Subject updated successfully!');
        setTimeout(() => router.push('/admin/subjects'), 1500);
      } else {
        setMessage(data.message || 'Failed to update subject');
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
          Edit Subject
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
                Subject Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Subject Name"
                name="subName"
                value={formData.subName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Subject Code"
                name="subCode"
                value={formData.subCode}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Sessions (per week)"
                name="sessions"
                type="number"
                value={formData.sessions}
                onChange={handleChange}
                required
                inputProps={{ min: 1 }}
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
                  {classes.map((cls: any) => (
                    <MenuItem key={cls._id} value={cls._id}>
                      {cls.sclassName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, mt: 2 }}>
                Teacher Assignment
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Assign Teacher</InputLabel>
                <Select
                  name="teacher"
                  value={formData.teacher}
                  onChange={(e) => handleChange(e as any)}
                  label="Assign Teacher"
                >
                  <MenuItem value="">
                    <em>Not Assigned</em>
                  </MenuItem>
                  {teachers.map((teacher: any) => (
                    <MenuItem key={teacher._id} value={teacher._id}>
                      {teacher.name} ({teacher.email})
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
                  {saving ? <CircularProgress size={24} /> : 'Update Subject'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditSubjectPage;

