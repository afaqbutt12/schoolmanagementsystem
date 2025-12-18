'use client';

import { useState, useEffect } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Chip,
  TextField,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const FinancialReportsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('monthly');

  // Mock data
  const stats = {
    totalRevenue: 485000,
    totalExpenses: 125000,
    pendingFees: 68500,
    netIncome: 360000,
  };

  const revenueBreakdown = [
    { category: 'Tuition Fees', amount: 320000, percentage: 66 },
    { category: 'Admission Fees', amount: 85000, percentage: 17.5 },
    { category: 'Exam Fees', amount: 45000, percentage: 9.3 },
    { category: 'Transport Fees', amount: 25000, percentage: 5.2 },
    { category: 'Library Fees', amount: 10000, percentage: 2 },
  ];

  const expenseBreakdown = [
    { category: 'Teacher Salaries', amount: 75000, percentage: 60 },
    { category: 'Staff Salaries', amount: 25000, percentage: 20 },
    { category: 'Utilities', amount: 12000, percentage: 9.6 },
    { category: 'Maintenance', amount: 8000, percentage: 6.4 },
    { category: 'Supplies', amount: 5000, percentage: 4 },
  ];

  const recentTransactions = [
    { id: 'TXN001', date: '2024-03-15', description: 'Fee Collection - Class 10', type: 'Income', amount: 45000, status: 'Completed' },
    { id: 'TXN002', date: '2024-03-14', description: 'Teacher Salary - March', type: 'Expense', amount: -25000, status: 'Completed' },
    { id: 'TXN003', date: '2024-03-13', description: 'Fee Collection - Class 9', type: 'Income', amount: 38000, status: 'Completed' },
    { id: 'TXN004', date: '2024-03-12', description: 'Utility Bills', type: 'Expense', amount: -4500, status: 'Pending' },
    { id: 'TXN005', date: '2024-03-11', description: 'Admission Fees', type: 'Income', amount: 15000, status: 'Completed' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
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
            Financial Reports
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()}>
            Print
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />} sx={{ backgroundColor: '#f44336' }}>
            Export PDF
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e8f5e9' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TrendingUpIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                  {formatCurrency(stats.totalRevenue)}
                </Typography>
                <Typography variant="body2" color="textSecondary">Total Revenue</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#ffebee' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TrendingDownIcon sx={{ fontSize: 40, color: '#c62828' }} />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#c62828' }}>
                  {formatCurrency(stats.totalExpenses)}
                </Typography>
                <Typography variant="body2" color="textSecondary">Total Expenses</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#fff3e0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PendingActionsIcon sx={{ fontSize: 40, color: '#ed6c02' }} />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ed6c02' }}>
                  {formatCurrency(stats.pendingFees)}
                </Typography>
                <Typography variant="body2" color="textSecondary">Pending Fees</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e3f2fd' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AccountBalanceWalletIcon sx={{ fontSize: 40, color: '#1976d2' }} />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  {formatCurrency(stats.netIncome)}
                </Typography>
                <Typography variant="body2" color="textSecondary">Net Income</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Period Filter */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Period</InputLabel>
          <Select value={period} onChange={(e) => setPeriod(e.target.value)} label="Period">
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Revenue Breakdown */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#2e7d32' }}>
              Revenue Breakdown
            </Typography>
            {revenueBreakdown.map((item, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">{item.category}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {formatCurrency(item.amount)} ({item.percentage}%)
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', bgcolor: '#e8f5e9', borderRadius: 1, height: 8 }}>
                  <Box sx={{ width: `${item.percentage}%`, bgcolor: '#4caf50', borderRadius: 1, height: '100%' }} />
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Expense Breakdown */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#c62828' }}>
              Expense Breakdown
            </Typography>
            {expenseBreakdown.map((item, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">{item.category}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {formatCurrency(item.amount)} ({item.percentage}%)
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', bgcolor: '#ffebee', borderRadius: 1, height: 8 }}>
                  <Box sx={{ width: `${item.percentage}%`, bgcolor: '#f44336', borderRadius: 1, height: '100%' }} />
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Transactions */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Recent Transactions
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Transaction ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentTransactions.map((txn) => (
                <TableRow key={txn.id} hover>
                  <TableCell>
                    <Chip label={txn.id} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{txn.description}</TableCell>
                  <TableCell>
                    <Chip 
                      label={txn.type} 
                      size="small" 
                      color={txn.type === 'Income' ? 'success' : 'error'}
                    />
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 'bold', 
                    color: txn.amount > 0 ? '#2e7d32' : '#c62828' 
                  }}>
                    {txn.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(txn.amount))}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={txn.status} 
                      size="small" 
                      color={txn.status === 'Completed' ? 'success' : 'warning'}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default FinancialReportsPage;

