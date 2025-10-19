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
    TablePagination,
    IconButton,
    Checkbox,
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
import { getAllBooks, deleteBook } from '../../../redux/bookRelated/bookHandle';
import Popup from '../../../components/Popup';

const AllBooks = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [searchId, setSearchId] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchSubject, setSearchSubject] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuBook, setMenuBook] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');

    const { booksList, loading, error, response } = useSelector((state) => state.book);
    const { currentUser, user } = useSelector((state) => state.user);
    
    const adminUser = currentUser || user;

    useEffect(() => {
        if (adminUser && adminUser._id) {
            dispatch(getAllBooks(adminUser._id));
        }
    }, [dispatch, adminUser]);

    useEffect(() => {
        if (booksList && booksList.length > 0) {
            setFilteredBooks(booksList);
        }
    }, [booksList]);

    useEffect(() => {
        if (error) {
            setMessage(typeof error === 'string' ? error : error.message || 'An error occurred');
            setShowPopup(true);
        } else if (response) {
            setMessage("Operation completed successfully!");
            setShowPopup(true);
            // Refresh the list
            if (adminUser && adminUser._id) {
                dispatch(getAllBooks(adminUser._id));
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
        if (!booksList) return;
        
        const filtered = booksList.filter(book => {
            const matchesId = !searchId || book.idNo?.toLowerCase().includes(searchId.toLowerCase());
            const matchesName = !searchName || book.bookName?.toLowerCase().includes(searchName.toLowerCase());
            const matchesSubject = !searchSubject || book.subject?.toLowerCase().includes(searchSubject.toLowerCase());
            
            return matchesId && matchesName && matchesSubject;
        });
        
        setFilteredBooks(filtered);
        setPage(0);
    };

    const handleMenuOpen = (event, book) => {
        setAnchorEl(event.currentTarget);
        setMenuBook(book);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuBook(null);
    };

    const handleView = () => {
        if (menuBook) {
            // Navigate to book details page (you can create this page later)
            setMessage("View book details - Page coming soon!");
            setShowPopup(true);
        }
        handleMenuClose();
    };

    const handleEdit = () => {
        if (menuBook) {
            navigate(`/Admin/library/edit/${menuBook._id}`);
        }
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        if (menuBook) {
            setSelectedBook(menuBook);
            setDeleteDialogOpen(true);
        }
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        if (selectedBook) {
            dispatch(deleteBook(selectedBook._id));
            setDeleteDialogOpen(false);
            setSelectedBook(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedBook(null);
    };

    const getAvatarColor = (name) => {
        const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336'];
        const index = name?.length % colors.length || 0;
        return colors[index];
    };

    if (loading) {
        return <Box sx={{ p: 3 }}><Typography>Loading books...</Typography></Box>;
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
                <Typography color="text.primary">All Library Books</Typography>
            </Breadcrumbs>

            {/* Page Title */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                    Library Books
                </Typography>
                <Typography variant="h6" sx={{ color: '#666' }}>
                    All Library Books Data
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
                    />
                    <TextField
                        placeholder="Search by Book Name..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        size="small"
                        sx={{ minWidth: 200 }}
                    />
                    <TextField
                        placeholder="Search by Subject..."
                        value={searchSubject}
                        onChange={(e) => setSearchSubject(e.target.value)}
                        size="small"
                        sx={{ minWidth: 200 }}
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
                        onClick={() => navigate('/Admin/library/add-book')}
                    >
                        ADD NEW BOOK
                    </Button>
                </Box>
            </Paper>

            {/* Table */}
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <Table sx={{ minWidth: 650 }} aria-label="books table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell padding="checkbox">
                                <Checkbox />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Book Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Writer</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Class</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Published</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Creating Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredBooks
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>{row.idNo || row._id?.slice(0, 4)}</TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>{row.bookName || 'N/A'}</TableCell>
                                    <TableCell>{row.subject || 'N/A'}</TableCell>
                                    <TableCell>{row.writer || 'N/A'}</TableCell>
                                    <TableCell>{row.class || 'N/A'}</TableCell>
                                    <TableCell>{row.published ? new Date(row.published).getFullYear() : 'N/A'}</TableCell>
                                    <TableCell>{row.uploadDate ? new Date(row.uploadDate).toLocaleDateString() : 'N/A'}</TableCell>
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
                count={filteredBooks.length}
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
                        Are you sure you want to delete {selectedBook ? selectedBook.bookName : 'this book'}? This action cannot be undone.
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

export default AllBooks;