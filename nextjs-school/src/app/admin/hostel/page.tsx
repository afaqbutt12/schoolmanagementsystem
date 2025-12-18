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
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PeopleIcon from '@mui/icons-material/People';
import BedIcon from '@mui/icons-material/Bed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const HostelPage = () => {
  const router = useRouter();

  // Mock data
  const stats = {
    totalRooms: 50,
    occupiedRooms: 42,
    totalBeds: 200,
    occupiedBeds: 168,
  };

  const rooms = [
    { _id: '1', roomNumber: 'A-101', floor: '1st Floor', type: 'Double', beds: 2, occupied: 2, status: 'Full' },
    { _id: '2', roomNumber: 'A-102', floor: '1st Floor', type: 'Triple', beds: 3, occupied: 2, status: 'Available' },
    { _id: '3', roomNumber: 'A-103', floor: '1st Floor', type: 'Double', beds: 2, occupied: 2, status: 'Full' },
    { _id: '4', roomNumber: 'B-201', floor: '2nd Floor', type: 'Single', beds: 1, occupied: 1, status: 'Full' },
    { _id: '5', roomNumber: 'B-202', floor: '2nd Floor', type: 'Double', beds: 2, occupied: 0, status: 'Available' },
    { _id: '6', roomNumber: 'B-203', floor: '2nd Floor', type: 'Triple', beds: 3, occupied: 3, status: 'Full' },
    { _id: '7', roomNumber: 'C-301', floor: '3rd Floor', type: 'Double', beds: 2, occupied: 1, status: 'Available' },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Hostel Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push('/admin/hostel/add')}
          sx={{ backgroundColor: '#7f56da' }}
        >
          Add Room
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e3f2fd' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <MeetingRoomIcon sx={{ fontSize: 40, color: '#1976d2' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  {stats.totalRooms}
                </Typography>
                <Typography variant="body2" color="textSecondary">Total Rooms</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e8f5e9' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CheckCircleIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                  {stats.occupiedRooms}
                </Typography>
                <Typography variant="body2" color="textSecondary">Occupied Rooms</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#fff3e0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <BedIcon sx={{ fontSize: 40, color: '#ed6c02' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ed6c02' }}>
                  {stats.totalBeds}
                </Typography>
                <Typography variant="body2" color="textSecondary">Total Beds</Typography>
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
                  {stats.occupiedBeds}
                </Typography>
                <Typography variant="body2" color="textSecondary">Occupied Beds</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Rooms Table */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Hostel Rooms
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Room Number</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Floor</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Beds</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Occupied</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room, index) => (
                <TableRow key={room._id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{room.roomNumber}</TableCell>
                  <TableCell>{room.floor}</TableCell>
                  <TableCell>
                    <Chip label={room.type} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>{room.beds}</TableCell>
                  <TableCell>{room.occupied}/{room.beds}</TableCell>
                  <TableCell>
                    <Chip 
                      label={room.status} 
                      size="small" 
                      color={room.status === 'Available' ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => router.push(`/admin/hostel/view/${room._id}`)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="secondary"
                      onClick={() => router.push(`/admin/hostel/edit/${room._id}`)}
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

export default HostelPage;
