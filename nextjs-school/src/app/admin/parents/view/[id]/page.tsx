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
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';

const ViewParentPage = () => {
  const router = useRouter();
  const params = useParams();
  const [parent, setParent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParent = async () => {
      try {
        const res = await fetch(`/api/parent/${params.id}`);
        const data = await res.json();
        if (res.ok) {
          setParent(data);
        }
      } catch (error) {
        console.error('Failed to fetch parent:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchParent();
    }
  }, [params.id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!parent) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>Parent record not found</Typography>
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
            Parent Details
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => router.push(`/admin/parents/edit/${params.id}`)}
          sx={{ backgroundColor: '#7f56da' }}
        >
          Edit
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: '#7f56da',
                fontSize: '3rem',
                mx: 'auto',
                mb: 2,
              }}
            >
              {parent.firstName?.charAt(0)}{parent.lastName?.charAt(0)}
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              {parent.firstName} {parent.lastName}
            </Typography>
            <Chip label={parent.gender} size="small" sx={{ mb: 2 }} />
            
            {parent.shortBio && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                {parent.shortBio}
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Details Card */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Personal Information
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <EmailIcon color="action" />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Email</Typography>
                    <Typography>{parent.email || 'N/A'}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <PhoneIcon color="action" />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Phone</Typography>
                    <Typography>{parent.phone || 'N/A'}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <WorkIcon color="action" />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Occupation</Typography>
                    <Typography>{parent.occupation || 'N/A'}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <PersonIcon color="action" />
                  <Box>
                    <Typography variant="caption" color="textSecondary">ID Number</Typography>
                    <Typography>{parent.idNo || 'N/A'}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <BloodtypeIcon color="action" />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Blood Group</Typography>
                    <Chip label={parent.bloodGroup} size="small" color="error" />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <PersonIcon color="action" />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Religion</Typography>
                    <Typography>{parent.religion}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
                  <LocationOnIcon color="action" />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Address</Typography>
                    <Typography>{parent.address || 'N/A'}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Children Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Children ({parent.children?.length || 0})
            </Typography>
            
            {parent.children && parent.children.length > 0 ? (
              <Grid container spacing={2}>
                {parent.children.map((child: any, index: number) => (
                  <Grid item xs={12} sm={6} md={4} key={child._id || index}>
                    <Card variant="outlined">
                      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: '#4caf50' }}>
                          {child.name?.charAt(0) || 'S'}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            {child.name || `Student ${index + 1}`}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {child.sclassName?.sclassName || child.class || 'Class N/A'}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography color="textSecondary">No children linked to this parent</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewParentPage;

