import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Chip,
    TablePagination,
    IconButton,
    Checkbox,
    InputAdornment,
    Breadcrumbs,
    Link,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getAllFees, deleteFee } from '../../../redux/feesRelated/feesHandle';
import Popup from '../../../components/Popup';

const FeesCollection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [searchId, setSearchId] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchAmount, setSearchAmount] = useState('');
    const [filteredFees, setFilteredFees] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuFee, setMenuFee] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedFee, setSelectedFee] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');

    const { feesList, loading, error, response } = useSelector((state) => state.fees);
    const { currentUser, user } = useSelector((state) => state.user);
    
    const adminUser = currentUser || user;

    useEffect(() => {
        if (adminUser && adminUser._id) {
            dispatch(getAllFees(adminUser._id));
        }
    }, [dispatch, adminUser]);

    useEffect(() => {
        if (feesList && feesList.length > 0) {
            setFilteredFees(feesList);
        }
    }, [feesList]);

    useEffect(() => {
        if (error) {
            setMessage(typeof error === 'string' ? error : error.message || 'An error occurred');
            setShowPopup(true);
        } else if (response) {
            setMessage("Operation completed successfully!");
            setShowPopup(true);
            // Refresh the list
            if (adminUser && adminUser._id) {
                dispatch(getAllFees(adminUser._id));
            }
        }
    }, [error, response, adminUser, dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = () => {
        if (!feesList) return;
        
        const filtered = feesList.filter(fee => {
            const matchesId = !searchId || fee.studentID?.toLowerCase().includes(searchId.toLowerCase());
            const matchesName = !searchName || fee.studentName?.toLowerCase().includes(searchName.toLowerCase());
            const matchesAmount = !searchAmount || fee.amount?.toString().includes(searchAmount);
            
            return matchesId && matchesName && matchesAmount;
        });
        
        setFilteredFees(filtered);
        setPage(0);
    };

    const handleMenuOpen = (event, fee) => {
        setAnchorEl(event.currentTarget);
        setMenuFee(fee);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuFee(null);
    };

    const handleView = () => {
        if (menuFee) {
            setMessage("View fee details - Page coming soon!");
            setShowPopup(true);
        }
        handleMenuClose();
    };

    const handleEdit = () => {
        if (menuFee) {
            navigate(`/Admin/account/edit-fees/${menuFee._id}`);
        }
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        if (menuFee) {
            setSelectedFee(menuFee);
            setDeleteDialogOpen(true);
        }
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        if (selectedFee) {
            dispatch(deleteFee(selectedFee._id));
            setDeleteDialogOpen(false);
            setSelectedFee(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedFee(null);
    };

    const getAvatarColor = (name) => {
        const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336'];
        const index = name?.length % colors.length || 0;
        return colors[index];
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'paid':
                return { backgroundColor: '#4CAF50', color: 'white' };
            case 'pending':
                return { backgroundColor: '#FF9800', color: 'white' };
            case 'overdue':
                return { backgroundColor: '#F44336', color: 'white' };
            default:
                return { backgroundColor: '#9E9E9E', color: 'white' };
        }
    };

    if (loading) {
        return <Box sx={{ p: 3 }}><Typography>Loading fees...</Typography></Box>;
    }

    return (
        <Box sx={{ p: 3 }}>
            {/* Breadcrumbs */}
            <Breadcrumbs sx={{ mb: 2 }}>
                <Link
                    underline="hover"
                    color="inherit"
                    onClick={() => navigate('/Admin/dashboard')}
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Home
                </Link>
                <Typography color="text.primary">Fees Collection</Typography>
            </Breadcrumbs>

            {/* Page Title */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                    Fees Collection
                </Typography>
                <Typography variant="h6" sx={{ color: '#666' }}>
                    All Fees Collection Data
                </Typography>
            </Box>

            {/* Search Section */}
            <Paper sx={{ p: 3, mb: 3, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                        placeholder="Search by ID..."
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        size="small"
                        sx={{ minWidth: 200 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        placeholder="Search by Name..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        size="small"
                        sx={{ minWidth: 200 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        placeholder="Search by Amount..."
                        value={searchAmount}
                        onChange={(e) => setSearchAmount(e.target.value)}
                        size="small"
                        sx={{ minWidth: 200 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#FFD700',
                            color: 'white',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#FFC107'
                            }
                        }}
                        onClick={handleSearch}
                        startIcon={<SearchIcon />}
                    >
                        SEARCH
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#45a049'
                            }
                        }}
                        onClick={() => navigate('/Admin/account/add-fees')}
                    >
                        ADD NEW FEE
                    </Button>
                </Box>
            </Paper>

            {/* Table */}
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <Table sx={{ minWidth: 650 }} aria-label="fees table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell padding="checkbox">
                                <Checkbox />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Student Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Class</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Section</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Fee Type</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Due Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredFees
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>{row.studentID || row._id?.slice(0, 4)}</TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>{row.studentName || 'N/A'}</TableCell>
                                    <TableCell>{row.class || 'N/A'}</TableCell>
                                    <TableCell>{row.section || 'N/A'}</TableCell>
                                    <TableCell>{row.feeType || 'N/A'}</TableCell>
                                    <TableCell>${row.amount || '0.00'}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status || 'Pending'}
                                            size="small"
                                            sx={getStatusColor(row.status)}
                                        />
                                    </TableCell>
                                    <TableCell>{row.dueDate ? new Date(row.dueDate).toLocaleDateString() : 'N/A'}</TableCell>
                                    <TableCell>
                                        <IconButton 
                                            size="small" 
                                            onClick={(e) => handleMenuOpen(e, row)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                count={filteredFees.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    mt: 2,
                    '& .MuiTablePagination-toolbar': {
                        justifyContent: 'center'
                    }
                }}
            />

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleView}>
                    <ListItemIcon>
                        <VisibilityIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>View Details</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleEdit}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDeleteClick}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this fee record? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default FeesCollection;