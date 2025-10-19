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
import { getFeesDetail, updateFees } from '../../../redux/feesRelated/feesHandle';
import Popup from '../../../components/Popup';

const EditFees = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { loading, error, response, feesDetails } = useSelector((state) => state.fees);
    const { currentUser, user } = useSelector((state) => state.user);
    
    const feesID = params.id;
    const adminUser = currentUser || user;

    // Form state
    const [formData, setFormData] = useState({
        studentName: '',
        studentId: '',
        class: '',
        section: '',
        feeType: '',
        amount: '',
        dueDate: '',
        paymentDate: '',
        status: '',
        description: '',
        paymentMethod: '',
        receiptNo: ''
    });

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    
    // Fetch fees details on mount
    useEffect(() => {
        if (feesID) {
            dispatch(getFeesDetail(feesID));
        }
    }, [dispatch, feesID]);

    // Populate form with fees details
    useEffect(() => {
        console.log('feesDetails:', feesDetails); // Add this line
        if (feesDetails && feesDetails._id) {
            setFormData({
                studentName: feesDetails.studentName || '',
                studentId: feesDetails.studentId || '',
                class: feesDetails.class || '',
                section: feesDetails.section || '',
                feeType: feesDetails.feeType || '',
                amount: feesDetails.amount || '',
                dueDate: feesDetails.dueDate ? new Date(feesDetails.dueDate).toISOString().split('T')[0] : '',
                paymentDate: feesDetails.paymentDate ? new Date(feesDetails.paymentDate).toISOString().split('T')[0] : '',
                status: feesDetails.status || '',
                description: feesDetails.description || '',
                paymentMethod: feesDetails.paymentMethod || '',
                receiptNo: feesDetails.receiptNo || ''
            });
        }
    }, [feesDetails]);
    
    useEffect(() => {
        if (error) {
            setMessage(typeof error === 'string' ? error : error.message || 'An error occurred while updating fees');
            setShowPopup(true);
        } else if (response) {
            setMessage("Fees updated successfully!");
            setShowPopup(true);
            setTimeout(() => {
                navigate(`/Admin/account/fees-collection`);
            }, 2000);
        }
    }, [error, response, navigate]);

    // Sample data for dropdowns
    const feeTypeOptions = ['Tuition Fee', 'Admission Fee', 'Exam Fee', 'Library Fee', 'Sports Fee', 'Transport Fee', 'Other'];
    const statusOptions = ['Pending', 'Paid', 'Overdue', 'Partial'];
    const paymentMethodOptions = ['Cash', 'Bank Transfer', 'Cheque', 'Online Payment', 'Card Payment'];
    const classOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    const handleInputChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.studentName || !formData.studentId || !formData.class || !formData.feeType || !formData.amount || !formData.dueDate) {
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
            feeType: formData.feeType,
            amount: formData.amount,
            dueDate: formData.dueDate,
            adminID: adminUser._id  // Backend expects adminID
        };

        // Add optional fields only if they have values
        if (formData.section) feesData.section = formData.section;
        if (formData.status) feesData.status = formData.status;
        if (formData.description) feesData.description = formData.description;
        if (formData.paymentMethod && formData.paymentMethod !== '') feesData.paymentMethod = formData.paymentMethod;
        if (formData.paymentDate) feesData.paymentDate = formData.paymentDate;
        if (formData.receiptNo) feesData.receiptNo = formData.receiptNo;

        dispatch(updateFees(feesID, feesData));
    };

    const handleCancel = () => {
        navigate('/Admin/account/fees-collection');
    };

    if (loading && !feesDetails) {
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
                    onClick={() => navigate('/Admin/account/fees-collection')}
                >
                    Fees Collection
                </Link>
                <Typography color="text.primary">Edit Fees</Typography>
            </Breadcrumbs>

            {/* Page Title */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                Edit Fees Collection
            </Typography>

            <Paper sx={{ p: 4, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <form onSubmit={handleSubmit}>
                    {/* Row 1 */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Student Name *"
                                value={formData.studentName}
                                onChange={handleInputChange('studentName')}
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
                            <TextField
                                fullWidth
                                label="Student ID *"
                                value={formData.studentId}
                                onChange={handleInputChange('studentId')}
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
                    </Grid>

                    {/* Row 2 */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                label="Section"
                                value={formData.section}
                                onChange={handleInputChange('section')}
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
                                <InputLabel>Fee Type *</InputLabel>
                                <Select
                                    value={formData.feeType}
                                    onChange={handleInputChange('feeType')}
                                    label="Fee Type *"
                                    sx={{
                                        backgroundColor: '#f9f9f9',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#FFD700',
                                        },
                                    }}
                                >
                                    <MenuItem value="">Please Select Fee Type *</MenuItem>
                                    {feeTypeOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
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
                        <Grid item xs={12} sm={6} md={3}>
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
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Due Date *"
                                type="date"
                                value={formData.dueDate}
                                onChange={handleInputChange('dueDate')}
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
                            <TextField
                                fullWidth
                                label="Payment Date"
                                type="date"
                                value={formData.paymentDate}
                                onChange={handleInputChange('paymentDate')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                    </Grid>

                    {/* Row 4 */}
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
                            <TextField
                                fullWidth
                                label="Description"
                                multiline
                                rows={3}
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

export default EditFees;
