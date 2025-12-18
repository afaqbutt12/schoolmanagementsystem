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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import { useAppSelector } from '@/redux/hooks';

const ViewFeePage = () => {
  const router = useRouter();
  const params = useParams();
  const { currentUser } = useAppSelector((state) => state.user);
  const [fee, setFee] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFee = async () => {
      try {
        const res = await fetch(`/api/fee/${params.id}`);
        const data = await res.json();
        if (res.ok) {
          setFee(data);
        }
      } catch (error) {
        console.error('Failed to fetch fee:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchFee();
    }
  }, [params.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'success';
      case 'Unpaid': return 'error';
      case 'Pending': return 'warning';
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

  if (!fee) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>Fee record not found</Typography>
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
            Fee Details
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
            onClick={() => router.push(`/admin/account/fees/edit/${params.id}`)}
            sx={{ backgroundColor: '#7f56da' }}
          >
            Edit
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Invoice #{fee._id?.slice(-8).toUpperCase()}
          </Typography>
          <Chip 
            label={fee.status} 
            color={getStatusColor(fee.status) as any}
            size="medium"
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">Student Information</Typography>
            <Box sx={{ mt: 1, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography><strong>Student ID:</strong> {fee.studentId}</Typography>
              <Typography><strong>Name:</strong> {fee.studentName}</Typography>
              <Typography><strong>Class:</strong> {fee.class} - {fee.section}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">Fee Information</Typography>
            <Box sx={{ mt: 1, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography><strong>Fee Type:</strong> {fee.expenseType}</Typography>
              <Typography><strong>Due Date:</strong> {new Date(fee.dueDate).toLocaleDateString()}</Typography>
              <Typography><strong>Payment Method:</strong> {fee.paymentMethod || 'N/A'}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Total Amount</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#7f56da' }}>
                ${fee.amount}
              </Typography>
            </Box>
          </Grid>

          {fee.remarks && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">Remarks</Typography>
              <Box sx={{ mt: 1, p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
                <Typography>{fee.remarks}</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default ViewFeePage;

