'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useAppSelector } from '@/redux/hooks';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeSlots = [
  '08:00 AM - 08:45 AM',
  '08:45 AM - 09:30 AM',
  '09:30 AM - 10:15 AM',
  '10:15 AM - 10:30 AM (Break)',
  '10:30 AM - 11:15 AM',
  '11:15 AM - 12:00 PM',
  '12:00 PM - 12:45 PM',
  '12:45 PM - 01:30 PM (Lunch)',
  '01:30 PM - 02:15 PM',
  '02:15 PM - 03:00 PM',
];

const RoutinePage = () => {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.user);
  const [routines, setRoutines] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState<any>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      if (currentUser?._id) {
        try {
          const res = await fetch(`/api/sclass/school/${currentUser._id}`);
          if (res.ok) {
            const data = await res.json();
            setClasses(Array.isArray(data) ? data : []);
          }
        } catch (error) {
          console.error('Failed to fetch classes:', error);
        }
      }
      setLoading(false);
    };

    fetchClasses();
  }, [currentUser]);

  const handleDeleteClick = (routine: any) => {
    setSelectedRoutine(routine);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    // Delete logic here when API is available
    setDeleteDialogOpen(false);
    setSelectedRoutine(null);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Class Routine
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push('/admin/routine/add')}
          sx={{ backgroundColor: '#7f56da' }}
        >
          Add Routine
        </Button>
      </Box>

      {/* Class Filter */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select Class</InputLabel>
          <Select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            label="Select Class"
          >
            <MenuItem value="">All Classes</MenuItem>
            {classes.map((cls: any) => (
              <MenuItem key={cls._id} value={cls._id}>
                {cls.sclassName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {/* Routine Table */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        {selectedClass ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#7f56da' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Time</TableCell>
                  {days.map((day) => (
                    <TableCell key={day} sx={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                      {day}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {timeSlots.map((slot, index) => (
                  <TableRow 
                    key={index} 
                    hover
                    sx={{ 
                      backgroundColor: slot.includes('Break') || slot.includes('Lunch') ? '#f5f5f5' : 'inherit'
                    }}
                  >
                    <TableCell sx={{ fontWeight: 500, minWidth: 180 }}>
                      {slot}
                    </TableCell>
                    {days.map((day) => (
                      <TableCell key={day} sx={{ textAlign: 'center', minWidth: 120 }}>
                        {slot.includes('Break') || slot.includes('Lunch') ? (
                          <Chip 
                            label={slot.includes('Break') ? 'Break' : 'Lunch'} 
                            size="small" 
                            color="default"
                          />
                        ) : (
                          <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                            -
                          </Box>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <ScheduleIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Select a Class to View Routine
            </Typography>
            <Typography color="textSecondary">
              Choose a class from the dropdown above to view or manage its schedule.
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this routine entry? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RoutinePage;
