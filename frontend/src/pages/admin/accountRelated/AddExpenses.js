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
import { createExpense } from '../../../redux/expenseRelated/expenseHandle';
import Popup from '../../../components/Popup';

const AddExpenses = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, response } = useSelector((state) => state.expense);
    const { currentUser, user } = useSelector((state) => state.user);
    
    const adminUser = currentUser || user;

    const [formData, setFormData] = useState({
        name: '',
        expenseType: '',
        amount: '',
        status: 'Pending',
        phone: '',
        email: '',
        date: '',
        description: '',
        category: '',
        paymentMethod: '',
        receiptNo: '',
        approvedBy: ''
    });

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        if (error) {
            setMessage(typeof error === 'string' ? error : error.message || 'An error occurred while adding expense');
            setShowPopup(true);
        } else if (response) {
            setMessage("Expense added successfully!");
            setShowPopup(true);
            setTimeout(() => {
                navigate('/Admin/account/expenses');
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
        if (!formData.name || !formData.expenseType || !formData.amount || !formData.date) {
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

        // Prepare expense data, removing empty optional fields
        const expenseData = {
            name: formData.name,
            expenseType: formData.expenseType,
            amount: formData.amount,
            date: formData.date,
            status: formData.status || 'Due',
            adminID: adminUser._id  // Backend expects adminID, which it converts to school
        };

        // Add optional fields only if they have values
        if (formData.phone) expenseData.phone = formData.phone;
        if (formData.email) expenseData.email = formData.email;
        if (formData.description) expenseData.description = formData.description;
        if (formData.category && formData.category !== '') expenseData.category = formData.category;
        if (formData.paymentMethod && formData.paymentMethod !== '') expenseData.paymentMethod = formData.paymentMethod;
        if (formData.receiptNo) expenseData.receiptNo = formData.receiptNo;
        if (formData.approvedBy && formData.approvedBy !== '') expenseData.approvedBy = formData.approvedBy;

        dispatch(createExpense(expenseData));
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
                <Link underline="hover" color="inherit" href="/Admin/account/expenses">
                    All Expense
                </Link>
                <Typography color="text.primary">Add Expenses</Typography>
            </Breadcrumbs>

            {/* Title */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                Add Expenses
            </Typography>

            {/* Form */}
            <Paper sx={{ p: 4, maxWidth: '100%', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                    Add Expenses
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Row 1 */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <TextField
                                    fullWidth
                                    label="Name *"
                                    name="name"
                                    value={formData.name}
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
                                        <MenuItem value="Salary">Salary</MenuItem>
                                        <MenuItem value="Transport">Transport</MenuItem>
                                        <MenuItem value="Utilities">Utilities</MenuItem>
                                        <MenuItem value="Maintenance">Maintenance</MenuItem>
                                        <MenuItem value="Office Supplies">Office Supplies</MenuItem>
                                        <MenuItem value="Insurance">Insurance</MenuItem>
                                        <MenuItem value="Marketing">Marketing</MenuItem>
                                        <MenuItem value="Equipment">Equipment</MenuItem>
                                        <MenuItem value="Software">Software</MenuItem>
                                        <MenuItem value="Training">Training</MenuItem>
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
                                        <MenuItem value="" disabled>Please Select Status *</MenuItem>
                                        <MenuItem value="Paid">Paid</MenuItem>
                                        <MenuItem value="Due">Due</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>

                        {/* Row 3 */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <TextField
                                    fullWidth
                                    label="Phone *"
                                    name="phone"
                                    value={formData.phone}
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
                                    label="Email *"
                                    name="email"
                                    type="email"
                                    value={formData.email}
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

                        {/* Row 4 */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: '300px' }}>
                                <TextField
                                    fullWidth
                                    label="Date *"
                                    name="date"
                                    type="date"
                                    value={formData.date}
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
                                        name: '',
                                        expenseType: '',
                                        amount: '',
                                        status: 'Due',
                                        phone: '',
                                        email: '',
                                        date: '',
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

export default AddExpenses;
