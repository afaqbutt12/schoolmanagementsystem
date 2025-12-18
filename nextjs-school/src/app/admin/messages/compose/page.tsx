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
  Autocomplete,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useAppSelector } from '@/redux/hooks';

const ComposeMessagePage = () => {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    recipientType: '',
    recipients: [] as string[],
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Mock recipients
  const teachers = [
    { id: '1', name: 'Dr. Sarah Johnson', email: 'sarah.johnson@school.com' },
    { id: '2', name: 'Prof. Michael Chen', email: 'michael.chen@school.com' },
    { id: '3', name: 'Ms. Emily Davis', email: 'emily.davis@school.com' },
  ];

  const parents = [
    { id: '1', name: 'John Smith', email: 'john.smith@email.com', student: 'Alex Smith' },
    { id: '2', name: 'Mary Wilson', email: 'mary.wilson@email.com', student: 'Tom Wilson' },
    { id: '3', name: 'Robert Brown', email: 'robert.brown@email.com', student: 'Emma Brown' },
  ];

  const students = [
    { id: '1', name: 'Alex Smith', class: 'Class 10A', rollNum: '101' },
    { id: '2', name: 'Tom Wilson', class: 'Class 10B', rollNum: '102' },
    { id: '3', name: 'Emma Brown', class: 'Class 9A', rollNum: '201' },
  ];

  const getRecipientOptions = () => {
    switch (formData.recipientType) {
      case 'teachers':
        return teachers.map(t => ({ label: `${t.name} (${t.email})`, value: t.id }));
      case 'parents':
        return parents.map(p => ({ label: `${p.name} - Parent of ${p.student}`, value: p.id }));
      case 'students':
        return students.map(s => ({ label: `${s.name} (${s.class} - ${s.rollNum})`, value: s.id }));
      case 'all_teachers':
      case 'all_parents':
      case 'all_students':
        return [];
      default:
        return [];
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // In real app, send via API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Message sent successfully!');
      setTimeout(() => router.push('/admin/messages'), 1500);
    } catch (err) {
      setMessage('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessage('Draft saved!');
    } catch (err) {
      setMessage('Failed to save draft');
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
          Compose Message
        </Typography>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 2 }}>
        {message && (
          <Alert severity={message.includes('success') || message.includes('saved') ? 'success' : 'error'} sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSend}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Recipient Type</InputLabel>
                <Select
                  name="recipientType"
                  value={formData.recipientType}
                  onChange={(e) => {
                    handleChange(e as any);
                    setFormData(prev => ({ ...prev, recipients: [] }));
                  }}
                  label="Recipient Type"
                >
                  <MenuItem value="teachers">Select Teachers</MenuItem>
                  <MenuItem value="parents">Select Parents</MenuItem>
                  <MenuItem value="students">Select Students</MenuItem>
                  <MenuItem value="all_teachers">All Teachers</MenuItem>
                  <MenuItem value="all_parents">All Parents</MenuItem>
                  <MenuItem value="all_students">All Students</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {formData.recipientType && !formData.recipientType.startsWith('all_') && (
              <Grid item xs={12} md={6}>
                <Autocomplete
                  multiple
                  options={getRecipientOptions()}
                  getOptionLabel={(option) => option.label}
                  onChange={(_, newValue) => {
                    setFormData({ ...formData, recipients: newValue.map(v => v.value) });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Recipients" placeholder="Search..." />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option.label.split(' (')[0]}
                        {...getTagProps({ index })}
                        size="small"
                      />
                    ))
                  }
                />
              </Grid>
            )}

            {formData.recipientType.startsWith('all_') && (
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                  <Chip 
                    label={`Sending to ${formData.recipientType.replace('all_', 'All ').replace('_', ' ')}`}
                    color="primary"
                  />
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Enter message subject"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                multiline
                rows={10}
                required
                placeholder="Type your message here..."
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<AttachFileIcon />}
                >
                  Attach File
                </Button>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveDraft}
                    disabled={loading}
                  >
                    Save Draft
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                    disabled={loading}
                    sx={{ backgroundColor: '#7f56da' }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ComposeMessagePage;

