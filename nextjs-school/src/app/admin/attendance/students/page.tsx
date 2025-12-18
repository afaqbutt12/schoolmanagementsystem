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
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  CircularProgress,
  Avatar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppSelector } from '@/redux/hooks';

const StudentAttendancePage = () => {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.user);
  
  const [classes, setClasses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedClass && currentUser?._id) {
        try {
          const res = await fetch(`/api/students/school/${currentUser._id}`);
          if (res.ok) {
            const data = await res.json();
            const filtered = Array.isArray(data) 
              ? data.filter((s: any) => s.sclassName?._id === selectedClass || s.sclassName === selectedClass)
              : [];
            setStudents(filtered);
          }
        } catch (error) {
          console.error('Failed to fetch students:', error);
        }
      }
    };

    fetchStudents();
  }, [selectedClass, currentUser]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Mock attendance data - in real app, this would come from API
  const getAttendanceStatus = (studentId: string) => {
    const statuses = ['Present', 'Absent', 'Late'];
    return statuses[Math.floor(Math.random() * 3)];
  };

  const paginatedStudents = students.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Student Attendance Records
        </Typography>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Select Class</InputLabel>
            <Select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              label="Select Class"
            >
              {classes.map((cls: any) => (
                <MenuItem key={cls._id} value={cls._id}>
                  {cls.sclassName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 200 }}
          />
        </Box>
      </Paper>

      {/* Attendance Table */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        {selectedClass ? (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Student</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Roll No</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedStudents.length > 0 ? (
                    paginatedStudents.map((student: any, index: number) => {
                      const status = getAttendanceStatus(student._id);
                      return (
                        <TableRow key={student._id} hover>
                          <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Avatar sx={{ bgcolor: '#7f56da', width: 32, height: 32 }}>
                                {student.name?.charAt(0)}
                              </Avatar>
                              {student.name}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip label={student.rollNum || 'N/A'} size="small" variant="outlined" />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              icon={status === 'Present' ? <CheckCircleIcon /> : status === 'Absent' ? <CancelIcon /> : undefined}
                              label={status} 
                              size="small" 
                              color={status === 'Present' ? 'success' : status === 'Absent' ? 'error' : 'warning'}
                            />
                          </TableCell>
                          <TableCell>{selectedDate}</TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Typography color="textSecondary">
                          No students found in this class
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={students.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography color="textSecondary">
              Please select a class to view attendance records
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default StudentAttendancePage;

