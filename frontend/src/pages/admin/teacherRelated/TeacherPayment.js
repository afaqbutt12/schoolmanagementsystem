import React, { useState, useEffect } from 'react';
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
    Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTeacherPayments, markPaymentAsPaid } from '../../../redux/teacherPaymentRelated/teacherPaymentHandle';

const TeacherPayment = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [searchId, setSearchId] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchPhone, setSearchPhone] = useState('');
    const [filteredPayments, setFilteredPayments] = useState([]);

    const dispatch = useDispatch();
    const { paymentsList, loading } = useSelector((state) => state.teacherPayment);
    const { currentUser, user } = useSelector((state) => state.user);
    
    const adminUser = currentUser || user;

    // Sample data matching the payment history image
    const paymentData = [
        {
            id: '0021',
            photo: '/api/placeholder/40/40',
            name: 'Mark Willy',
            gender: 'Male',
            class: '2',
            subject: 'English',
            amount: '$2,0000.00',
            status: 'Paid',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com'
        },
        {
            id: '0022',
            photo: '/api/placeholder/40/40',
            name: 'Jessia Rose',
            gender: 'Female',
            class: '1',
            subject: 'Mathematics',
            amount: '$2,000.00',
            status: 'Paid',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com'
        },
        {
            id: '0021',
            photo: '/api/placeholder/40/40',
            name: 'Mark Willy',
            gender: 'Male',
            class: '2',
            subject: 'English',
            amount: '$4,0000.00',
            status: 'Paid',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com'
        },
        {
            id: '0022',
            photo: '/api/placeholder/40/40',
            name: 'Jessia Rose',
            gender: 'Female',
            class: '1',
            subject: 'Mathematics',
            amount: '$3,0000.00',
            status: 'Paid',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com'
        },
        {
            id: '0023',
            photo: '/api/placeholder/40/40',
            name: 'Mark Willy',
            gender: 'Male',
            class: '2',
            subject: 'English',
            amount: '$5,000.00',
            status: 'Paid',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com'
        },
        {
            id: '0024',
            photo: '/api/placeholder/40/40',
            name: 'Jessia Rose',
            gender: 'Female',
            class: '1',
            subject: 'Mathematics',
            amount: '$1,0000.00',
            status: 'Paid',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com'
        }
    ];

    useEffect(() => {
        if (adminUser && adminUser._id) {
            dispatch(getAllTeacherPayments(adminUser._id));
        }
    }, [dispatch, adminUser]);

    useEffect(() => {
        if (paymentsList && paymentsList.length > 0) {
            setFilteredPayments(paymentsList);
        } else {
            setFilteredPayments(paymentData);
        }
    }, [paymentsList]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = () => {
        const dataToSearch = paymentsList && paymentsList.length > 0 ? paymentsList : paymentData;
        
        const filtered = dataToSearch.filter(payment => {
            const matchesId = !searchId || payment.id?.toLowerCase().includes(searchId.toLowerCase()) || payment.teacherId?.toLowerCase().includes(searchId.toLowerCase());
            const matchesName = !searchName || payment.name?.toLowerCase().includes(searchName.toLowerCase()) || payment.teacherName?.toLowerCase().includes(searchName.toLowerCase());
            const matchesPhone = !searchPhone || payment.phone?.toLowerCase().includes(searchPhone.toLowerCase());
            
            return matchesId && matchesName && matchesPhone;
        });
        setFilteredPayments(filtered);
        setPage(0);
    };

    const handleMarkAsPaid = (paymentId) => {
        dispatch(markPaymentAsPaid(paymentId));
    };

    const getAvatarColor = (name) => {
        const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336', '#00BCD4', '#795548', '#607D8B'];
        const index = name.length % colors.length;
        return colors[index];
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Paid':
                return 'success';
            case 'Pending':
                return 'warning';
            case 'Overdue':
                return 'error';
            default:
                return 'default';
        }
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
                <Typography color="text.primary" sx={{ color: '#FFD700' }}>
                    Teacher Payment
                </Typography>
            </Breadcrumbs>

            {/* Title */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                Teachers
            </Typography>

            {/* Section Title */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                All Teachers Payment History
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
                        backgroundColor: '#FF9800',
                        color: 'white',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: '#F57C00'
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
                <Table sx={{ minWidth: 650 }} aria-label="payment history table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell padding="checkbox">
                                <Checkbox />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Roll</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Photo</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Class</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>E-mail</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPayments
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow
                                    key={`${row.id}-${index}`}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>#{row.id || row.teacherId}</TableCell>
                                    <TableCell>
                                        <Avatar
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                backgroundColor: getAvatarColor(row.name || row.teacherName),
                                                fontSize: '14px'
                                            }}
                                        >
                                            {(row.name || row.teacherName).split(' ').map(n => n[0]).join('')}
                                        </Avatar>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>
                                        {row.name || row.teacherName}
                                    </TableCell>
                                    <TableCell>{row.gender}</TableCell>
                                    <TableCell>{row.class || row.teachSclass}</TableCell>
                                    <TableCell>{row.subject || row.teachSubject}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                                        ${row.amount}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status}
                                            color={getStatusColor(row.status)}
                                            size="small"
                                            sx={{
                                                fontWeight: 'bold',
                                                minWidth: 60
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>
                                        <IconButton size="small">
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
                count={filteredPayments.length}
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
                        backgroundColor: '#FF9800',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#F57C00'
                        }
                    }
                }}
            />

            {/* Footer */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    © Copyrights akkhor 2019. All rights reserved. Designed by PsdBoss
                </Typography>
            </Box>
        </Box>
    );
};

export default TeacherPayment;
