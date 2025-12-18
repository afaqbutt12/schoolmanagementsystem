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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppSelector } from '@/redux/hooks';

const ExamSchedulePage = () => {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.user);
  
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock exam data
  const mockExams = [
    { _id: '1', name: 'Midterm Exam', type: 'Midterm', subject: 'Mathematics', date: '2024-03-15', time: '09:00 - 12:00', totalMarks: 100, room: 'Hall A' },
    { _id: '2', name: 'Unit Test 1', type: 'Unit Test', subject: 'Physics', date: '2024-03-18', time: '10:00 - 11:30', totalMarks: 50, room: 'Room 101' },
    { _id: '3', name: 'Midterm Exam', type: 'Midterm', subject: 'English', date: '2024-03-20', time: '09:00 - 12:00', totalMarks: 100, room: 'Hall B' },
    { _id: '4', name: 'Quiz 1', type: 'Quiz', subject: 'Chemistry', date: '2024-03-22', time: '14:00 - 14:45', totalMarks: 25, room: 'Room 205' },
    { _id: '5', name: 'Practical Exam', type: 'Practical', subject: 'Biology', date: '2024-03-25', time: '10:00 - 13:00', totalMarks: 50, room: 'Lab 1' },
  ];

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Midterm': return 'primary';
      case 'Final': return 'error';
      case 'Quiz': return 'info';
      case 'Unit Test': return 'warning';
      case 'Practical': return 'success';
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
            Exam Schedule
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push('/admin/exam/create')}
          sx={{ backgroundColor: '#7f56da' }}
        >
          Add Exam
        </Button>
      </Box>

      {/* Filter */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Class</InputLabel>
          <Select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            label="Filter by Class"
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

      {/* Exam Table */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Exam Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Total Marks</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Room</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockExams.map((exam, index) => (
                <TableRow key={exam._id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 500 }}>{exam.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={exam.type} 
                      size="small" 
                      color={getTypeColor(exam.type) as any}
                    />
                  </TableCell>
                  <TableCell>{exam.subject}</TableCell>
                  <TableCell>{exam.date}</TableCell>
                  <TableCell>{exam.time}</TableCell>
                  <TableCell>{exam.totalMarks}</TableCell>
                  <TableCell>{exam.room}</TableCell>
                  <TableCell>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => router.push(`/admin/exam/schedule/view/${exam._id}`)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="secondary"
                      onClick={() => router.push(`/admin/exam/schedule/edit/${exam._id}`)}
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

export default ExamSchedulePage;

