'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ClassIcon from '@mui/icons-material/Class';
import PeopleIcon from '@mui/icons-material/People';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAllSclasses } from '@/redux/sclassRelated/sclassHandle';

const ClassesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const { sclassesList, loading, getresponse } = useAppSelector((state) => state.sclass);

  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getAllSclasses(currentUser._id, 'sclass'));
    }
  }, [dispatch, currentUser]);

  const handleView = (classId: string) => {
    router.push(`/admin/classes/view/${classId}`);
  };

  const handleEdit = (classId: string) => {
    router.push(`/admin/classes/edit/${classId}`);
  };

  const handleDeleteClick = (sclass: any) => {
    setSelectedClass(sclass);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedClass && currentUser?._id) {
      try {
        const res = await fetch(`/api/sclass/${selectedClass._id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          dispatch(getAllSclasses(currentUser._id, 'sclass'));
        }
      } catch (error) {
        console.error('Failed to delete class:', error);
      }
    }
    setDeleteDialogOpen(false);
    setSelectedClass(null);
  };

  const filteredClasses = Array.isArray(sclassesList)
    ? sclassesList.filter((sclass: any) =>
        sclass.sclassName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

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
          All Classes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push('/admin/classes/add')}
          sx={{ backgroundColor: '#7f56da' }}
        >
          Add Class
        </Button>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <TextField
          placeholder="Search classes..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {filteredClasses.length > 0 ? (
        <Grid container spacing={3}>
          {filteredClasses.map((sclass: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={sclass._id}>
              <Card 
                sx={{ 
                  borderRadius: 2, 
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box 
                      sx={{ 
                        backgroundColor: '#7f56da', 
                        borderRadius: '12px', 
                        p: 1.5,
                        mr: 2 
                      }}
                    >
                      <ClassIcon sx={{ color: 'white', fontSize: 28 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {sclass.sclassName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip 
                      icon={<PeopleIcon />} 
                      label="View Students" 
                      size="small" 
                      variant="outlined"
                      onClick={() => handleView(sclass._id)}
                      sx={{ cursor: 'pointer' }}
                    />
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => handleView(sclass._id)}
                    title="View"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="secondary"
                    onClick={() => handleEdit(sclass._id)}
                    title="Edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleDeleteClick(sclass)}
                    title="Delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Typography color="textSecondary">
            {getresponse || 'No classes found'}
          </Typography>
        </Paper>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete &quot;{selectedClass?.sclassName}&quot;? 
            This will also delete all students, subjects, and teacher assignments related to this class.
            This action cannot be undone.
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

export default ClassesPage;
