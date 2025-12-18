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
  Chip,
  CircularProgress,
  Avatar,
  IconButton,
  TextField,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import { useAppSelector } from '@/redux/hooks';

const ExamResultsPage = () => {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.user);
  
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Mock results data
  const mockResults = [
    { _id: '1', name: 'John Doe', rollNum: '001', marks: 85, totalMarks: 100, grade: 'A', status: 'Pass' },
    { _id: '2', name: 'Jane Smith', rollNum: '002', marks: 92, totalMarks: 100, grade: 'A+', status: 'Pass' },
    { _id: '3', name: 'Bob Wilson', rollNum: '003', marks: 78, totalMarks: 100, grade: 'B+', status: 'Pass' },
    { _id: '4', name: 'Alice Brown', rollNum: '004', marks: 35, totalMarks: 100, grade: 'F', status: 'Fail' },
    { _id: '5', name: 'Charlie Davis', rollNum: '005', marks: 68, totalMarks: 100, grade: 'B', status: 'Pass' },
    { _id: '6', name: 'Eva Martinez', rollNum: '006', marks: 95, totalMarks: 100, grade: 'A+', status: 'Pass' },
    { _id: '7', name: 'Frank Garcia', rollNum: '007', marks: 42, totalMarks: 100, grade: 'D', status: 'Pass' },
    { _id: '8', name: 'Grace Lee', rollNum: '008', marks: 88, totalMarks: 100, grade: 'A', status: 'Pass' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser?._id) {
        try {
          const classRes = await fetch(`/api/sclass/school/${currentUser._id}`);
          if (classRes.ok) {
            const classData = await classRes.json();
            setClasses(Array.isArray(classData) ? classData : []);
          }

          const subjectRes = await fetch(`/api/subjects/school/${currentUser._id}`);
          if (subjectRes.ok) {
            const subjectData = await subjectRes.json();
            setSubjects(Array.isArray(subjectData) ? subjectData : []);
          }
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [currentUser]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return 'success';
    if (grade.includes('B')) return 'primary';
    if (grade.includes('C')) return 'info';
    if (grade.includes('D')) return 'warning';
    return 'error';
  };

  const paginatedResults = mockResults.slice(
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
            Exam Results
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={() => window.print()}
          >
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push('/admin/exam/results/add')}
            sx={{ backgroundColor: '#7f56da' }}
          >
            Enter Results
          </Button>
        </Box>
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
              <MenuItem value="">All Classes</MenuItem>
              {classes.map((cls: any) => (
                <MenuItem key={cls._id} value={cls._id}>
                  {cls.sclassName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Select Subject</InputLabel>
            <Select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              label="Select Subject"
            >
              <MenuItem value="">All Subjects</MenuItem>
              {subjects.map((sub: any) => (
                <MenuItem key={sub._id} value={sub._id}>
                  {sub.subName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Results Table */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Student</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Roll No</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Marks Obtained</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Total Marks</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Percentage</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Grade</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedResults.map((result, index) => (
                <TableRow key={result._id} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ bgcolor: '#7f56da', width: 32, height: 32 }}>
                        {result.name.charAt(0)}
                      </Avatar>
                      {result.name}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={result.rollNum} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>{result.marks}</TableCell>
                  <TableCell>{result.totalMarks}</TableCell>
                  <TableCell>{((result.marks / result.totalMarks) * 100).toFixed(1)}%</TableCell>
                  <TableCell>
                    <Chip 
                      label={result.grade} 
                      size="small" 
                      color={getGradeColor(result.grade) as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={result.status} 
                      size="small" 
                      color={result.status === 'Pass' ? 'success' : 'error'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" color="secondary">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={mockResults.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default ExamResultsPage;

