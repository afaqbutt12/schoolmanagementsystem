import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Breadcrumbs,
    Link,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createParent } from '../../../redux/parentRelated/parentHandle';
import Popup from '../../../components/Popup';

const AddParent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, response } = useSelector((state) => state.parent);
    const { currentUser, user } = useSelector((state) => state.user);
    
    const adminUser = currentUser || user;

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
    
    useEffect(() => {
        if (error) {
            setMessage(typeof error === 'string' ? error : error.message || 'An error occurred while adding parent');
            setShowPopup(true);
        } else if (response) {
            setMessage("Parent added successfully!");
            setShowPopup(true);
            setTimeout(() => {
                navigate('/Admin/parents/all');
            }, 2000);
        }
    }, [error, response, navigate]);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
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

        dispatch(createParent(parentData));
    };

    const handleReset = () => {
        setFormData({
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
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                photo: file
            }));
        }
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
                <Typography color="text.primary" sx={{ color: '#FFD700' }}>Add New Parents</Typography>
            </Breadcrumbs>

            {/* Title */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                Parents
            </Typography>

            {/* Form */}
            <Paper sx={{ p: 4, maxWidth: '100%', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                    Add New Parents
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Row 1 */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <TextField
                                    fullWidth
                                    label="First Name *"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#f5f5f5',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            }
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <TextField
                                    fullWidth
                                    label="Last Name *"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#f5f5f5',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Row 2 */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <FormControl fullWidth required>
                                    <InputLabel>Gender *</InputLabel>
                                    <Select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        label="Gender *"
                                        displayEmpty
                                        sx={{
                                            backgroundColor: '#f5f5f5',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            }
                                        }}
                                    >
                                        <MenuItem value="" disabled>Please Select Gender *</MenuItem>
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <TextField
                                    fullWidth
                                    label="Occupation"
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleInputChange}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#f5f5f5',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Row 3 */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <TextField
                                    fullWidth
                                    label="ID No"
                                    name="idNo"
                                    value={formData.idNo}
                                    onChange={handleInputChange}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#f5f5f5',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            }
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <FormControl fullWidth required>
                                    <InputLabel>Blood Group *</InputLabel>
                                    <Select
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleInputChange}
                                        label="Blood Group *"
                                        displayEmpty
                                        sx={{
                                            backgroundColor: '#f5f5f5',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            }
                                        }}
                                    >
                                        <MenuItem value="" disabled>Please Select Group *</MenuItem>
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>

                        {/* Row 4 */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <FormControl fullWidth required>
                                    <InputLabel>Religion *</InputLabel>
                                    <Select
                                        name="religion"
                                        value={formData.religion}
                                        onChange={handleInputChange}
                                        label="Religion *"
                                        displayEmpty
                                        sx={{
                                            backgroundColor: '#f5f5f5',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            }
                                        }}
                                    >
                                        <MenuItem value="" disabled>Please Select Religion *</MenuItem>
                                        <MenuItem value="Islam">Islam</MenuItem>
                                        <MenuItem value="Christianity">Christianity</MenuItem>
                                        <MenuItem value="Hinduism">Hinduism</MenuItem>
                                        <MenuItem value="Buddhism">Buddhism</MenuItem>
                                        <MenuItem value="Sikhism">Sikhism</MenuItem>
                                        <MenuItem value="Judaism">Judaism</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <TextField
                                    fullWidth
                                    label="E-Mail"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#f5f5f5',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Row 5 */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    multiline
                                    rows={3}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#f5f5f5',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Row 6 */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#f5f5f5',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Row 7 */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <TextField
                                    fullWidth
                                    label="Short BIO"
                                    name="shortBio"
                                    value={formData.shortBio}
                                    onChange={handleInputChange}
                                    multiline
                                    rows={3}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#f5f5f5',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#FFD700'
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Row 8 - File Upload */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
                                    Upload Student Photo (150px X 150px)
                                </Typography>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
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
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                    />
                                </Button>
                                <Typography variant="body2" sx={{ ml: 2, color: '#666', display: 'inline' }}>
                                    {formData.photo ? formData.photo.name : 'No file chosen'}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start', mt: 3 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#FFD700',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: '#FFC107'
                                    }
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                onClick={handleReset}
                                sx={{
                                    backgroundColor: '#1976d2',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: '#1565c0'
                                    }
                                }}
                            >
                                Reset
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Paper>

            {/* Footer */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    © Copyrights akkhor 2019. All rights reserved. Designed by PsdBosS
                </Typography>
            </Box>
            
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default AddParent;
