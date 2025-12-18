'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Chip,
  CircularProgress,
  Divider,
  Avatar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PaymentIcon from '@mui/icons-material/Payment';

const ViewTeacherPaymentPage = () => {
  const router = useRouter();
  const params = useParams();
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await fetch(`/api/teacher-payment/${params.id}`);
        const data = await res.json();
        if (res.ok) {
          setPayment(data);
        }
      } catch (error) {
        console.error('Failed to fetch payment:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPayment();
    }
  }, [params.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'success';
      case 'Pending': return 'warning';
      case 'Partial': return 'info';
      case 'Overdue': return 'error';
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

  if (!payment) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>Payment record not found</Typography>
        <Button onClick={() => router.back()} sx={{ mt: 2 }}>Go Back</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
            Payment Details
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
            onClick={() => router.push(`/admin/teachers/payment/edit/${params.id}`)}
            sx={{ backgroundColor: '#7f56da' }}
          >
            Edit
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Teacher Info Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: '#7f56da',
                fontSize: '2.5rem',
                mx: 'auto',
                mb: 2,
              }}
            >
              {payment.teacherName?.charAt(0)}
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              {payment.teacherName}
            </Typography>
            <Chip label={payment.teacherId} size="small" variant="outlined" sx={{ mb: 2 }} />
            
            <Box sx={{ mt: 2, textAlign: 'left' }}>
              {payment.email && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <EmailIcon color="action" fontSize="small" />
                  <Typography variant="body2">{payment.email}</Typography>
                </Box>
              )}
              {payment.phone && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <PhoneIcon color="action" fontSize="small" />
                  <Typography variant="body2">{payment.phone}</Typography>
                </Box>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="textSecondary">Gender:</Typography>
                <Typography variant="body2">{payment.gender}</Typography>
              </Box>
            </Box>
          </Paper>

          {/* Teaching Info */}
          <Paper sx={{ p: 3, borderRadius: 2, mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Teaching Details
            </Typography>
            <Box sx={{ mb: 1.5 }}>
              <Typography variant="body2" color="textSecondary">Class</Typography>
              <Typography variant="body1">Class {payment.class}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">Subject</Typography>
              <Typography variant="body1">{payment.subject}</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Payment Details Card */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Payment Information
              </Typography>
              <Chip 
                label={payment.status} 
                color={getStatusColor(payment.status) as any}
                size="medium"
              />
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="body2" color="textSecondary">Payment Period</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {payment.month} {payment.year}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ p: 2, bgcolor: '#e8f5e9', borderRadius: 1 }}>
                  <Typography variant="body2" color="textSecondary">Amount</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                    ${payment.amount}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon color="action" fontSize="small" />
                  <Box>
                    <Typography variant="body2" color="textSecondary">Due Date</Typography>
                    <Typography>{payment.dueDate ? new Date(payment.dueDate).toLocaleDateString() : 'N/A'}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon color="action" fontSize="small" />
                  <Box>
                    <Typography variant="body2" color="textSecondary">Payment Date</Typography>
                    <Typography>
                      {payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : 'Not Paid Yet'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Transaction Details
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PaymentIcon color="action" fontSize="small" />
                  <Box>
                    <Typography variant="body2" color="textSecondary">Payment Method</Typography>
                    <Typography>{payment.paymentMethod || 'N/A'}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="body2" color="textSecondary">Transaction ID</Typography>
                  <Typography>{payment.transactionId || 'N/A'}</Typography>
                </Box>
              </Grid>
            </Grid>

            {payment.description && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Description
                </Typography>
                <Box sx={{ p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
                  <Typography>{payment.description}</Typography>
                </Box>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewTeacherPaymentPage;

