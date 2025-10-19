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
import { getBookDetail, updateBook } from '../../../redux/bookRelated/bookHandle';
import Popup from '../../../components/Popup';

const EditBook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { loading, error, response, bookDetails } = useSelector((state) => state.book);
    const { currentUser, user } = useSelector((state) => state.user);
    
    const bookID = params.id;
    const adminUser = currentUser || user;

    // Form state
    const [formData, setFormData] = useState({
        bookName: '',
        subject: '',
        writer: '',
        class: '',
        idNo: '',
        published: '',
        description: '',
        isbn: '',
        publisher: '',
        pages: '',
        language: '',
        photo: null
    });

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    
    // Fetch book details on mount
    useEffect(() => {
        if (bookID) {
            dispatch(getBookDetail(bookID));
        }
    }, [dispatch, bookID]);

    // Populate form with book details
    useEffect(() => {
        if (bookDetails && bookDetails._id) {
            setFormData({
                bookName: bookDetails.bookName || '',
                subject: bookDetails.subject || '',
                writer: bookDetails.writer || '',
                class: bookDetails.class || '',
                idNo: bookDetails.idNo || '',
                published: bookDetails.published ? new Date(bookDetails.published).toISOString().split('T')[0] : '',
                description: bookDetails.description || '',
                isbn: bookDetails.isbn || '',
                publisher: bookDetails.publisher || '',
                pages: bookDetails.pages || '',
                language: bookDetails.language || '',
                photo: null
            });
        }
    }, [bookDetails]);
    
    useEffect(() => {
        if (error) {
            setMessage(typeof error === 'string' ? error : error.message || 'An error occurred while updating book');
            setShowPopup(true);
        } else if (response) {
            setMessage("Book updated successfully!");
            setShowPopup(true);
            setTimeout(() => {
                navigate(`/Admin/library/books`);
            }, 2000);
        }
    }, [error, response, navigate]);

    // Sample data for dropdowns
    const subjectOptions = ['English', 'Math', 'Bangla', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Computer', 'Religion', 'Economics', 'Accounting', 'Other'];
    const classOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'General'];
    const languageOptions = ['English', 'Bangla', 'Arabic', 'Hindi', 'Urdu', 'Other'];

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

        dispatch(updateBook(bookID, bookData));
    };

    const handleCancel = () => {
        navigate('/Admin/library/books');
    };

    if (loading && !bookDetails) {
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
                    onClick={() => navigate('/Admin/library/books')}
                >
                    Library
                </Link>
                <Typography color="text.primary">Edit Book</Typography>
            </Breadcrumbs>

            {/* Page Title */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                Edit Book
            </Typography>

            <Paper sx={{ p: 4, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <form onSubmit={handleSubmit}>
                    {/* Row 1 */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Book Name *"
                                value={formData.bookName}
                                onChange={handleInputChange('bookName')}
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
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth required>
                                <InputLabel>Subject *</InputLabel>
                                <Select
                                    value={formData.subject}
                                    onChange={handleInputChange('subject')}
                                    label="Subject *"
                                    sx={{
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    }}
                                >
                                    <MenuItem value="">Please Select Subject *</MenuItem>
                                    {subjectOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Writer *"
                                value={formData.writer}
                                onChange={handleInputChange('writer')}
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
                    </Grid>

                    {/* Row 2 */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth required>
                                <InputLabel>Class *</InputLabel>
                                <Select
                                    value={formData.class}
                                    onChange={handleInputChange('class')}
                                    label="Class *"
                                    sx={{
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    }}
                                >
                                    <MenuItem value="">Please Select Class *</MenuItem>
                                    {classOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
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
                            <TextField
                                fullWidth
                                label="Published Date *"
                                type="date"
                                value={formData.published}
                                onChange={handleInputChange('published')}
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
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                label="ISBN"
                                value={formData.isbn}
                                onChange={handleInputChange('isbn')}
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
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Publisher"
                                value={formData.publisher}
                                onChange={handleInputChange('publisher')}
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
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Pages"
                                type="number"
                                value={formData.pages}
                                onChange={handleInputChange('pages')}
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
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Language</InputLabel>
                                <Select
                                    value={formData.language}
                                    onChange={handleInputChange('language')}
                                    label="Language"
                                    sx={{
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    }}
                                >
                                    <MenuItem value="">Please Select Language</MenuItem>
                                    {languageOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Row 4 */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Description"
                                multiline
                                rows={4}
                                value={formData.description}
                                onChange={handleInputChange('description')}
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
                                    Upload Book Cover (150px X 150px)
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

export default EditBook;
