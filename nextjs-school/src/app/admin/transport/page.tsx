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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RouteIcon from '@mui/icons-material/Route';
import PeopleIcon from '@mui/icons-material/People';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

const TransportPage = () => {
  const router = useRouter();

  // Mock data
  const stats = {
    totalBuses: 12,
    totalRoutes: 8,
    totalDrivers: 15,
    activeStudents: 450,
  };

  const routes = [
    { _id: '1', routeName: 'Route A - North Zone', busNumber: 'SCH-001', driver: 'John Smith', stops: 8, students: 45, status: 'Active' },
    { _id: '2', routeName: 'Route B - South Zone', busNumber: 'SCH-002', driver: 'Mike Johnson', stops: 6, students: 38, status: 'Active' },
    { _id: '3', routeName: 'Route C - East Zone', busNumber: 'SCH-003', driver: 'David Wilson', stops: 10, students: 52, status: 'Active' },
    { _id: '4', routeName: 'Route D - West Zone', busNumber: 'SCH-004', driver: 'Robert Brown', stops: 7, students: 41, status: 'Inactive' },
    { _id: '5', routeName: 'Route E - Central', busNumber: 'SCH-005', driver: 'James Davis', stops: 5, students: 35, status: 'Active' },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Transport Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push('/admin/transport/add')}
          sx={{ backgroundColor: '#7f56da' }}
        >
          Add Route
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e3f2fd' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <DirectionsBusIcon sx={{ fontSize: 40, color: '#1976d2' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  {stats.totalBuses}
                </Typography>
                <Typography variant="body2" color="textSecondary">Total Buses</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e8f5e9' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <RouteIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                  {stats.totalRoutes}
                </Typography>
                <Typography variant="body2" color="textSecondary">Total Routes</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#fff3e0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LocalGasStationIcon sx={{ fontSize: 40, color: '#ed6c02' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ed6c02' }}>
                  {stats.totalDrivers}
                </Typography>
                <Typography variant="body2" color="textSecondary">Total Drivers</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#f3e5f5' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PeopleIcon sx={{ fontSize: 40, color: '#7b1fa2' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#7b1fa2' }}>
                  {stats.activeStudents}
                </Typography>
                <Typography variant="body2" color="textSecondary">Students Using</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Routes Table */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Bus Routes
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Route Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Bus Number</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Driver</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Stops</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Students</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {routes.map((route, index) => (
                <TableRow key={route._id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{route.routeName}</TableCell>
                  <TableCell>
                    <Chip label={route.busNumber} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>{route.driver}</TableCell>
                  <TableCell>{route.stops}</TableCell>
                  <TableCell>{route.students}</TableCell>
                  <TableCell>
                    <Chip 
                      label={route.status} 
                      size="small" 
                      color={route.status === 'Active' ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => router.push(`/admin/transport/view/${route._id}`)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="secondary"
                      onClick={() => router.push(`/admin/transport/edit/${route._id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
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

export default TransportPage;
