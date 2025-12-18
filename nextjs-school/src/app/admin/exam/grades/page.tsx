'use client';

import { useState } from 'react';
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
  TextField,
  IconButton,
  Alert,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const GradeSystemPage = () => {
  const router = useRouter();
  
  const [grades, setGrades] = useState([
    { id: '1', grade: 'A+', minMarks: 90, maxMarks: 100, gpa: 4.0, description: 'Outstanding' },
    { id: '2', grade: 'A', minMarks: 80, maxMarks: 89, gpa: 3.7, description: 'Excellent' },
    { id: '3', grade: 'B+', minMarks: 70, maxMarks: 79, gpa: 3.3, description: 'Very Good' },
    { id: '4', grade: 'B', minMarks: 60, maxMarks: 69, gpa: 3.0, description: 'Good' },
    { id: '5', grade: 'C+', minMarks: 50, maxMarks: 59, gpa: 2.5, description: 'Satisfactory' },
    { id: '6', grade: 'C', minMarks: 40, maxMarks: 49, gpa: 2.0, description: 'Pass' },
    { id: '7', grade: 'F', minMarks: 0, maxMarks: 39, gpa: 0.0, description: 'Fail' },
  ]);
  const [editing, setEditing] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const handleSave = () => {
    setMessage('Grade system updated successfully!');
    setEditing(null);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleGradeChange = (id: string, field: string, value: string | number) => {
    setGrades(prev => prev.map(g => 
      g.id === id ? { ...g, [field]: value } : g
    ));
  };

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
            Grade System Configuration
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{ backgroundColor: '#7f56da' }}
        >
          Save Changes
        </Button>
      </Box>

      {message && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e8f5e9' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                {grades.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">Grade Levels</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#e3f2fd' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                40%
              </Typography>
              <Typography variant="body2" color="textSecondary">Pass Percentage</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#fff3e0' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ed6c02' }}>
                4.0
              </Typography>
              <Typography variant="body2" color="textSecondary">Max GPA</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, bgcolor: '#f3e5f5' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#7b1fa2' }}>
                100
              </Typography>
              <Typography variant="body2" color="textSecondary">Max Marks</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Grade Table */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Grade Distribution
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            size="small"
          >
            Add Grade
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Grade</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Min Marks</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Max Marks</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>GPA</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grades.map((grade) => (
                <TableRow key={grade.id} hover>
                  <TableCell>
                    {editing === grade.id ? (
                      <TextField
                        size="small"
                        value={grade.grade}
                        onChange={(e) => handleGradeChange(grade.id, 'grade', e.target.value)}
                        sx={{ width: 80 }}
                      />
                    ) : (
                      <Typography sx={{ fontWeight: 'bold', color: grade.grade === 'F' ? '#c62828' : '#2e7d32' }}>
                        {grade.grade}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {editing === grade.id ? (
                      <TextField
                        size="small"
                        type="number"
                        value={grade.minMarks}
                        onChange={(e) => handleGradeChange(grade.id, 'minMarks', parseInt(e.target.value))}
                        sx={{ width: 80 }}
                      />
                    ) : (
                      grade.minMarks
                    )}
                  </TableCell>
                  <TableCell>
                    {editing === grade.id ? (
                      <TextField
                        size="small"
                        type="number"
                        value={grade.maxMarks}
                        onChange={(e) => handleGradeChange(grade.id, 'maxMarks', parseInt(e.target.value))}
                        sx={{ width: 80 }}
                      />
                    ) : (
                      grade.maxMarks
                    )}
                  </TableCell>
                  <TableCell>
                    {editing === grade.id ? (
                      <TextField
                        size="small"
                        type="number"
                        value={grade.gpa}
                        onChange={(e) => handleGradeChange(grade.id, 'gpa', parseFloat(e.target.value))}
                        sx={{ width: 80 }}
                        inputProps={{ step: 0.1 }}
                      />
                    ) : (
                      grade.gpa.toFixed(1)
                    )}
                  </TableCell>
                  <TableCell>
                    {editing === grade.id ? (
                      <TextField
                        size="small"
                        value={grade.description}
                        onChange={(e) => handleGradeChange(grade.id, 'description', e.target.value)}
                        sx={{ width: 150 }}
                      />
                    ) : (
                      grade.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editing === grade.id ? (
                      <Button size="small" onClick={() => setEditing(null)}>Done</Button>
                    ) : (
                      <>
                        <IconButton size="small" color="secondary" onClick={() => setEditing(grade.id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
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

export default GradeSystemPage;

