import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import {
    Paper, Table, TableBody, TableContainer,
    TableHead, TablePagination, Button, Box, IconButton,
    TextField, InputAdornment, Typography, Breadcrumbs, Link,
    Checkbox, Avatar, Chip
} from '@mui/material';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';

const ShowTeachers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [searchId, setSearchId] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchPhone, setSearchPhone] = useState('');
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [selectedTeachers, setSelectedTeachers] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser, user } = useSelector((state) => state.user);

    useEffect(() => {
        const userId = currentUser?._id || user?._id;
        if (userId) {
            dispatch(getAllTeachers(userId));
        }
    }, [currentUser?._id, user?._id, dispatch]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    // Sample data matching the image
    const sampleTeachers = [
        {
            _id: '0021',
            name: 'Mark Willy',
            gender: 'Male',
            teachSclass: { sclassName: '2' },
            teachSubject: { subName: 'English' },
            section: 'A',
            address: 'TA-107 Newyork',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com',
            photo: '/api/placeholder/40/40'
        },
        {
            _id: '0022',
            name: 'Jessia Rose',
            gender: 'Female',
            teachSclass: { sclassName: '1' },
            teachSubject: { subName: 'Physics' },
            section: 'A',
            address: '59 Australia, Sydney',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com',
            photo: '/api/placeholder/40/40'
        },
        {
            _id: '0023',
            name: 'Mark Willy',
            gender: 'Male',
            teachSclass: { sclassName: '2' },
            teachSubject: { subName: 'Mathematics' },
            section: 'A',
            address: 'TA-107 Newyork',
            phone: '+ 123 9988568',
            email: 'kazifahim93@gmail.com',
            photo: '/api/placeholder/40/40'
        }
    ];

    // Use fetched data or sample data
    const teachersData = teachersList && teachersList.length > 0 ? teachersList : sampleTeachers;
    
    useEffect(() => {
        setFilteredTeachers(teachersData);
    }, [teachersData]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = () => {
        const filtered = teachersData.filter(teacher => {
            const matchesId = !searchId || teacher._id?.toLowerCase().includes(searchId.toLowerCase()) || teacher.employeeID?.toLowerCase().includes(searchId.toLowerCase());
            const matchesName = !searchName || teacher.name?.toLowerCase().includes(searchName.toLowerCase());
            const matchesPhone = !searchPhone || teacher.phone?.toLowerCase().includes(searchPhone.toLowerCase());
            
            return matchesId && matchesName && matchesPhone;
        });
        setFilteredTeachers(filtered);
        setPage(0);
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedTeachers(filteredTeachers.map(teacher => teacher._id));
        } else {
            setSelectedTeachers([]);
        }
    };

    const handleSelectTeacher = (teacherId) => {
        setSelectedTeachers(prev => 
            prev.includes(teacherId) 
                ? prev.filter(id => id !== teacherId)
                : [...prev, teacherId]
        );
    };

    const getAvatarColor = (name) => {
        const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336', '#00BCD4', '#795548', '#607D8B'];
        const index = name.length % colors.length;
        return colors[index];
    };

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true);
    };

    if (loading) {
        return <div>Loading...</div>;
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
                <Typography color="text.primary">All Teachers</Typography>
            </Breadcrumbs>

            {/* Page Title */}
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
                Teacher
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, color: '#666' }}>
                All Teachers Data
            </Typography>

            {/* Search Section */}
            <Paper sx={{ p: 3, mb: 3, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
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
                        placeholder="Search by Phone..."
                        value={searchPhone}
                        onChange={(e) => setSearchPhone(e.target.value)}
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
                        onClick={handleSearch}
                        sx={{
                            backgroundColor: '#FFD700',
                            color: 'white',
                            px: 3,
                            py: 1,
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#FFC107'
                            }
                        }}
                    >
                        SEARCH
                    </Button>
                </Box>
            </Paper>

            {/* Data Table */}
            <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={selectedTeachers.length > 0 && selectedTeachers.length < filteredTeachers.length}
                                        checked={filteredTeachers.length > 0 && selectedTeachers.length === filteredTeachers.length}
                                        onChange={handleSelectAll}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell>Photo</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Gender</StyledTableCell>
                                <StyledTableCell>Class</StyledTableCell>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell>Section</StyledTableCell>
                                <StyledTableCell>Address</StyledTableCell>
                                <StyledTableCell>Phone</StyledTableCell>
                                <StyledTableCell>E-mail</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTeachers
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((teacher) => {
                                    const isSelected = selectedTeachers.includes(teacher._id);
                                    return (
                                        <StyledTableRow 
                                            hover 
                                            role="checkbox" 
                                            tabIndex={-1} 
                                            key={teacher._id}
                                            selected={isSelected}
                                        >
                                            <StyledTableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={() => handleSelectTeacher(teacher._id)}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>#{teacher._id}</StyledTableCell>
                                            <StyledTableCell>
                                                <Avatar
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                        backgroundColor: getAvatarColor(teacher.name),
                                                        fontSize: '16px'
                                                    }}
                                                >
                                                    {teacher.name?.split(' ').map(n => n[0]).join('')}
                                                </Avatar>
                                            </StyledTableCell>
                                            <StyledTableCell>{teacher.name}</StyledTableCell>
                                            <StyledTableCell>
                                                <Chip 
                                                    label={teacher.gender} 
                                                    size="small"
                                                    color={teacher.gender === 'Male' ? 'primary' : 'secondary'}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>{teacher.teachSclass?.sclassName}</StyledTableCell>
                                            <StyledTableCell>
                                                {teacher.teachSubject?.subName || (
                                                    <Button 
                                                        variant="contained" 
                                                        size="small"
                                                        onClick={() => navigate(`/Admin/teachers/choosesubject/${teacher.teachSclass?._id}/${teacher._id}`)}
                                                        sx={{
                                                            backgroundColor: '#FFD700',
                                                            color: 'white',
                                                            '&:hover': { backgroundColor: '#FFC107' }
                                                        }}
                                                    >
                                                        Add Subject
                                                    </Button>
                                                )}
                                            </StyledTableCell>
                                            <StyledTableCell>{teacher.section}</StyledTableCell>
                                            <StyledTableCell>{teacher.address}</StyledTableCell>
                                            <StyledTableCell>{teacher.phone}</StyledTableCell>
                                            <StyledTableCell>{teacher.email}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <IconButton>
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => navigate("/Admin/teachers/teacher/" + teacher._id)}
                                                    sx={{
                                                        backgroundColor: '#FFD700',
                                                        color: 'white',
                                                        '&:hover': { backgroundColor: '#FFC107' }
                                                    }}
                                                >
                                                    View
                                                </Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    component="div"
                    count={filteredTeachers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default ShowTeachers;