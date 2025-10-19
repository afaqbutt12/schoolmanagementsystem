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
import { getTeacherDetails, updateTeacher } from '../../../redux/teacherRelated/teacherHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';

const EditTeacher = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { loading, error, response, teacherDetails } = useSelector((state) => state.teacher);
    const { currentUser, user } = useSelector((state) => state.user);
    const { sclassesList } = useSelector((state) => state.sclass);
    
    const teacherID = params.id;
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
    
    // Fetch teacher details and classes on mount
    useEffect(() => {
        if (teacherID) {
            dispatch(getTeacherDetails(teacherID));
        }
        if (adminUser && adminUser._id) {
            dispatch(getAllSclasses(adminUser._id, "Sclass"));
        }
    }, [dispatch, teacherID, adminUser]);

    // Populate form with teacher details
    useEffect(() => {
        if (teacherDetails && teacherDetails._id) {
            const nameParts = teacherDetails.name?.split(' ') || ['', ''];
            setFormData({
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || '',
                gender: teacherDetails.gender || '',
                dateOfBirth: teacherDetails.dateOfBirth ? new Date(teacherDetails.dateOfBirth).toISOString().split('T')[0] : '',
                idNo: teacherDetails.employeeID || '',
                bloodGroup: teacherDetails.bloodGroup || '',
                religion: teacherDetails.religion || '',
                email: teacherDetails.email || '',
                teachSclass: teacherDetails.teachSclass?._id || '',
                section: teacherDetails.section || '',
                address: teacherDetails.address || '',
                phone: teacherDetails.phone || '',
                shortBio: teacherDetails.shortBio || '',
                photo: null
            });
        }
    }, [teacherDetails]);
    
    useEffect(() => {
        if (error) {
            setMessage(typeof error === 'string' ? error : error.message || 'An error occurred while updating teacher');
            setShowPopup(true);
        } else if (response) {
            setMessage("Teacher updated successfully!");
            setShowPopup(true);
            setTimeout(() => {
                navigate(`/Admin/teachers/teacher/${teacherID}`);
            }, 2000);
        }
    }, [error, response, navigate, teacherID]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.firstName || !formData.lastName || !formData.gender || !formData.dateOfBirth || !formData.bloodGroup || !formData.religion || !formData.teachSclass || !formData.section) {
            setMessage('Please fill in all required fields');
            setShowPopup(true);
            return;
        }

        const teacherData = {
            ...formData,
            name: `${formData.firstName} ${formData.lastName}`,
            employeeID: formData.idNo
        };

        dispatch(updateTeacher(teacherID, teacherData));
    };

    const handleCancel = () => {
        navigate(`/Admin/teachers/teacher/${teacherID}`);
    };

    if (loading && !teacherDetails) {
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
                    onClick={() => navigate('/Admin/teachers')}
                >
                    Teachers
                </Link>
                <Typography color="text.primary">Edit Teacher</Typography>
            </Breadcrumbs>

            {/* Page Title */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                Edit Teacher
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
                            <TextField
                                fullWidth
                                label="Date Of Birth *"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange('dateOfBirth')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
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
                                    Upload Teacher Photo (150px X 150px)
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

export default EditTeacher;

