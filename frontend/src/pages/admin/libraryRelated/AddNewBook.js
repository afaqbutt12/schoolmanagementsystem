import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Breadcrumbs,
    Link
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';
import { createBook } from '../../../redux/bookRelated/bookHandle';
import Popup from '../../../components/Popup';

const AddNewBook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, response } = useSelector((state) => state.book);
    const { currentUser, user } = useSelector((state) => state.user);
    
    const adminUser = currentUser || user;

    const [formData, setFormData] = useState({
        bookName: '',
        subject: '',
        writer: '',
        class: '',
        idNo: '',
        published: '',
        uploadDate: '',
        description: '',
        isbn: '',
        publisher: '',
        pages: '',
        language: 'English'
    });

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        if (error) {
            setMessage(typeof error === 'string' ? error : error.message || 'An error occurred while adding book');
            setShowPopup(true);
        } else if (response) {
            setMessage("Book added successfully!");
            setShowPopup(true);
            setTimeout(() => {
                navigate('/Admin/library/books');
            }, 2000);
        }
    }, [error, response, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.bookName || !formData.subject || !formData.writer || !formData.class || !formData.published) {
            setMessage('Please fill in all required fields');
            setShowPopup(true);
            return;
        }

        const bookData = {
            ...formData,
            adminID: adminUser?._id,
            uploadDate: new Date()
        };

        dispatch(createBook(bookData));
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
                <Link underline="hover" color="inherit" href="/Admin/library/books">
                    Library
                </Link>
                <Typography color="text.primary">Add New Book</Typography>
            </Breadcrumbs>

            {/* Title */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                Add New Book
            </Typography>

            {/* Form */}
            <Paper sx={{ p: 4, maxWidth: '100%', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                    Add New Book
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Row 1 */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <TextField
                                    fullWidth
                                    label="Book Name *"
                                    name="bookName"
                                    value={formData.bookName}
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
                                <FormControl fullWidth required>
                                    <InputLabel>Subject *</InputLabel>
                                    <Select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        label="Subject *"
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
                                        <MenuItem value="English">English</MenuItem>
                                        <MenuItem value="Math">Math</MenuItem>
                                        <MenuItem value="Bangla">Bangla</MenuItem>
                                        <MenuItem value="Physics">Physics</MenuItem>
                                        <MenuItem value="Chemistry">Chemistry</MenuItem>
                                        <MenuItem value="Biology">Biology</MenuItem>
                                        <MenuItem value="History">History</MenuItem>
                                        <MenuItem value="Geography">Geography</MenuItem>
                                        <MenuItem value="Computer">Computer</MenuItem>
                                        <MenuItem value="Religion">Religion</MenuItem>
                                        <MenuItem value="Economics">Economics</MenuItem>
                                        <MenuItem value="Accounting">Accounting</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>

                        {/* Row 2 */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <TextField
                                    fullWidth
                                    label="Writter Name *"
                                    name="writer"
                                    value={formData.writer}
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
                                <FormControl fullWidth required>
                                    <InputLabel>Class *</InputLabel>
                                    <Select
                                        name="class"
                                        value={formData.class}
                                        onChange={handleInputChange}
                                        label="Class *"
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
                                        <MenuItem value="" disabled>Please Select Class *</MenuItem>
                                        <MenuItem value="1">1</MenuItem>
                                        <MenuItem value="2">2</MenuItem>
                                        <MenuItem value="3">3</MenuItem>
                                        <MenuItem value="4">4</MenuItem>
                                        <MenuItem value="5">5</MenuItem>
                                        <MenuItem value="6">6</MenuItem>
                                        <MenuItem value="7">7</MenuItem>
                                        <MenuItem value="8">8</MenuItem>
                                        <MenuItem value="9">9</MenuItem>
                                        <MenuItem value="10">10</MenuItem>
                                        <MenuItem value="11">11</MenuItem>
                                        <MenuItem value="12">12</MenuItem>
                                        <MenuItem value="General">General</MenuItem>
                                    </Select>
                                </FormControl>
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
                                <TextField
                                    fullWidth
                                    label="Publishing Date *"
                                    name="published"
                                    type="date"
                                    value={formData.published}
                                    onChange={handleInputChange}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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

                        {/* Row 4 */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <TextField
                                    fullWidth
                                    label="Uploade Date *"
                                    name="uploadDate"
                                    type="date"
                                    value={formData.uploadDate}
                                    onChange={handleInputChange}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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
                                onClick={() => {
                                    setFormData({
                                        bookName: '',
                                        subject: '',
                                        writer: '',
                                        class: '',
                                        idNo: '',
                                        published: '',
                                        uploadDate: '',
                                        description: '',
                                        isbn: '',
                                        publisher: '',
                                        pages: '',
                                        language: 'English'
                                    });
                                }}
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
            
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default AddNewBook;
