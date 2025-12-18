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
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';

const ViewTransportPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState<any>(null);

  // Mock data
  const mockRoutes: { [key: string]: any } = {
    '1': { 
      _id: '1', 
      routeName: 'Route A - North Zone', 
      busNumber: 'SCH-001', 
      capacity: 50,
      driver: { name: 'John Smith', phone: '+1 234-567-8900', license: 'DL-12345678' },
      startTime: '07:00',
      endTime: '08:30',
      students: 45, 
      status: 'Active',
      stops: ['Green Valley Apartments', 'Oak Street Corner', 'Pine Avenue', 'Maple Road Junction', 'Cedar Lane', 'Elm Street', 'Birch Boulevard', 'School Campus']
    },
    '2': { 
      _id: '2', 
      routeName: 'Route B - South Zone', 
      busNumber: 'SCH-002', 
      capacity: 45,
      driver: { name: 'Mike Johnson', phone: '+1 234-567-8901', license: 'DL-23456789' },
      startTime: '07:15',
      endTime: '08:30',
      students: 38, 
      status: 'Active',
      stops: ['Sunset Heights', 'River Road', 'Lake View', 'Mountain Pass', 'Valley Drive', 'School Campus']
    },
  };

  useEffect(() => {
    const fetchRoute = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (mockRoutes[id]) {
        setRoute(mockRoutes[id]);
      }
      setLoading(false);
    };

    fetchRoute();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!route) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5">Route not found</Typography>
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
            Route Details
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()}>
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => router.push(`/admin/transport/edit/${id}`)}
            sx={{ backgroundColor: '#7f56da' }}
          >
            Edit
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Route Info Card */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ bgcolor: '#1976d2', color: 'white', p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <DirectionsBusIcon sx={{ fontSize: 50 }} />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {route.routeName}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Bus: {route.busNumber} • Capacity: {route.capacity} seats
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto' }}>
                <Chip 
                  label={route.status} 
                  color={route.status === 'Active' ? 'success' : 'default'}
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>
            </Box>

            <Box sx={{ p: 3 }}>
              {/* Schedule */}
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Schedule
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Card sx={{ bgcolor: '#f5f5f5', boxShadow: 'none' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon color="primary" />
                      <Box>
                        <Typography variant="caption" color="textSecondary">Pickup Start</Typography>
                        <Typography variant="h6">{route.startTime} AM</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ bgcolor: '#f5f5f5', boxShadow: 'none' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon color="success" />
                      <Box>
                        <Typography variant="caption" color="textSecondary">School Arrival</Typography>
                        <Typography variant="h6">{route.endTime} AM</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Route Stops */}
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Route Stops ({route.stops.length})
              </Typography>
              <List dense>
                {route.stops.map((stop: string, index: number) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Avatar 
                        sx={{ 
                          width: 24, 
                          height: 24, 
                          fontSize: 12,
                          bgcolor: index === route.stops.length - 1 ? '#4caf50' : '#1976d2'
                        }}
                      >
                        {index + 1}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={stop}
                      primaryTypographyProps={{ 
                        fontWeight: index === route.stops.length - 1 ? 'bold' : 'normal'
                      }}
                    />
                    {index === route.stops.length - 1 && (
                      <Chip label="Destination" size="small" color="success" />
                    )}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Driver Info */}
          <Paper sx={{ p: 3, borderRadius: 2, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Driver Information
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar sx={{ bgcolor: '#7f56da', width: 50, height: 50 }}>
                {route.driver.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {route.driver.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">Driver</Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <PhoneIcon fontSize="small" color="action" />
              <Typography variant="body2">{route.driver.phone}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BadgeIcon fontSize="small" color="action" />
              <Typography variant="body2">{route.driver.license}</Typography>
            </Box>
          </Paper>

          {/* Stats */}
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Route Statistics
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <PeopleIcon color="primary" />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {route.students}
                </Typography>
                <Typography variant="body2" color="textSecondary">Students Enrolled</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <LocationOnIcon color="error" />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {route.stops.length}
                </Typography>
                <Typography variant="body2" color="textSecondary">Total Stops</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <DirectionsBusIcon color="success" />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {route.capacity - route.students}
                </Typography>
                <Typography variant="body2" color="textSecondary">Available Seats</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewTransportPage;

