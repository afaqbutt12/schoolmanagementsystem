'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
  IconButton,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const EditTransportPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState({
    routeName: '',
    busNumber: '',
    driverName: '',
    driverPhone: '',
    driverLicense: '',
    capacity: '',
    startTime: '',
    endTime: '',
    status: '',
  });
  const [stops, setStops] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [message, setMessage] = useState('');

  // Mock data
  const mockRoutes: { [key: string]: any } = {
    '1': { 
      routeName: 'Route A - North Zone', 
      busNumber: 'SCH-001', 
      capacity: '50',
      driverName: 'John Smith',
      driverPhone: '+1 234-567-8900',
      driverLicense: 'DL-12345678',
      startTime: '07:00',
      endTime: '08:30',
      status: 'Active',
      stops: ['Green Valley Apartments', 'Oak Street Corner', 'Pine Avenue', 'Maple Road Junction', 'Cedar Lane', 'Elm Street', 'Birch Boulevard', 'School Campus']
    },
    '2': { 
      routeName: 'Route B - South Zone', 
      busNumber: 'SCH-002', 
      capacity: '45',
      driverName: 'Mike Johnson',
      driverPhone: '+1 234-567-8901',
      driverLicense: 'DL-23456789',
      startTime: '07:15',
      endTime: '08:30',
      status: 'Active',
      stops: ['Sunset Heights', 'River Road', 'Lake View', 'Mountain Pass', 'Valley Drive', 'School Campus']
    },
  };

  useEffect(() => {
    const fetchRoute = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (mockRoutes[id]) {
        const data = mockRoutes[id];
        setFormData({
          routeName: data.routeName,
          busNumber: data.busNumber,
          driverName: data.driverName,
          driverPhone: data.driverPhone,
          driverLicense: data.driverLicense,
          capacity: data.capacity,
          startTime: data.startTime,
          endTime: data.endTime,
          status: data.status,
        });
        setStops(data.stops);
      }
      setFetchingData(false);
    };

    fetchRoute();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };

  const handleStopChange = (index: number, value: string) => {
    const newStops = [...stops];
    newStops[index] = value;
    setStops(newStops);
  };

  const addStop = () => {
    setStops([...stops, '']);
  };

  const removeStop = (index: number) => {
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // In real app, update via API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Route updated successfully!');
      setTimeout(() => router.push('/admin/transport'), 1500);
    } catch (err) {
      setMessage('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

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
          Edit Route
        </Typography>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 2 }}>
        {message && (
          <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Route Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Route Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Route Name"
                name="routeName"
                value={formData.routeName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Bus Number"
                name="busNumber"
                value={formData.busNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={(e) => handleChange(e as any)}
                  label="Status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Maintenance">Under Maintenance</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Schedule */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, mt: 2 }}>
                Schedule
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Pickup Start Time"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="School Arrival Time"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            {/* Driver Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, mt: 2 }}>
                Driver Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Driver Name"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Driver Phone"
                name="driverPhone"
                value={formData.driverPhone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="License Number"
                name="driverLicense"
                value={formData.driverLicense}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Stops */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Route Stops
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={addStop}
                >
                  Add Stop
                </Button>
              </Box>
            </Grid>
            {stops.map((stop, index) => (
              <Grid item xs={12} key={index}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip label={index + 1} size="small" sx={{ minWidth: 32 }} />
                  <TextField
                    fullWidth
                    size="small"
                    placeholder={`Stop ${index + 1}`}
                    value={stop}
                    onChange={(e) => handleStopChange(index, e.target.value)}
                  />
                  {stops.length > 1 && (
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => removeStop(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="outlined" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ backgroundColor: '#7f56da' }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Update Route'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditTransportPage;

