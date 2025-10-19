import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    Breadcrumbs,
    Link,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    IconButton,
    Paper
} from '@mui/material';
import {
    Home as HomeIcon,
    CalendarToday as CalendarIcon,
    CloudUpload as UploadIcon
} from '@mui/icons-material';
import { createTeacher } from '../../../redux/teacherRelated/teacherHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';

const AddTeacher = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser, user } = useSelector((state) => state.user);
    const { sclassesList } = useSelector((state) => state.sclass);
    
    const adminUser = currentUser || user;

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        idNo: '',
        bloodGroup: '',
        religion: '',
        email: '',
        teachSclass: '',
        section: '',
        address: '',
        phone: '',
        shortBio: '',
        photo: null
    });

  const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    
    // Fetch classes on mount
    useEffect(() => {
        if (adminUser && adminUser._id) {
            dispatch(getAllSclasses(adminUser._id, "Sclass"));
        }
    }, [dispatch, adminUser]);
    
    useEffect(() => {
        if (error) {
            setMessage(typeof error === 'string' ? error : error.message || 'An error occurred while adding teacher');
            setShowPopup(true);
        } else if (response) {
            setMessage("Teacher added successfully!");
            setShowPopup(true);
            setTimeout(() => {
                navigate('/Admin/teachers');
            }, 2000);
        }
    }, [error, response, navigate]);

    // Sample data for dropdowns
    const genderOptions = ['Male', 'Female', 'Other'];
    const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const religionOptions = ['Islam', 'Christianity', 'Hinduism', 'Buddhism', 'Sikhism', 'Judaism', 'Other'];
    const sectionOptions = ['A', 'B', 'C', 'D', 'Pink', 'Blue', 'Green', 'Yellow'];
    
    // Get classes from Redux store or use empty array
    const classOptions = sclassesList && sclassesList.length > 0 ? sclassesList : [];

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

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!formData.firstName || !formData.lastName || !formData.gender || !formData.dateOfBirth || 
            !formData.bloodGroup || !formData.religion || !formData.teachSclass || !formData.section) {
            setMessage('Please fill in all required fields');
            setShowPopup(true);
            return;
        }

        const teacherData = {
            ...formData,
            name: `${formData.firstName} ${formData.lastName}`,
            adminID: adminUser?._id,
            password: 'defaultPassword123', // Default password, can be changed later
            role: 'Teacher'
        };

        dispatch(createTeacher(teacherData));
    };

    const handleReset = () => {
        setFormData({
            firstName: '',
            lastName: '',
            gender: '',
            dateOfBirth: '',
            idNo: '',
            bloodGroup: '',
            religion: '',
            email: '',
            teachSclass: '',
            section: '',
            address: '',
            phone: '',
            shortBio: '',
            photo: null
        });
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
                <Typography color="text.primary" sx={{ color: '#FFD700' }}>
                    Add New Teacher
                </Typography>
            </Breadcrumbs>

            {/* Title */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                Teacher
            </Typography>

            {/* Form Card */}
            <Card sx={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
                        Add New Teacher
                    </Typography>

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
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    fullWidth
                                    label="Date Of Birth *"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange('dateOfBirth')}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CalendarIcon />
                                            </InputAdornment>
                                        ),
                                    }}
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
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
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
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
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
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth required>
                                    <InputLabel>Class *</InputLabel>
                                    <Select
                                        value={formData.teachSclass}
                                        onChange={handleInputChange('teachSclass')}
                                        label="Class *"
                                        sx={{
                                            backgroundColor: '#f9f9f9',
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700',
                                            },
                                        }}
                                    >
                                        <MenuItem value="">Please Select Class *</MenuItem>
                                        {classOptions.map((classItem) => (
                                            <MenuItem key={classItem._id} value={classItem._id}>
                                                {classItem.sclassName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth required>
                                    <InputLabel>Section *</InputLabel>
                                    <Select
                                        value={formData.section}
                                        onChange={handleInputChange('section')}
                                        label="Section *"
                                        sx={{
                                            backgroundColor: '#f9f9f9',
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700',
                                            },
                                        }}
                                    >
                                        <MenuItem value="">Please Select Section *</MenuItem>
                                        {sectionOptions.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
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
                            <Grid item xs={12} sm={6} md={3}>
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
                                        Upload Student Photo (150px X 150px)
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
                                {loading ? 'Saving...' : 'Save'}
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                onClick={handleReset}
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
                                Reset
                            </Button>
                        </Box>
        </form>
                </CardContent>
            </Card>

            {/* Footer */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    © Copyrights akkhor 2019. All rights reserved. Designed by PsdBoss
                </Typography>
            </Box>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default AddTeacher