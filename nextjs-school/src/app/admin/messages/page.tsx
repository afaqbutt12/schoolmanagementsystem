'use client';

import { useState } from 'react';
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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  IconButton,
  Divider,
  Badge,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MessageIcon from '@mui/icons-material/Message';
import InboxIcon from '@mui/icons-material/Inbox';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const MessagesPage = () => {
  const router = useRouter();
  const [starred, setStarred] = useState<string[]>([]);

  // Mock data
  const stats = {
    inbox: 24,
    sent: 15,
    drafts: 3,
    unread: 8,
  };

  const messages = [
    { _id: '1', from: 'John Smith', subject: 'Regarding Student Performance', preview: 'I wanted to discuss the recent exam results...', date: '2024-03-15 10:30 AM', read: false, type: 'Parent' },
    { _id: '2', from: 'Dr. Sarah Johnson', subject: 'Class Schedule Change', preview: 'Please note that the Mathematics class has been...', date: '2024-03-15 09:15 AM', read: true, type: 'Teacher' },
    { _id: '3', from: 'Mike Wilson', subject: 'Leave Application', preview: 'I would like to request leave for my son...', date: '2024-03-14 04:45 PM', read: false, type: 'Parent' },
    { _id: '4', from: 'Emily Davis', subject: 'Event Planning', preview: 'Regarding the upcoming annual day celebration...', date: '2024-03-14 02:30 PM', read: true, type: 'Teacher' },
    { _id: '5', from: 'Robert Brown', subject: 'Fee Payment Query', preview: 'I have a question regarding the fee structure...', date: '2024-03-13 11:00 AM', read: true, type: 'Parent' },
    { _id: '6', from: 'Alice Chen', subject: 'Library Books Return', preview: 'This is a reminder about the overdue library books...', date: '2024-03-13 09:00 AM', read: false, type: 'Staff' },
  ];

  const toggleStar = (id: string) => {
    setStarred(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Parent': return 'primary';
      case 'Teacher': return 'success';
      case 'Staff': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Messages
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push('/admin/messages/compose')}
          sx={{ backgroundColor: '#7f56da' }}
        >
          New Message
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <List>
              <ListItem 
                button 
                selected
                sx={{ borderRadius: 1, mb: 1, bgcolor: '#f3e5f5' }}
              >
                <ListItemAvatar>
                  <Badge badgeContent={stats.unread} color="error">
                    <InboxIcon color="primary" />
                  </Badge>
                </ListItemAvatar>
                <ListItemText primary="Inbox" secondary={`${stats.inbox} messages`} />
              </ListItem>
              <ListItem 
                button 
                sx={{ borderRadius: 1, mb: 1 }}
                onClick={() => router.push('/admin/messages/sent')}
              >
                <ListItemAvatar>
                  <SendIcon color="action" />
                </ListItemAvatar>
                <ListItemText primary="Sent" secondary={`${stats.sent} messages`} />
              </ListItem>
              <ListItem 
                button 
                sx={{ borderRadius: 1, mb: 1 }}
                onClick={() => router.push('/admin/messages/drafts')}
              >
                <ListItemAvatar>
                  <DraftsIcon color="action" />
                </ListItemAvatar>
                <ListItemText primary="Drafts" secondary={`${stats.drafts} messages`} />
              </ListItem>
              <ListItem 
                button 
                sx={{ borderRadius: 1 }}
                onClick={() => router.push('/admin/messages/trash')}
              >
                <ListItemAvatar>
                  <DeleteIcon color="action" />
                </ListItemAvatar>
                <ListItemText primary="Trash" />
              </ListItem>
            </List>
          </Paper>

          {/* Quick Stats */}
          <Paper sx={{ p: 2, borderRadius: 2, mt: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Message Stats
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="textSecondary">Unread</Typography>
              <Chip label={stats.unread} size="small" color="error" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="textSecondary">Total Inbox</Typography>
              <Chip label={stats.inbox} size="small" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="textSecondary">Sent Today</Typography>
              <Chip label="5" size="small" color="success" />
            </Box>
          </Paper>
        </Grid>

        {/* Message List */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ borderRadius: 2 }}>
            <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Inbox
              </Typography>
            </Box>
            <List sx={{ p: 0 }}>
              {messages.map((message, index) => (
                <Box key={message._id}>
                  <ListItem
                    sx={{ 
                      py: 2,
                      cursor: 'pointer',
                      bgcolor: message.read ? 'transparent' : '#f5f5f5',
                      '&:hover': { bgcolor: '#fafafa' }
                    }}
                    onClick={() => router.push(`/admin/messages/view/${message._id}`)}
                    secondaryAction={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption" color="textSecondary">
                          {message.date}
                        </Typography>
                        <IconButton 
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(message._id);
                          }}
                        >
                          {starred.includes(message._id) ? (
                            <StarIcon sx={{ color: '#ffc107' }} />
                          ) : (
                            <StarBorderIcon />
                          )}
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#7f56da' }}>
                        {message.from.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography 
                            sx={{ fontWeight: message.read ? 'normal' : 'bold' }}
                          >
                            {message.from}
                          </Typography>
                          <Chip 
                            label={message.type} 
                            size="small" 
                            color={getTypeColor(message.type) as any}
                            sx={{ height: 20 }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: message.read ? 'normal' : 'bold',
                              color: 'text.primary'
                            }}
                          >
                            {message.subject}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="textSecondary"
                            sx={{ 
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: 400
                            }}
                          >
                            {message.preview}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < messages.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MessagesPage;
