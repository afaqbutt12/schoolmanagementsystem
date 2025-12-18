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
  Chip,
  CircularProgress,
  Divider,
  Avatar,
  Card,
  CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import BookIcon from '@mui/icons-material/Book';
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';

const ViewSubjectPage = () => {
  const router = useRouter();
  const params = useParams();
  const [subject, setSubject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await fetch(`/api/subject/${params.id}`);
        const data = await res.json();
        if (res.ok) {
          setSubject(data);
        }
      } catch (error) {
        console.error('Failed to fetch subject:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchSubject();
    }
  }, [params.id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!subject) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>Subject not found</Typography>
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
            Subject Details
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => router.push(`/admin/subjects/edit/${params.id}`)}
          sx={{ backgroundColor: '#7f56da' }}
        >
          Edit
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Subject Header Card */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box 
                sx={{ 
                  backgroundColor: '#7f56da', 
                  borderRadius: '16px', 
                  p: 2.5,
                }}
              >
                <BookIcon sx={{ color: 'white', fontSize: 48 }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {subject.subName}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Chip 
                    icon={<CodeIcon />} 
                    label={subject.subCode} 
                    color="primary" 
                    size="medium"
                  />
                  <Chip 
                    icon={<AccessTimeIcon />} 
                    label={`${subject.sessions} Sessions`} 
                    variant="outlined" 
                    size="medium"
                  />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Class Info Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <ClassIcon sx={{ color: '#1976d2', fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Class Information
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 1 }}>
                <Typography variant="body2" color="textSecondary">Assigned Class</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  {subject.sclassName?.sclassName || 'Not Assigned'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Teacher Info Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <PersonIcon sx={{ color: '#ed6c02', fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Teacher Information
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {subject.teacher ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: '#ed6c02', width: 56, height: 56 }}>
                    {subject.teacher.name?.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {subject.teacher.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {subject.teacher.email || 'No email'}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1, textAlign: 'center' }}>
                  <Typography color="textSecondary">
                    No teacher assigned to this subject
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    sx={{ mt: 1 }}
                    onClick={() => router.push(`/admin/subjects/edit/${params.id}`)}
                  >
                    Assign Teacher
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* School Info Card */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <SchoolIcon sx={{ color: '#2e7d32', fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  School Information
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">School Name</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {subject.school?.schoolName || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">Subject ID</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {subject._id}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewSubjectPage;

