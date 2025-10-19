import React, { useEffect, useState } from 'react';
import { getTeacherDetails, deleteTeacher } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Typography,
    Paper,
    Avatar,
    Button,
    Chip,
    Breadcrumbs,
    Link,
    Grid,
    Card,
    CardContent,
    Divider,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import {
    Home as HomeIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Print as PrintIcon,
    Download as DownloadIcon,
    School as SchoolIcon,
    Subject as SubjectIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon,
    Person as PersonIcon,
    Work as WorkIcon
} from '@mui/icons-material';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const handleEdit = () => {
        navigate(`/Admin/teachers/edit/${teacherDetails?._id}`);
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (teacherDetails?._id) {
            dispatch(deleteTeacher(teacherDetails._id));
            setDeleteDialogOpen(false);
            // Navigate back to teachers list after successful deletion
            navigate('/Admin/teachers/all');
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };

    const getAvatarColor = (name) => {
        const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336', '#00BCD4', '#795548', '#607D8B'];
        const index = name?.length % colors.length;
        return colors[index] || '#2196F3';
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Breadcrumbs */}
            <Breadcrumbs sx={{ mb: 2 }}>
                <Link 
                    underline="hover" 
                    color="inherit" 
                    href="#" 
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Home
                </Link>
                <Link 
                    underline="hover" 
                    color="inherit" 
                    href="/Admin/teachers/all"
                >
                    Teachers
                </Link>
                <Typography color="text.primary" sx={{ color: '#FFD700' }}>
                    Teacher Details
                </Typography>
            </Breadcrumbs>

            {/* Title */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                Teacher Details
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <Typography>Loading...</Typography>
                </Box>
            ) : teacherDetails ? (
                <Card sx={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                    <CardContent sx={{ p: 0 }}>
                        {/* Header with Action Buttons */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            p: 3,
                            borderBottom: '1px solid #e0e0e0'
                        }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                                About Me
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton 
                                    onClick={handleEdit}
                                    sx={{ 
                                        backgroundColor: '#f5f5f5',
                                        '&:hover': { backgroundColor: '#e0e0e0' }
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton 
                                    sx={{ 
                                        backgroundColor: '#f5f5f5',
                                        '&:hover': { backgroundColor: '#e0e0e0' }
                                    }}
                                >
                                    <PrintIcon />
                                </IconButton>
                                <IconButton 
                                    sx={{ 
                                        backgroundColor: '#f5f5f5',
                                        '&:hover': { backgroundColor: '#e0e0e0' }
                                    }}
                                >
                                    <DownloadIcon />
                                </IconButton>
                            </Box>
                        </Box>

                        {/* Main Content */}
                        <Box sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                                {/* Profile Picture */}
                                <Grid item xs={12} sm={3} md={2}>
                                    <Avatar
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            backgroundColor: getAvatarColor(teacherDetails.name),
                                            fontSize: '48px',
                                            border: '3px solid #e0e0e0'
                                        }}
                                    >
                                        {teacherDetails.name?.split(' ').map(n => n[0]).join('')}
                                    </Avatar>
                                </Grid>

                                {/* Teacher Info */}
                                <Grid item xs={12} sm={9} md={10}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#333' }}>
                                            {teacherDetails.name || 'N/A'}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                            Aliquam erat volutpat. Curabiene natis massa sedde lacu stiquen sodale word moun taiery. 
                                            Aliquam erat volutpaturabiene natis massa sedde sodale word moun taiery.
                                        </Typography>
                                    </Box>

                                    {/* Details List */}
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                                Name:
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {teacherDetails.name || 'N/A'}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                                Gender:
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {teacherDetails.gender || 'N/A'}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                                Father Name:
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {teacherDetails.fatherName || 'N/A'}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                                Mother Name:
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {teacherDetails.motherName || 'N/A'}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                                Religion:
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {teacherDetails.religion || 'N/A'}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                                Joining Date:
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {teacherDetails.joiningDate ? 
                                                    new Date(teacherDetails.joiningDate).toLocaleDateString('en-GB') : 'N/A'}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                                E-mail:
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {teacherDetails.email || 'N/A'}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                                Subject:
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {teacherDetails.teachSubject?.subName || 'N/A'}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                                Class:
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {teacherDetails.teachSclass?.sclassName || 'N/A'}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                                Section:
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {teacherDetails.section || 'N/A'}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                                ID No:
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {teacherDetails.employeeID || teacherDetails._id}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                                Address:
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {teacherDetails.address || 'N/A'}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                                Phone:
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {teacherDetails.phone || 'N/A'}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    {/* Action Buttons */}
                                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                        {!teacherDetails.teachSubject?.subName && (
                                            <Button
                                                variant="contained"
                                                onClick={() => navigate(`/Admin/teachers/choosesubject/${teacherDetails.teachSclass?._id}/${teacherDetails._id}`)}
                                                sx={{
                                                    backgroundColor: '#FFD700',
                                                    color: 'white',
                                                    '&:hover': { backgroundColor: '#FFC107' }
                                                }}
                                            >
                                                Assign Subject
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={handleDelete}
                                        >
                                            Delete Teacher
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            ) : (
                <Box sx={{ textAlign: 'center', p: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                        Teacher not found
                    </Typography>
                </Box>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete {teacherDetails?.name}? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TeacherDetails;