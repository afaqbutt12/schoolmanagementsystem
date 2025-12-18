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
  TextField,
  Checkbox,
  CircularProgress,
  Avatar,
  Alert,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { useAppSelector } from '@/redux/hooks';

const TakeAttendancePage = () => {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.user);
  
  const [classes, setClasses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

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
            // Initialize attendance as present for all
            const initialAttendance: Record<string, string> = {};
            filtered.forEach((s: any) => {
              initialAttendance[s._id] = 'Present';
            });
            setAttendance(initialAttendance);
          }
        } catch (error) {
          console.error('Failed to fetch students:', error);
        }
      }
    };

    fetchStudents();
  }, [selectedClass, currentUser]);

  const handleAttendanceChange = (studentId: string, status: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleMarkAllPresent = () => {
    const allPresent: Record<string, string> = {};
    students.forEach((s: any) => {
      allPresent[s._id] = 'Present';
    });
    setAttendance(allPresent);
  };

  const handleMarkAllAbsent = () => {
    const allAbsent: Record<string, string> = {};
    students.forEach((s: any) => {
      allAbsent[s._id] = 'Absent';
    });
    setAttendance(allAbsent);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      // In real app, this would save to API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Attendance saved successfully!');
      setTimeout(() => router.push('/admin/attendance'), 1500);
    } catch (error) {
      setMessage('Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  const presentCount = Object.values(attendance).filter(s => s === 'Present').length;
  const absentCount = Object.values(attendance).filter(s => s === 'Absent').length;
  const lateCount = Object.values(attendance).filter(s => s === 'Late').length;

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
          Take Attendance
        </Typography>
      </Box>

      {message && (
        <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}

      {/* Selection */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
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
          {selectedClass && (
            <>
              <Button variant="outlined" onClick={handleMarkAllPresent}>
                Mark All Present
              </Button>
              <Button variant="outlined" color="error" onClick={handleMarkAllAbsent}>
                Mark All Absent
              </Button>
            </>
          )}
        </Box>
      </Paper>

      {/* Summary */}
      {selectedClass && students.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Chip label={`Total: ${students.length}`} color="default" />
          <Chip label={`Present: ${presentCount}`} color="success" />
          <Chip label={`Absent: ${absentCount}`} color="error" />
          <Chip label={`Late: ${lateCount}`} color="warning" />
        </Box>
      )}

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
                    <TableCell sx={{ fontWeight: 'bold' }}>Present</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Absent</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Late</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.length > 0 ? (
                    students.map((student: any, index: number) => (
                      <TableRow key={student._id} hover>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ bgcolor: '#7f56da', width: 32, height: 32 }}>
                              {student.name?.charAt(0)}
                            </Avatar>
                            {student.name}
                          </Box>
                        </TableCell>
                        <TableCell>{student.rollNum || 'N/A'}</TableCell>
                        <TableCell>
                          <Checkbox
                            checked={attendance[student._id] === 'Present'}
                            onChange={() => handleAttendanceChange(student._id, 'Present')}
                            color="success"
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={attendance[student._id] === 'Absent'}
                            onChange={() => handleAttendanceChange(student._id, 'Absent')}
                            color="error"
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={attendance[student._id] === 'Late'}
                            onChange={() => handleAttendanceChange(student._id, 'Late')}
                            color="warning"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Typography color="textSecondary">
                          No students found in this class
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {students.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button
                  variant="contained"
                  startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                  onClick={handleSave}
                  disabled={saving}
                  sx={{ backgroundColor: '#7f56da' }}
                >
                  {saving ? 'Saving...' : 'Save Attendance'}
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography color="textSecondary">
              Please select a class to take attendance
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default TakeAttendancePage;

