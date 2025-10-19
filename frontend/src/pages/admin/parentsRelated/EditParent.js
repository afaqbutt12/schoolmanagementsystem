import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    Breadcrumbs,
    Link,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment
} from '@mui/material';
import {
    Home as HomeIcon,
    CalendarToday as CalendarIcon,
    CloudUpload as UploadIcon
} from '@mui/icons-material';
import { getParentDetail, updateParent } from '../../../redux/parentRelated/parentHandle';
import Popup from '../../../components/Popup';

const EditParent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { loading, error, response, parentDetails } = useSelector((state) => state.parent);
    const { currentUser, user } = useSelector((state) => state.user);
    
    const parentID = params.id;
    const adminUser = currentUser || user;

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        occupation: '',
        idNo: '',
        bloodGroup: '',
        religion: '',
        email: '',
        address: '',
        phone: '',
        shortBio: '',
        photo: null
    });

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    
    // Fetch parent details on mount
    useEffect(() => {
        if (parentID) {
            dispatch(getParentDetail(parentID));
        }
    }, [dispatch, parentID]);

    // Populate form with parent details
    useEffect(() => {
        if (parentDetails && parentDetails._id) {
            const nameParts = parentDetails.name?.split(' ') || ['', ''];
            setFormData({
                firstName: parentDetails.firstName || '',
                lastName: parentDetails.lastName || '',
                gender: parentDetails.gender || '',
                occupation: parentDetails.occupation || '',
                idNo: parentDetails.idNo || '',
                bloodGroup: parentDetails.bloodGroup || '',
                religion: parentDetails.religion || '',
                email: parentDetails.email || '',
                address: parentDetails.address || '',
                phone: parentDetails.phone || '',
                shortBio: parentDetails.shortBio || '',
                photo: null
            });
        }
    }, [parentDetails]);
    
    useEffect(() => {
        if (error) {
            setMessage(typeof error === 'string' ? error : error.message || 'An error occurred while updating parent');
            setShowPopup(true);
        } else if (response) {
            setMessage("Parent updated successfully!");
            setShowPopup(true);
            setTimeout(() => {
                navigate(`/Profile/${parentID}`);
            }, 2000);
        }
    }, [error, response, navigate, parentID]);

    // Sample data for dropdowns
    const genderOptions = ['Male', 'Female', 'Other'];
    const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const religionOptions = ['Islam', 'Christianity', 'Hinduism', 'Buddhism', 'Sikhism', 'Judaism', 'Other'];
    const occupationOptions = ['Business', 'Teacher', 'Doctor', 'Engineer', 'Lawyer', 'Government Employee', 'Private Employee', 'Housewife', 'Student', 'Retired', 'Other'];

    const handleInputChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleFileChange = (event) => {
        setFormData({
            ...formData,
            photo: event.target.files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.firstName || !formData.lastName || !formData.gender || !formData.occupation || !formData.bloodGroup || !formData.religion) {
            setMessage('Please fill in all required fields');
            setShowPopup(true);
            return;
        }

        const parentData = {
            ...formData,
            name: `${formData.firstName} ${formData.lastName}`,
            adminID: adminUser?._id
        };

        dispatch(updateParent(parentID, parentData));
    };

    const handleCancel = () => {
        navigate(`/Profile/${parentID}`);
    };

    if (loading && !parentDetails) {
        return <Box sx={{ p: 3 }}><Typography>Loading...</Typography></Box>;
    }
    
    return (
        <Box sx={{ p: 3, maxWidth: '1400px', margin: '0 auto' }}>
            {/* Breadcrumb */}
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    color="inherit"
                    onClick={() => navigate('/Admin/dashboard')}
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                    Home
                </Link>
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    color="inherit"
                    onClick={() => navigate('/Admin/parents/all')}
                >
                    Parents
                </Link>
                <Typography color="text.primary">Edit Parent</Typography>
            </Breadcrumbs>

            {/* Page Title */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                Edit Parent
            </Typography>

            <Paper sx={{ p: 4, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <form onSubmit={handleSubmit}>
                    {/* Row 1 */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                label="First Name *"
                                value={formData.firstName}
                                onChange={handleInputChange('firstName')}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                label="Last Name *"
                                value={formData.lastName}
                                onChange={handleInputChange('lastName')}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth required>
                                <InputLabel>Gender *</InputLabel>
                                <Select
                                    value={formData.gender}
                                    onChange={handleInputChange('gender')}
                                    label="Gender *"
                                    sx={{
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    }}
                                >
                                    <MenuItem value="">Please Select Gender *</MenuItem>
                                    {genderOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth required>
                                <InputLabel>Occupation *</InputLabel>
                                <Select
                                    value={formData.occupation}
                                    onChange={handleInputChange('occupation')}
                                    label="Occupation *"
                                    sx={{
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    }}
                                >
                                    <MenuItem value="">Please Select Occupation *</MenuItem>
                                    {occupationOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Row 2 */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                label="ID No"
                                value={formData.idNo}
                                onChange={handleInputChange('idNo')}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth required>
                                <InputLabel>Blood Group *</InputLabel>
                                <Select
                                    value={formData.bloodGroup}
                                    onChange={handleInputChange('bloodGroup')}
                                    label="Blood Group *"
                                    sx={{
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    }}
                                >
                                    <MenuItem value="">Please Select Group *</MenuItem>
                                    {bloodGroupOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth required>
                                <InputLabel>Religion *</InputLabel>
                                <Select
                                    value={formData.religion}
                                    onChange={handleInputChange('religion')}
                                    label="Religion *"
                                    sx={{
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    }}
                                >
                                    <MenuItem value="">Please Select Religion *</MenuItem>
                                    {religionOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                label="E-Mail"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange('email')}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>

                    {/* Row 3 */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                fullWidth
                                label="Address"
                                value={formData.address}
                                onChange={handleInputChange('address')}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                value={formData.phone}
                                onChange={handleInputChange('phone')}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>

                    {/* Row 4 */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Short BIO"
                                multiline
                                rows={4}
                                value={formData.shortBio}
                                onChange={handleInputChange('shortBio')}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper
                                sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    border: '2px dashed #ccc',
                                    backgroundColor: '#f9f9f9'
                                }}
                            >
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    Upload Parent Photo (150px X 150px)
                                </Typography>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="photo-upload"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="photo-upload">
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        startIcon={<UploadIcon />}
                                        sx={{
                                            borderColor: '#FFD700',
                                            color: '#FFD700',
                                            '&:hover': {
                                                borderColor: '#FFC107',
                                                backgroundColor: 'rgba(255, 215, 0, 0.1)'
                                            }
                                        }}
                                    >
                                        Choose File
                                    </Button>
                                </label>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {formData.photo ? formData.photo.name : 'No file chosen'}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                backgroundColor: '#FFD700',
                                color: 'white',
                                px: 4,
                                py: 1.5,
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#FFC107'
                                }
                            }}
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            onClick={handleCancel}
                            sx={{
                                backgroundColor: '#333',
                                color: 'white',
                                px: 4,
                                py: 1.5,
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#555'
                                }
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Paper>
            
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default EditParent;
