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
import { getAllExpenses, deleteExpense } from '../../../redux/expenseRelated/expenseHandle';
import Popup from '../../../components/Popup';

const Expenses = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [searchName, setSearchName] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchAmount, setSearchAmount] = useState('');
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuExpense, setMenuExpense] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');

    const { expensesList, loading, error, response } = useSelector((state) => state.expense);
    const { currentUser, user } = useSelector((state) => state.user);
    
    const adminUser = currentUser || user;

    useEffect(() => {
        if (adminUser && adminUser._id) {
            dispatch(getAllExpenses(adminUser._id));
        }
    }, [dispatch, adminUser]);

    useEffect(() => {
        if (expensesList && expensesList.length > 0) {
            setFilteredExpenses(expensesList);
        }
    }, [expensesList]);

    useEffect(() => {
        if (error) {
            setMessage(typeof error === 'string' ? error : error.message || 'An error occurred');
            setShowPopup(true);
        } else if (response) {
            setMessage("Operation completed successfully!");
            setShowPopup(true);
            // Refresh the list
            if (adminUser && adminUser._id) {
                dispatch(getAllExpenses(adminUser._id));
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
        if (!expensesList) return;
        
        const filtered = expensesList.filter(expense => {
            const matchesName = !searchName || expense.name?.toLowerCase().includes(searchName.toLowerCase());
            const matchesType = !searchType || expense.expenseType?.toLowerCase().includes(searchType.toLowerCase());
            const matchesAmount = !searchAmount || expense.amount?.toString().includes(searchAmount);
            
            return matchesName && matchesType && matchesAmount;
        });
        
        setFilteredExpenses(filtered);
        setPage(0);
    };

    const handleMenuOpen = (event, expense) => {
        setAnchorEl(event.currentTarget);
        setMenuExpense(expense);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuExpense(null);
    };

    const handleView = () => {
        if (menuExpense) {
            setMessage("View expense details - Page coming soon!");
            setShowPopup(true);
        }
        handleMenuClose();
    };

    const handleEdit = () => {
        if (menuExpense) {
            navigate(`/Admin/account/edit-expense/${menuExpense._id}`);
        }
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        if (menuExpense) {
            setSelectedExpense(menuExpense);
            setDeleteDialogOpen(true);
        }
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        if (selectedExpense) {
            dispatch(deleteExpense(selectedExpense._id));
            setDeleteDialogOpen(false);
            setSelectedExpense(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedExpense(null);
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'paid':
                return { backgroundColor: '#4CAF50', color: 'white' };
            case 'pending':
            case 'due':
                return { backgroundColor: '#FF9800', color: 'white' };
            case 'approved':
                return { backgroundColor: '#2196F3', color: 'white' };
            case 'rejected':
                return { backgroundColor: '#F44336', color: 'white' };
            default:
                return { backgroundColor: '#9E9E9E', color: 'white' };
        }
    };

    if (loading) {
        return <Box sx={{ p: 3 }}><Typography>Loading expenses...</Typography></Box>;
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
                <Typography color="text.primary">Expenses</Typography>
            </Breadcrumbs>

            {/* Page Title */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                    Expenses
                </Typography>
                <Typography variant="h6" sx={{ color: '#666' }}>
                    All Expenses Data
                </Typography>
            </Box>

            {/* Search Section */}
            <Paper sx={{ p: 3, mb: 3, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
                        placeholder="Search by Type..."
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
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
                        onClick={() => navigate('/Admin/account/add-expenses')}
                    >
                        ADD NEW EXPENSE
                    </Button>
                </Box>
            </Paper>

            {/* Table */}
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <Table sx={{ minWidth: 650 }} aria-label="expenses table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell padding="checkbox">
                                <Checkbox />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Expense Type</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredExpenses
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>{row._id?.slice(0, 6)}</TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>{row.name || 'N/A'}</TableCell>
                                    <TableCell>{row.expenseType || 'N/A'}</TableCell>
                                    <TableCell>{row.category || 'N/A'}</TableCell>
                                    <TableCell>${row.amount || '0.00'}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status || 'Pending'}
                                            size="small"
                                            sx={getStatusColor(row.status)}
                                        />
                                    </TableCell>
                                    <TableCell>{row.date ? new Date(row.date).toLocaleDateString() : 'N/A'}</TableCell>
                                    <TableCell>{row.phone || 'N/A'}</TableCell>
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
                count={filteredExpenses.length}
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
                        Are you sure you want to delete this expense record? This action cannot be undone.
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

export default Expenses;