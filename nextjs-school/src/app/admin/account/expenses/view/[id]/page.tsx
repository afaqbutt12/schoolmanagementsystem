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

const ViewExpensePage = () => {
  const router = useRouter();
  const params = useParams();
  const [expense, setExpense] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await fetch(`/api/expense/${params.id}`);
        const data = await res.json();
        if (res.ok) {
          setExpense(data);
        }
      } catch (error) {
        console.error('Failed to fetch expense:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchExpense();
    }
  }, [params.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'success';
      case 'Due': return 'warning';
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

  if (!expense) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>Expense record not found</Typography>
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
            Expense Details
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
            onClick={() => router.push(`/admin/account/expenses/edit/${params.id}`)}
            sx={{ backgroundColor: '#7f56da' }}
          >
            Edit
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {expense.name}
          </Typography>
          <Chip 
            label={expense.status} 
            color={getStatusColor(expense.status) as any}
            size="medium"
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">Expense Information</Typography>
            <Box sx={{ mt: 1, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography><strong>Type:</strong> {expense.expenseType}</Typography>
              <Typography><strong>Category:</strong> {expense.category}</Typography>
              <Typography><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">Payment Details</Typography>
            <Box sx={{ mt: 1, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography><strong>Vendor:</strong> {expense.vendor || 'N/A'}</Typography>
              <Typography><strong>Invoice #:</strong> {expense.invoiceNumber || 'N/A'}</Typography>
              <Typography><strong>Status:</strong> {expense.status}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Total Amount</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f44336' }}>
                ${expense.amount}
              </Typography>
            </Box>
          </Grid>

          {expense.description && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">Description</Typography>
              <Box sx={{ mt: 1, p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
                <Typography>{expense.description}</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default ViewExpensePage;

