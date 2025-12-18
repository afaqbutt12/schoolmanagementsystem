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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EditHostelRoomPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState({
    roomNumber: '',
    floor: '',
    type: '',
    beds: '',
    rent: '',
    facilities: '',
    status: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [message, setMessage] = useState('');

  // Mock data
  const mockRooms: { [key: string]: any } = {
    '1': { 
      roomNumber: 'A-101', 
      floor: '1st Floor', 
      type: 'Double', 
      beds: '2', 
      rent: '500',
      facilities: 'AC, Attached Bathroom, WiFi, Study Table, Wardrobe',
      status: 'Full'
    },
    '2': { 
      roomNumber: 'A-102', 
      floor: '1st Floor', 
      type: 'Triple', 
      beds: '3', 
      rent: '450',
      facilities: 'Fan, Common Bathroom, WiFi, Study Table',
      status: 'Available'
    },
  };

  useEffect(() => {
    const fetchRoom = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (mockRooms[id]) {
        setFormData(mockRooms[id]);
      }
      setFetchingData(false);
    };

    fetchRoom();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // In real app, update via API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Room updated successfully!');
      setTimeout(() => router.push('/admin/hostel'), 1500);
    } catch (err) {
      setMessage('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const floors = ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor'];
  const roomTypes = ['Single', 'Double', 'Triple', 'Dormitory'];

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
          Edit Room
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
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Room Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Room Number"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Floor</InputLabel>
                <Select
                  name="floor"
                  value={formData.floor}
                  onChange={(e) => handleChange(e as any)}
                  label="Floor"
                >
                  {floors.map((floor) => (
                    <MenuItem key={floor} value={floor}>{floor}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Room Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={(e) => handleChange(e as any)}
                  label="Room Type"
                >
                  {roomTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Number of Beds"
                name="beds"
                type="number"
                value={formData.beds}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Monthly Rent"
                name="rent"
                type="number"
                value={formData.rent}
                onChange={handleChange}
                required
                InputProps={{ startAdornment: '$' }}
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
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Full">Full</MenuItem>
                  <MenuItem value="Maintenance">Under Maintenance</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Facilities"
                name="facilities"
                value={formData.facilities}
                onChange={handleChange}
                multiline
                rows={3}
                placeholder="e.g., AC, Attached Bathroom, WiFi, Study Table, Wardrobe"
              />
            </Grid>

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
                  {loading ? <CircularProgress size={24} /> : 'Update Room'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditHostelRoomPage;

