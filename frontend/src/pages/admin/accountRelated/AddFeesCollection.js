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
import { createFees } from '../../../redux/feesRelated/feesHandle';
import Popup from '../../../components/Popup';

const AddFeesCollection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, response } = useSelector((state) => state.fees);
    const { currentUser, user } = useSelector((state) => state.user);
    
    const adminUser = currentUser || user;

    const [formData, setFormData] = useState({
        studentId: '',
        studentName: '',
        class: '',
        section: '',
        feeType: '',
        amount: '',
        dueDate: '',
        description: '',
        status: 'Unpaid',
        paymentMethod: '',
        receiptNo: ''
    });

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        if (error) {
            setMessage(typeof error === 'string' ? error : error.message || 'An error occurred while adding fees');
            setShowPopup(true);
        } else if (response) {
            setMessage("Fees added successfully!");
            setShowPopup(true);
            setTimeout(() => {
                navigate('/Admin/account/fees-collection');
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
        console.log(formData);
        
        // Validation
        if (!formData.studentName || !formData.studentId || !formData.class || !formData.expenseType || !formData.amount || !formData.dueDate) {
            setMessage('Please fill in all required fields');
            setShowPopup(true);
            return;
        }

        // Check if admin user exists
        if (!adminUser || !adminUser._id) {
            setMessage('Unable to identify admin user. Please login again.');
            setShowPopup(true);
            return;
        }

        // Prepare fees data, removing empty optional fields
        const feesData = {
            studentName: formData.studentName,
            studentId: formData.studentId,
            class: formData.class,
            expenseType: formData.expenseType,
            amount: formData.amount,
            dueDate: formData.dueDate,
            status: formData.status || 'Unpaid',
            adminID: adminUser._id  // Backend expects adminID, which it converts to school
        };

        // Add optional fields only if they have values
        if (formData.section) feesData.section = formData.section;
        if (formData.description) feesData.description = formData.description;
        if (formData.paymentMethod && formData.paymentMethod !== '') feesData.paymentMethod = formData.paymentMethod;
        if (formData.receiptNo) feesData.receiptNo = formData.receiptNo;

        dispatch(createFees(feesData));
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
                <Link underline="hover" color="inherit" href="/Admin/account/fees-collection">
                    Fees Collection
                </Link>
                <Typography color="text.primary">Add Fees Collection</Typography>
            </Breadcrumbs>

            {/* Title */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                Add Fees Collection
            </Typography>

            {/* Form */}
            <Paper sx={{ p: 4, maxWidth: '100%', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                    Add Fees Collection
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Row 1 */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <TextField
                                    fullWidth
                                    label="Student ID *"
                                    name="studentId"
                                    value={formData.studentId}
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
                                    label="Student Name *"
                                    name="studentName"
                                    value={formData.studentName}
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
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <FormControl fullWidth required>
                                    <InputLabel>Section *</InputLabel>
                                    <Select
                                        name="section"
                                        value={formData.section}
                                        onChange={handleInputChange}
                                        label="Section *"
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
                                        <MenuItem value="" disabled>Please Select Section *</MenuItem>
                                        <MenuItem value="A">A</MenuItem>
                                        <MenuItem value="B">B</MenuItem>
                                        <MenuItem value="C">C</MenuItem>
                                        <MenuItem value="D">D</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>

                        {/* Row 3 */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <FormControl fullWidth required>
                                    <InputLabel>Expense Type *</InputLabel>
                                    <Select
                                        name="expenseType"
                                        value={formData.expenseType}
                                        onChange={handleInputChange}
                                        label="Expense Type *"
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
                                        <MenuItem value="" disabled>Please Select Expense Type *</MenuItem>
                                        <MenuItem value="Class Test">Class Test</MenuItem>
                                        <MenuItem value="Monthly Fee">Monthly Fee</MenuItem>
                                        <MenuItem value="Exam Fee">Exam Fee</MenuItem>
                                        <MenuItem value="Library Fee">Library Fee</MenuItem>
                                        <MenuItem value="Transport Fee">Transport Fee</MenuItem>
                                        <MenuItem value="Hostel Fee">Hostel Fee</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <TextField
                                    fullWidth
                                    label="Amount *"
                                    name="amount"
                                    type="number"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    required
                                    InputProps={{
                                        startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
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
                                    label="Due Date *"
                                    name="dueDate"
                                    type="date"
                                    value={formData.dueDate}
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
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <FormControl fullWidth required>
                                    <InputLabel>Status *</InputLabel>
                                    <Select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        label="Status *"
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
                                        <MenuItem value="" disabled>Please Select Section *</MenuItem>
                                        <MenuItem value="Overdue">Overdue</MenuItem>
                                        <MenuItem value="Paid">Paid</MenuItem>
                                        <MenuItem value="Unpaid">Unpaid</MenuItem>
                                        <MenuItem value="Pending">Pending</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>

                        {/* Row 5 */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    value={formData.description}
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
                                        studentId: '',
                                        studentName: '',
                                        class: '',
                                        section: '',
                                        expenseType: '',
                                        amount: '',
                                        dueDate: '',
                                        description: ''
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

export default AddFeesCollection;
