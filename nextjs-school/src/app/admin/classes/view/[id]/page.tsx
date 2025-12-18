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
  CircularProgress,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import ClassIcon from '@mui/icons-material/Class';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const ViewClassPage = () => {
  const router = useRouter();
  const params = useParams();
  const [classData, setClassData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await fetch(`/api/sclass/${params.id}`);
        const data = await res.json();
        if (res.ok) {
          setClassData(data);
        }
      } catch (error) {
        console.error('Failed to fetch class:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchClass();
    }
  }, [params.id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!classData) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>Class not found</Typography>
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
            Class Details
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => router.push(`/admin/classes/edit/${params.id}`)}
          sx={{ backgroundColor: '#7f56da' }}
        >
          Edit
        </Button>
      </Box>

      {/* Class Header */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box 
            sx={{ 
              backgroundColor: '#7f56da', 
              borderRadius: '16px', 
              p: 2.5,
            }}
          >
            <ClassIcon sx={{ color: 'white', fontSize: 48 }} />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {classData.sclassName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              School: {classData.school?.schoolName || 'N/A'}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e3f2fd' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <PeopleIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                {classData.studentsCount || 0}
              </Typography>
              <Typography variant="body1" color="textSecondary">Students</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e8f5e9' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <BookIcon sx={{ fontSize: 40, color: '#2e7d32', mb: 1 }} />
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                {classData.subjectsCount || 0}
              </Typography>
              <Typography variant="body1" color="textSecondary">Subjects</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 2, bgcolor: '#fff3e0' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <PersonIcon sx={{ fontSize: 40, color: '#ed6c02', mb: 1 }} />
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#ed6c02' }}>
                {classData.teachersCount || 0}
              </Typography>
              <Typography variant="body1" color="textSecondary">Teachers</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ borderRadius: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tab label={`Students (${classData.students?.length || 0})`} />
          <Tab label={`Subjects (${classData.subjects?.length || 0})`} />
          <Tab label={`Teachers (${classData.teachers?.length || 0})`} />
        </Tabs>

        {/* Students Tab */}
        <TabPanel value={tabValue} index={0}>
          <TableContainer sx={{ px: 2, pb: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Roll No</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classData.students && classData.students.length > 0 ? (
                  classData.students.map((student: any, index: number) => (
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
                      <TableCell>
                        <Chip label={student.rollNum || 'N/A'} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>{student.email || 'N/A'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography color="textSecondary">No students in this class</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Subjects Tab */}
        <TabPanel value={tabValue} index={1}>
          <TableContainer sx={{ px: 2, pb: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Subject Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Code</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classData.subjects && classData.subjects.length > 0 ? (
                  classData.subjects.map((subject: any, index: number) => (
                    <TableRow key={subject._id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <BookIcon color="action" />
                          {subject.subName}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={subject.subCode || 'N/A'} size="small" color="primary" variant="outlined" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Typography color="textSecondary">No subjects assigned to this class</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Teachers Tab */}
        <TabPanel value={tabValue} index={2}>
          <TableContainer sx={{ px: 2, pb: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classData.teachers && classData.teachers.length > 0 ? (
                  classData.teachers.map((teacher: any, index: number) => (
                    <TableRow key={teacher._id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ bgcolor: '#ed6c02', width: 32, height: 32 }}>
                            {teacher.name?.charAt(0)}
                          </Avatar>
                          {teacher.name}
                        </Box>
                      </TableCell>
                      <TableCell>{teacher.email || 'N/A'}</TableCell>
                      <TableCell>
                        <Chip 
                          label={teacher.teachSubject?.subName || 'Not Assigned'} 
                          size="small" 
                          color={teacher.teachSubject ? 'success' : 'default'}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography color="textSecondary">No teachers assigned to this class</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default ViewClassPage;

