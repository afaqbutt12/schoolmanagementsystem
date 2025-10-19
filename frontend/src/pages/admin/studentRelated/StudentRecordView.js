import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { useParams } from 'react-router-dom';
import { 
    Container, 
    Grid, 
    Paper, 
    Typography, 
    Box, 
    Card, 
    CardContent, 
    Avatar, 
    Chip, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TextField, 
    Button, 
    InputAdornment,
    Pagination,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Divider
} from '@mui/material';
import styled from 'styled-components';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';

const StudentRecordView = () => {
    const dispatch = useDispatch();
    const { userDetails, loading } = useSelector((state) => state.user);
    const params = useParams();
    const studentID = params.id;

    useEffect(() => {
        if (studentID) {
            dispatch(getUserDetails(studentID, "Student"));
        }
    }, [dispatch, studentID]);

    // Sample data for demonstration
    const summaryCards = [
        { title: "Notification", value: "12", icon: <NotificationsIcon />, color: "#9c27b0" },
        { title: "Events", value: "6", icon: <EventIcon />, color: "#2196f3" },
        { title: "Attendance", value: "94%", icon: <CheckCircleIcon />, color: "#ff9800" }
    ];

    const examResults = [
        { id: 1, examName: "Class Test", subject: "English", grade: "A", percent: "99.00", date: "15/06/2019" },
        { id: 2, examName: "Class Test", subject: "Chemistry", grade: "D", percent: "70.00", date: "14/06/2019" },
        { id: 3, examName: "First Semister", subject: "English", grade: "C", percent: "80.00", date: "13/06/2019" },
        { id: 4, examName: "First Semister", subject: "Chemistry", grade: "B", percent: "85.00", date: "12/06/2019" },
        { id: 5, examName: "Class Test", subject: "Mathematics", grade: "A", percent: "95.00", date: "11/06/2019" }
    ];

    const attendanceData = [
        { name: 'Absent', value: 28.2, color: '#1976d2' },
        { name: 'Present', value: 65.8, color: '#ff9800' }
    ];

    const notifications = [
        { date: "16 June, 2019", title: "Great School manag mene esom tus eleifend lectus sed maximus mi faucibusnting.", author: "Jennyfar Lopez", time: "5 min ago", color: "#1976d2" },
        { date: "15 June, 2019", title: "Great School manag printing.", author: "Jennyfar Lopez", time: "5 min ago", color: "#ffc107" },
        { date: "14 June, 2019", title: "Great School manag Nulla rhoncus eleifensed mim us", author: "John Doe", time: "2 hours ago", color: "#e91e63" }
    ];

    const studentInfo = userDetails ? {
        name: userDetails.name || "Jessia Rose",
        gender: "Female",
        fatherName: "Fahim Rahman",
        motherName: "Jannatul Kazi",
        dateOfBirth: "07.08.2006",
        religion: "Islam",
        fatherOccupation: "Graphic Designer",
        email: "jessiarose@gmail.com",
        admissionDate: "05.01.2019",
        class: "2",
        section: "Pink",
        roll: userDetails.rollNum || "10005",
        address: "House #10, Road #6, Australia",
        phone: "+ 88 9856418"
    } : {
        name: "Jessia Rose",
        gender: "Female",
        fatherName: "Fahim Rahman",
        motherName: "Jannatul Kazi",
        dateOfBirth: "07.08.2006",
        religion: "Islam",
        fatherOccupation: "Graphic Designer",
        email: "jessiarose@gmail.com",
        admissionDate: "05.01.2019",
        class: "2",
        section: "Pink",
        roll: "10005",
        address: "House #10, Road #6, Australia",
        phone: "+ 88 9856418"
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <DashboardContainer>
            {/* Breadcrumb */}
            <BreadcrumbContainer>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>Admin Dashboard</Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>Home &gt; Student</Typography>
            </BreadcrumbContainer>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {summaryCards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <SummaryCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: card.color }}>
                                            {card.value}
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: 'gray' }}>{card.title}</Typography>
                                    </Box>
                                    <Avatar sx={{ backgroundColor: card.color, width: 60, height: 60 }}>
                                        {card.icon}
                                    </Avatar>
                                </Box>
                            </CardContent>
                        </SummaryCard>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3}>
                {/* About Me Section */}
                <Grid item xs={12} md={6}>
                    <AboutMeCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>About Me</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <Avatar sx={{ width: 80, height: 80, mr: 2, backgroundColor: '#e91e63' }}>
                                    <PersonIcon sx={{ fontSize: 40 }} />
                                </Avatar>
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{studentInfo.name}</Typography>
                                    <Typography variant="body2" sx={{ color: 'gray', mt: 1 }}>
                                        Aliquam erat volutpat. Curabiene natis massa sedde lacustiquen sodale word moun taiery.
                                    </Typography>
                                </Box>
                            </Box>
                            
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <InfoItem>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Name:</Typography>
                                        <Typography variant="body2">{studentInfo.name}</Typography>
                                    </InfoItem>
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoItem>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Gender:</Typography>
                                        <Typography variant="body2">{studentInfo.gender}</Typography>
                                    </InfoItem>
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoItem>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Father Name:</Typography>
                                        <Typography variant="body2">{studentInfo.fatherName}</Typography>
                                    </InfoItem>
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoItem>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Mother Name:</Typography>
                                        <Typography variant="body2">{studentInfo.motherName}</Typography>
                                    </InfoItem>
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoItem>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Date Of Birth:</Typography>
                                        <Typography variant="body2">{studentInfo.dateOfBirth}</Typography>
                                    </InfoItem>
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoItem>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Religion:</Typography>
                                        <Typography variant="body2">{studentInfo.religion}</Typography>
                                    </InfoItem>
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoItem>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Father Occupation:</Typography>
                                        <Typography variant="body2">{studentInfo.fatherOccupation}</Typography>
                                    </InfoItem>
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoItem>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>E-Mail:</Typography>
                                        <Typography variant="body2">{studentInfo.email}</Typography>
                                    </InfoItem>
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoItem>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Admission Date:</Typography>
                                        <Typography variant="body2">{studentInfo.admissionDate}</Typography>
                                    </InfoItem>
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoItem>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Class:</Typography>
                                        <Typography variant="body2">{studentInfo.class}</Typography>
                                    </InfoItem>
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoItem>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Section:</Typography>
                                        <Typography variant="body2">{studentInfo.section}</Typography>
                                    </InfoItem>
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoItem>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Roll:</Typography>
                                        <Typography variant="body2">{studentInfo.roll}</Typography>
                                    </InfoItem>
                                </Grid>
                                <Grid item xs={12}>
                                    <InfoItem>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Address:</Typography>
                                        <Typography variant="body2">{studentInfo.address}</Typography>
                                    </InfoItem>
                                </Grid>
                                <Grid item xs={12}>
                                    <InfoItem>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Phone:</Typography>
                                        <Typography variant="body2">{studentInfo.phone}</Typography>
                                    </InfoItem>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </AboutMeCard>
                </Grid>

                {/* All Exam Results */}
                <Grid item xs={12} md={6}>
                    <ExamResultsCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>All Exam Results</Typography>
                            
                            {/* Search Fields */}
                            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                                <TextField
                                    placeholder="Search by Exam..."
                                    size="small"
                                    sx={{ flexGrow: 1, minWidth: 150 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    placeholder="Search by Subject..."
                                    size="small"
                                    sx={{ flexGrow: 1, minWidth: 150 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    placeholder="dd/mm/yyyy"
                                    size="small"
                                    sx={{ minWidth: 120 }}
                                />
                                <Button variant="contained" sx={{ backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#f57c00' } }}>
                                    SEARCH
                                </Button>
                            </Box>

                            {/* Results Table */}
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Exam Name</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Grade</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Percent</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {examResults.map((result) => (
                                            <TableRow key={result.id}>
                                                <TableCell>{result.id}</TableCell>
                                                <TableCell>{result.examName}</TableCell>
                                                <TableCell>{result.subject}</TableCell>
                                                <TableCell>{result.grade}</TableCell>
                                                <TableCell>{result.percent} &gt; 100</TableCell>
                                                <TableCell>{result.date}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* Pagination */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Pagination count={3} page={1} color="primary" />
                            </Box>
                        </CardContent>
                    </ExamResultsCard>
                </Grid>

                {/* Attendance Chart */}
                <Grid item xs={12} md={6}>
                    <AttendanceCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Attendance</Typography>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={attendanceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {attendanceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 12, height: 12, backgroundColor: '#1976d2', borderRadius: '50%', mr: 1 }} />
                                    <Typography variant="body2">Absent 28.2%</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 12, height: 12, backgroundColor: '#ff9800', borderRadius: '50%', mr: 1 }} />
                                    <Typography variant="body2">Present 65.8%</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </AttendanceCard>
                </Grid>

                {/* Event Calendar */}
                <Grid item xs={12} md={3}>
                    <EventCalendarCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Event Calendar</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6">October 2025</Typography>
                                <Box>
                                    <CalendarTodayIcon sx={{ mr: 1 }} />
                                    <CalendarTodayIcon sx={{ mr: 1 }} />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <Chip label="Day" size="small" />
                                <Chip label="Week" size="small" />
                                <Chip label="Month" size="small" color="primary" />
                            </Box>
                            <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#e91e63' }}>
                                19
                            </Typography>
                        </CardContent>
                    </EventCalendarCard>
                </Grid>

                {/* Notifications */}
                <Grid item xs={12} md={3}>
                    <NotificationsCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Notifications</Typography>
                            <List sx={{ maxHeight: 200, overflow: 'auto' }}>
                                {notifications.map((notification, index) => (
                                    <ListItem key={index} sx={{ px: 0 }}>
                                        <ListItemAvatar>
                                            <Chip 
                                                label={notification.date} 
                                                size="small" 
                                                sx={{ backgroundColor: notification.color, color: 'white' }} 
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={notification.title}
                                            secondary={`${notification.author} / ${notification.time}`}
                                            sx={{ ml: 1 }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </NotificationsCard>
                </Grid>
            </Grid>
        </DashboardContainer>
    );
};

const DashboardContainer = styled(Container)`
    padding: 24px;
    background-color: #f8f9fa;
    min-height: 100vh;
`;

const BreadcrumbContainer = styled(Box)`
    margin-bottom: 24px;
`;

const SummaryCard = styled(Card)`
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.2s;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }
`;

const AboutMeCard = styled(Card)`
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    height: 100%;
`;

const ExamResultsCard = styled(Card)`
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    height: 100%;
`;

const AttendanceCard = styled(Card)`
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    height: 100%;
`;

const EventCalendarCard = styled(Card)`
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    height: 100%;
`;

const NotificationsCard = styled(Card)`
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    height: 100%;
`;

const InfoItem = styled(Box)`
    margin-bottom: 8px;
`;

export default StudentRecordView;
