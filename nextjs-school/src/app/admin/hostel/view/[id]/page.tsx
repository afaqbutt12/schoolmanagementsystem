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
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BedIcon from '@mui/icons-material/Bed';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BathtubIcon from '@mui/icons-material/Bathtub';

const ViewHostelRoomPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState<any>(null);

  // Mock data
  const mockRooms: { [key: string]: any } = {
    '1': { 
      _id: '1', 
      roomNumber: 'A-101', 
      floor: '1st Floor', 
      type: 'Double', 
      beds: 2, 
      occupied: 2, 
      status: 'Full',
      rent: 500,
      facilities: ['AC', 'Attached Bathroom', 'WiFi', 'Study Table', 'Wardrobe'],
      residents: [
        { name: 'John Doe', class: 'Class 10A', rollNum: '101', phone: '+1 234-567-8900' },
        { name: 'Mike Smith', class: 'Class 10B', rollNum: '102', phone: '+1 234-567-8901' },
      ]
    },
    '2': { 
      _id: '2', 
      roomNumber: 'A-102', 
      floor: '1st Floor', 
      type: 'Triple', 
      beds: 3, 
      occupied: 2, 
      status: 'Available',
      rent: 450,
      facilities: ['Fan', 'Common Bathroom', 'WiFi', 'Study Table'],
      residents: [
        { name: 'Alice Brown', class: 'Class 9A', rollNum: '201', phone: '+1 234-567-8902' },
        { name: 'Bob Wilson', class: 'Class 9B', rollNum: '202', phone: '+1 234-567-8903' },
      ]
    },
  };

  useEffect(() => {
    const fetchRoom = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (mockRooms[id]) {
        setRoom(mockRooms[id]);
      }
      setLoading(false);
    };

    fetchRoom();
  }, [id]);

  const getFacilityIcon = (facility: string) => {
    if (facility.toLowerCase().includes('wifi')) return <WifiIcon />;
    if (facility.toLowerCase().includes('ac')) return <AcUnitIcon />;
    if (facility.toLowerCase().includes('bathroom')) return <BathtubIcon />;
    return <CheckCircleIcon />;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!room) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5">Room not found</Typography>
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
            Room Details
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()}>
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => router.push(`/admin/hostel/edit/${id}`)}
            sx={{ backgroundColor: '#7f56da' }}
          >
            Edit
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Room Info Card */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ bgcolor: '#7f56da', color: 'white', p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <MeetingRoomIcon sx={{ fontSize: 50 }} />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Room {room.roomNumber}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {room.floor} • {room.type} Room
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto' }}>
                <Chip 
                  label={room.status} 
                  color={room.status === 'Available' ? 'success' : 'default'}
                  sx={{ fontWeight: 'bold', color: room.status === 'Available' ? undefined : 'white', bgcolor: room.status === 'Available' ? undefined : 'rgba(255,255,255,0.2)' }}
                />
              </Box>
            </Box>

            <Box sx={{ p: 3 }}>
              {/* Quick Stats */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={4}>
                  <Card sx={{ bgcolor: '#f5f5f5', boxShadow: 'none' }}>
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <BedIcon color="primary" />
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{room.beds}</Typography>
                      <Typography variant="caption" color="textSecondary">Total Beds</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{ bgcolor: '#f5f5f5', boxShadow: 'none' }}>
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <PersonIcon color="success" />
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{room.occupied}</Typography>
                      <Typography variant="caption" color="textSecondary">Occupied</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{ bgcolor: '#f5f5f5', boxShadow: 'none' }}>
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <AttachMoneyIcon color="warning" />
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>${room.rent}</Typography>
                      <Typography variant="caption" color="textSecondary">Monthly Rent</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Facilities */}
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Facilities
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                {room.facilities.map((facility: string, index: number) => (
                  <Chip 
                    key={index}
                    icon={getFacilityIcon(facility)}
                    label={facility}
                    variant="outlined"
                  />
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Residents */}
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Current Residents ({room.residents.length})
              </Typography>
              <List>
                {room.residents.map((resident: any, index: number) => (
                  <ListItem key={index} sx={{ bgcolor: '#f9f9f9', borderRadius: 1, mb: 1 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#7f56da' }}>
                        {resident.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={resident.name}
                      secondary={`${resident.class} • Roll: ${resident.rollNum} • ${resident.phone}`}
                    />
                  </ListItem>
                ))}
                {room.beds - room.occupied > 0 && (
                  <ListItem sx={{ bgcolor: '#e8f5e9', borderRadius: 1 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#4caf50' }}>
                        <BedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${room.beds - room.occupied} Bed(s) Available`}
                      secondary="Ready for allocation"
                    />
                  </ListItem>
                )}
              </List>
            </Box>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Room Summary
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary">Room Number</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>{room.roomNumber}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary">Floor</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>{room.floor}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary">Room Type</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>{room.type}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary">Occupancy</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>{room.occupied}/{room.beds} ({((room.occupied/room.beds)*100).toFixed(0)}%)</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="body2" color="textSecondary">Monthly Rent</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#7f56da' }}>${room.rent}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewHostelRoomPage;

