'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Divider,
  Chip,
  Card,
  CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const ViewNoticePage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [notice, setNotice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await fetch(`/api/notice/${id}`);
        if (res.ok) {
          const data = await res.json();
          setNotice(data);
        }
      } catch (error) {
        console.error('Failed to fetch notice:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNotice();
    }
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!notice) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5">Notice not found</Typography>
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
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Notice Details
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={() => window.print()}
          >
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => router.push(`/admin/notices/edit/${id}`)}
            sx={{ backgroundColor: '#7f56da' }}
          >
            Edit
          </Button>
        </Box>
      </Box>

      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* Header */}
        <Box sx={{ 
          bgcolor: '#7f56da', 
          color: 'white', 
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <NotificationsActiveIcon sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {notice.title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              Official School Notice
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: 4 }}>
          {/* Meta Info */}
          <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
            <Card sx={{ bgcolor: '#f5f5f5', boxShadow: 'none', minWidth: 150 }}>
              <CardContent sx={{ py: 1.5, px: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon sx={{ color: '#7f56da', fontSize: 20 }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Date</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {new Date(notice.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {notice.school && (
              <Card sx={{ bgcolor: '#f5f5f5', boxShadow: 'none', minWidth: 150 }}>
                <CardContent sx={{ py: 1.5, px: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                    <Box>
                      <Typography variant="caption" color="textSecondary">Posted By</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {notice.school.schoolName || 'Admin'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Notice Content */}
          <Box>
            <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
              Notice Content
            </Typography>
            <Paper 
              sx={{ 
                p: 3, 
                bgcolor: '#fafafa', 
                borderRadius: 2,
                border: '1px solid #e0e0e0'
              }}
            >
              <Typography 
                variant="body1" 
                sx={{ 
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.8
                }}
              >
                {notice.details}
              </Typography>
            </Paper>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 4, pt: 2, borderTop: '1px dashed #e0e0e0' }}>
            <Typography variant="caption" color="textSecondary">
              Notice ID: {notice._id}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ViewNoticePage;

