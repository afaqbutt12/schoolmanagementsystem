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
import { getExpenseDetail, updateExpense } from '../../../redux/expenseRelated/expenseHandle';
import Popup from '../../../components/Popup';

const EditExpense = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { loading, error, response, expenseDetails } = useSelector((state) => state.expense);
    const { currentUser, user } = useSelector((state) => state.user);
    
    const expenseID = params.id;
    const adminUser = currentUser || user;

    // Form state
    const [formData, setFormData] = useState({
        expenseType: '',
        amount: '',
        description: '',
        category: '',
        paymentMethod: '',
        receiptNo: '',
        expenseDate: '',
        approvedBy: '',
        status: ''
    });

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    
    // Fetch expense details on mount
    useEffect(() => {
        if (expenseID) {
            dispatch(getExpenseDetail(expenseID));
        }
    }, [dispatch, expenseID]);

    // Populate form with expense details
    useEffect(() => {
        if (expenseDetails && expenseDetails._id) {
            setFormData({
                expenseType: expenseDetails.expenseType || '',
                amount: expenseDetails.amount || '',
                description: expenseDetails.description || '',
                category: expenseDetails.category || '',
                paymentMethod: expenseDetails.paymentMethod || '',
                receiptNo: expenseDetails.receiptNo || '',
                expenseDate: expenseDetails.expenseDate ? new Date(expenseDetails.expenseDate).toISOString().split('T')[0] : '',
                approvedBy: expenseDetails.approvedBy || '',
                status: expenseDetails.status || ''
            });
        }
    }, [expenseDetails]);
    
    useEffect(() => {
        if (error) {
            setMessage(typeof error === 'string' ? error : error.message || 'An error occurred while updating expense');
            setShowPopup(true);
        } else if (response) {
            setMessage("Expense updated successfully!");
            setShowPopup(true);
            setTimeout(() => {
                navigate(`/Admin/account/expenses`);
            }, 2000);
        }
    }, [error, response, navigate]);

    // Sample data for dropdowns
    const expenseTypeOptions = ['Office Supplies', 'Utilities', 'Equipment', 'Maintenance', 'Travel', 'Food', 'Marketing', 'Training', 'Other'];
    const categoryOptions = ['Administrative', 'Academic', 'Maintenance', 'Transport', 'Food & Beverage', 'Utilities', 'Marketing', 'Training', 'Other'];
    const paymentMethodOptions = ['Cash', 'Bank Transfer', 'Cheque', 'Online Payment', 'Card Payment'];
    const statusOptions = ['Pending', 'Approved', 'Rejected', 'Paid'];
    const approvedByOptions = ['Admin', 'Principal', 'Finance Manager', 'Other'];

    const handleInputChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.expenseType || !formData.amount || !formData.category || !formData.expenseDate) {
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
            expenseType: formData.expenseType,
            amount: formData.amount,
            category: formData.category,
            expenseDate: formData.expenseDate,
            description: formData.description || '',
            adminID: adminUser._id  // Backend expects adminID
        };

        // Add optional fields only if they have values
        if (formData.status) expenseData.status = formData.status;
        if (formData.paymentMethod && formData.paymentMethod !== '') expenseData.paymentMethod = formData.paymentMethod;
        if (formData.receiptNo) expenseData.receiptNo = formData.receiptNo;
        if (formData.approvedBy && formData.approvedBy !== '') expenseData.approvedBy = formData.approvedBy;

        dispatch(updateExpense(expenseID, expenseData));
    };

    const handleCancel = () => {
        navigate('/Admin/account/expenses');
    };

    if (loading && !expenseDetails) {
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
                    onClick={() => navigate('/Admin/account/expenses')}
                >
                    Expenses
                </Link>
                <Typography color="text.primary">Edit Expense</Typography>
            </Breadcrumbs>

            {/* Page Title */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                Edit Expense
            </Typography>

            <Paper sx={{ p: 4, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <form onSubmit={handleSubmit}>
                    {/* Row 1 */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth required>
                                <InputLabel>Expense Type *</InputLabel>
                                <Select
                                    value={formData.expenseType}
                                    onChange={handleInputChange('expenseType')}
                                    label="Expense Type *"
                                    sx={{
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    }}
                                >
                                    <MenuItem value="">Please Select Expense Type *</MenuItem>
                                    {expenseTypeOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Amount *"
                                type="number"
                                value={formData.amount}
                                onChange={handleInputChange('amount')}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">$</InputAdornment>
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
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth required>
                                <InputLabel>Category *</InputLabel>
                                <Select
                                    value={formData.category}
                                    onChange={handleInputChange('category')}
                                    label="Category *"
                                    sx={{
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    }}
                                >
                                    <MenuItem value="">Please Select Category *</MenuItem>
                                    {categoryOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Row 2 */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Expense Date *"
                                type="date"
                                value={formData.expenseDate}
                                onChange={handleInputChange('expenseDate')}
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
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Payment Method</InputLabel>
                                <Select
                                    value={formData.paymentMethod}
                                    onChange={handleInputChange('paymentMethod')}
                                    label="Payment Method"
                                    sx={{
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    }}
                                >
                                    <MenuItem value="">Please Select Payment Method</MenuItem>
                                    {paymentMethodOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={formData.status}
                                    onChange={handleInputChange('status')}
                                    label="Status"
                                    sx={{
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    }}
                                >
                                    <MenuItem value="">Please Select Status</MenuItem>
                                    {statusOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Row 3 */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                fullWidth
                                label="Receipt No"
                                value={formData.receiptNo}
                                onChange={handleInputChange('receiptNo')}
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
                            <FormControl fullWidth>
                                <InputLabel>Approved By</InputLabel>
                                <Select
                                    value={formData.approvedBy}
                                    onChange={handleInputChange('approvedBy')}
                                    label="Approved By"
                                    sx={{
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    }}
                                >
                                    <MenuItem value="">Please Select Approved By</MenuItem>
                                    {approvedByOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Row 4 */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12}>
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

export default EditExpense;
