'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Avatar,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  TextField,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ForwardIcon from '@mui/icons-material/Forward';
import SendIcon from '@mui/icons-material/Send';

const ViewMessagePage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<any>(null);
  const [starred, setStarred] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Mock data
  const mockMessages: { [key: string]: any } = {
    '1': { 
      _id: '1', 
      from: { name: 'John Smith', email: 'john.smith@email.com', type: 'Parent', avatar: 'J' },
      to: 'Admin',
      subject: 'Regarding Student Performance', 
      body: `Dear Admin,

I wanted to discuss the recent exam results of my son Alex Smith (Class 10A, Roll No. 101).

I noticed that his performance in Mathematics has declined compared to the previous term. I would like to request a meeting with his class teacher to understand the areas where he needs improvement.

Additionally, I wanted to inquire about the availability of extra tutoring sessions that the school offers.

Please let me know a convenient time for the meeting.

Best regards,
John Smith
Parent of Alex Smith`,
      date: '2024-03-15 10:30 AM',
      read: true,
    },
    '2': { 
      _id: '2', 
      from: { name: 'Dr. Sarah Johnson', email: 'sarah.johnson@school.com', type: 'Teacher', avatar: 'S' },
      to: 'Admin',
      subject: 'Class Schedule Change', 
      body: `Dear Admin,

Please note that the Mathematics class for Class 10A has been rescheduled due to a conflict with the science lab sessions.

New Schedule:
- Monday: 9:00 AM - 10:00 AM (instead of 10:00 AM - 11:00 AM)
- Wednesday: 2:00 PM - 3:00 PM (no change)
- Friday: 11:00 AM - 12:00 PM (instead of 9:00 AM - 10:00 AM)

This change will be effective from next Monday. Please update the master timetable and inform the students.

Thank you,
Dr. Sarah Johnson
Mathematics Department`,
      date: '2024-03-15 09:15 AM',
      read: true,
    },
  };

  useEffect(() => {
    const fetchMessage = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (mockMessages[id]) {
        setMessage(mockMessages[id]);
      }
      setLoading(false);
    };

    fetchMessage();
  }, [id]);

  const handleSendReply = () => {
    // In real app, send reply via API
    alert('Reply sent!');
    setShowReply(false);
    setReplyText('');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Parent': return 'primary';
      case 'Teacher': return 'success';
      case 'Staff': return 'warning';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!message) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5">Message not found</Typography>
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
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Message
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={() => setStarred(!starred)}>
            {starred ? <StarIcon sx={{ color: '#ffc107' }} /> : <StarBorderIcon />}
          </IconButton>
          <IconButton onClick={() => window.print()}>
            <PrintIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* Header */}
        <Box sx={{ p: 3, bgcolor: '#fafafa', borderBottom: '1px solid #eee' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            {message.subject}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#7f56da', width: 48, height: 48 }}>
              {message.from.avatar}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {message.from.name}
                </Typography>
                <Chip 
                  label={message.from.type} 
                  size="small" 
                  color={getTypeColor(message.from.type) as any}
                />
              </Box>
              <Typography variant="body2" color="textSecondary">
                {message.from.email}
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary">
              {message.date}
            </Typography>
          </Box>
        </Box>

        {/* Body */}
        <Box sx={{ p: 3 }}>
          <Typography 
            sx={{ 
              whiteSpace: 'pre-wrap',
              lineHeight: 1.8,
              color: 'text.primary'
            }}
          >
            {message.body}
          </Typography>
        </Box>

        {/* Actions */}
        <Divider />
        <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<ReplyIcon />}
            onClick={() => setShowReply(!showReply)}
            sx={{ backgroundColor: '#7f56da' }}
          >
            Reply
          </Button>
          <Button
            variant="outlined"
            startIcon={<ForwardIcon />}
          >
            Forward
          </Button>
        </Box>

        {/* Reply Box */}
        {showReply && (
          <Box sx={{ p: 3, bgcolor: '#f5f5f5', borderTop: '1px solid #eee' }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>
              Reply to {message.from.name}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={5}
              placeholder="Type your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              sx={{ mb: 2, bgcolor: 'white' }}
            />
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => setShowReply(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={handleSendReply}
                disabled={!replyText.trim()}
                sx={{ backgroundColor: '#7f56da' }}
              >
                Send Reply
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ViewMessagePage;

