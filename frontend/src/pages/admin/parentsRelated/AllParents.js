import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    TablePagination,
    IconButton,
    Checkbox,
    Breadcrumbs,
    Link,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector, useDispatch } from 'react-redux';
import { getAllParents, deleteParent } from '../../../redux/parentRelated/parentHandle';
import Popup from '../../../components/Popup';

const AllParents = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [searchId, setSearchId] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchPhone, setSearchPhone] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedParent, setSelectedParent] = useState(null);
    const [filteredParents, setFilteredParents] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuParent, setMenuParent] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const { parentsList, loading, error, response } = useSelector((state) => state.parent);
    const { currentUser, user } = useSelector((state) => state.user);
    
    const adminUser = currentUser || user;

    useEffect(() => {
        if (adminUser && adminUser._id) {
            dispatch(getAllParents(adminUser._id));
        }
    }, [dispatch, adminUser]);

    useEffect(() => {
        if (parentsList && parentsList.length > 0) {
            setFilteredParents(parentsList);
        }
    }, [parentsList]);

    useEffect(() => {
        if (error) {
            setMessage(typeof error === 'string' ? error : error.message || 'An error occurred');
            setShowPopup(true);
        } else if (response) {
            setMessage("Operation completed successfully!");
            setShowPopup(true);
            // Refresh the list
            if (adminUser && adminUser._id) {
                dispatch(getAllParents(adminUser._id));
            }
        }
    }, [error, response, adminUser, dispatch]);

    const handleSearch = () => {
        if (!parentsList) return;
        
        const filtered = parentsList.filter(parent => {
            const matchesId = !searchId || parent.idNo?.toLowerCase().includes(searchId.toLowerCase());
            const matchesName = !searchName || 
                `${parent.firstName} ${parent.lastName}`.toLowerCase().includes(searchName.toLowerCase());
            const matchesPhone = !searchPhone || parent.phone?.toLowerCase().includes(searchPhone.toLowerCase());
            
            return matchesId && matchesName && matchesPhone;
        });
        
        setFilteredParents(filtered);
        setPage(0);
    };

    const handleMenuOpen = (event, parent) => {
        setAnchorEl(event.currentTarget);
        setMenuParent(parent);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuParent(null);
    };

    const handleView = () => {
        if (menuParent) {
            navigate(`/Profile/${menuParent._id}`);
        }
        handleMenuClose();
    };

    const handleEdit = () => {
        if (menuParent) {
            navigate(`/Admin/parents/edit/${menuParent._id}`);
        }
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        if (menuParent) {
            setSelectedParent(menuParent);
            setDeleteDialogOpen(true);
        }
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        if (selectedParent) {
            dispatch(deleteParent(selectedParent._id));
            setDeleteDialogOpen(false);
            setSelectedParent(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedParent(null);
    };

    // Sample data matching the parents image (fallback)
    const parentsData = [
        {
            id: '0021',
            photo: '/api/placeholder/40/40',
            name: 'Mark Willy',
            gender: 'Male',
            occupation: 'Businessman',
            address: 'TA-107 Newyork',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com'
        },
        {
            id: '0022',
            photo: '/api/placeholder/40/40',
            name: 'Jessia Rose',
            gender: 'Female',
            occupation: 'House Wife',
            address: '59 Australia, Sydney',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com'
        },
        {
            id: '0023',
            photo: '/api/placeholder/40/40',
            name: 'John Smith',
            gender: 'Male',
            occupation: 'Banker',
            address: '123 Main Street, London',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com'
        },
        {
            id: '0024',
            photo: '/api/placeholder/40/40',
            name: 'Sarah Wilson',
            gender: 'Female',
            occupation: 'Teacher',
            address: '456 Oak Avenue, Paris',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com'
        },
        {
            id: '0025',
            photo: '/api/placeholder/40/40',
            name: 'Michael Brown',
            gender: 'Male',
            occupation: 'Engineer',
            address: '789 Pine Road, Berlin',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com'
        },
        {
            id: '0026',
            photo: '/api/placeholder/40/40',
            name: 'Emily Davis',
            gender: 'Female',
            occupation: 'Doctor',
            address: '321 Elm Street, Tokyo',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com'
        },
        {
            id: '0027',
            photo: '/api/placeholder/40/40',
            name: 'David Johnson',
            gender: 'Male',
            occupation: 'Lawyer',
            address: '654 Maple Lane, Rome',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com'
        },
        {
            id: '0028',
            photo: '/api/placeholder/40/40',
            name: 'Lisa Anderson',
            gender: 'Female',
            occupation: 'Nurse',
            address: '987 Cedar Blvd, Madrid',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com'
        },
        {
            id: '0029',
            photo: '/api/placeholder/40/40',
            name: 'Robert Taylor',
            gender: 'Male',
            occupation: 'Accountant',
            address: '147 Birch Street, Amsterdam',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com'
        },
        {
            id: '0030',
            photo: '/api/placeholder/40/40',
            name: 'Maria Garcia',
            gender: 'Female',
            occupation: 'Designer',
            address: '258 Willow Way, Vienna',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com'
        },
        // Add more sample data to reach 20 rows
        ...Array.from({ length: 10 }, (_, i) => ({
            id: String(31 + i).padStart(4, '0'),
            photo: '/api/placeholder/40/40',
            name: `Parent ${31 + i}`,
            gender: i % 2 === 0 ? 'Male' : 'Female',
            occupation: ['Businessman', 'House Wife', 'Banker', 'Teacher', 'Engineer'][i % 5],
            address: `Address ${31 + i}`,
            phone: '+ 123 9988568',
            email: `parent${31 + i}@gmail.com`
        }))
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getAvatarColor = (name) => {
        const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336', '#00BCD4', '#795548', '#607D8B'];
        const index = name.length % colors.length;
        return colors[index];
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
                <Typography color="text.primary" sx={{ color: '#FFD700' }}>All Parents</Typography>
            </Breadcrumbs>

            {/* Title */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                All Parents Data
            </Typography>

            {/* Search Filters */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <TextField
                    placeholder="Search by ID..."
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    size="small"
                    sx={{ minWidth: 200 }}
                />
                <TextField
                    placeholder="Search by Name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    size="small"
                    sx={{ minWidth: 200 }}
                />
                <TextField
                    placeholder="Search by Phone..."
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
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
            </Box>

            {/* Table */}
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <Table sx={{ minWidth: 650 }} aria-label="parents table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell padding="checkbox">
                                <Checkbox />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Photo</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Occupation</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>E-mail</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredParents
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow
                                    key={row._id || row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>{row.idNo || row.id}</TableCell>
                                    <TableCell>
                                        <Avatar
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                backgroundColor: getAvatarColor(row.firstName || row.name),
                                                fontSize: '14px'
                                            }}
                                        >
                                            {(row.firstName || row.name).split(' ').map(n => n[0]).join('')}
                                        </Avatar>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>
                                        {row.firstName && row.lastName ? `${row.firstName} ${row.lastName}` : row.name}
                                    </TableCell>
                                    <TableCell>{row.gender}</TableCell>
                                    <TableCell>{row.occupation || 'N/A'}</TableCell>
                                    <TableCell>{row.address || 'N/A'}</TableCell>
                                    <TableCell>{row.phone || 'N/A'}</TableCell>
                                    <TableCell>{row.email || 'N/A'}</TableCell>
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
                count={filteredParents.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    mt: 2,
                    '& .MuiTablePagination-toolbar': {
                        justifyContent: 'center'
                    },
                    '& .MuiPaginationItem-root.Mui-selected': {
                        backgroundColor: '#FFD700',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#FFC107'
                        }
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
                        Are you sure you want to delete {selectedParent ? `${selectedParent.firstName || selectedParent.name} ${selectedParent.lastName || ''}` : 'this parent'}? This action cannot be undone.
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

            {/* Footer */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    © Copyrights akkhor 2019. All rights reserved. Designed by PsdBosS
                </Typography>
            </Box>
        </Box>
    );
};

export default AllParents;
