import { Container, Grid, Paper, Typography, Box, Card, CardContent, Chip, Avatar, List, ListItem, ListItemText, ListItemAvatar, Divider } from '@mui/material';
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Icons
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector(state => state.user);

    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    // Sample data for charts
    const earningsData = [
        { name: 'Mon', totalCollections: 25000, feesCollection: 5000 },
        { name: 'Tue', totalCollections: 35000, feesCollection: 8000 },
        { name: 'Wed', totalCollections: 45000, feesCollection: 12000 },
        { name: 'Thu', totalCollections: 55000, feesCollection: 15000 },
        { name: 'Fri', totalCollections: 65000, feesCollection: 18000 },
        { name: 'Sat', totalCollections: 70000, feesCollection: 20000 },
        { name: 'Sun', totalCollections: 75000, feesCollection: 15000 },
    ];

    const expensesData = [
        { name: 'Jan 2019', amount: 15000 },
        { name: 'Feb 2019', amount: 10000 },
        { name: 'Mar 2019', amount: 8000 },
    ];

    const studentsData = [
        { name: 'Female Students', value: 45000, color: '#1976d2' },
        { name: 'Male Students', value: 105000, color: '#ff9800' },
    ];

    const trafficData = [
        { name: 'Direct', value: 12890, percentage: 50, color: '#4caf50' },
        { name: 'Search', value: 7245, percentage: 27, color: '#2196f3' },
        { name: 'Referrals', value: 4256, percentage: 8, color: '#ff9800' },
        { name: 'Social', value: 500, percentage: 7, color: '#f44336' },
    ];

    const notices = [
        { date: '16 June, 2019', title: 'Great School manag mene esom text of the printing.', author: 'Jennyfar Lopez', time: '5 min ago' },
        { date: '15 June, 2019', title: 'School management system update notification.', author: 'John Doe', time: '2 hours ago' },
        { date: '14 June, 2019', title: 'Important announcement for all students.', author: 'Jane Smith', time: '1 day ago' },
    ];

    return (
        <DashboardContainer>
            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                                        <CountUp start={0} end={numberOfStudents || 150000} duration={2.5} />
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'gray' }}>Students</Typography>
                                </Box>
                                <Avatar sx={{ backgroundColor: '#c8e6c9', width: 60, height: 60 }}>
                                    <PeopleIcon sx={{ fontSize: 30, color: '#2e7d32' }} />
                                </Avatar>
                            </Box>
                        </CardContent>
                    </SummaryCard>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                        <CountUp start={0} end={numberOfTeachers || 2250} duration={2.5} />
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'gray' }}>Teachers</Typography>
                                </Box>
                                <Avatar sx={{ backgroundColor: '#bbdefb', width: 60, height: 60 }}>
                                    <SchoolIcon sx={{ fontSize: 30, color: '#1976d2' }} />
                                </Avatar>
                            </Box>
                        </CardContent>
                    </SummaryCard>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                                        <CountUp start={0} end={5690} duration={2.5} />
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'gray' }}>Parents</Typography>
                                </Box>
                                <Avatar sx={{ backgroundColor: '#ffe0b2', width: 60, height: 60 }}>
                                    <PersonIcon sx={{ fontSize: 30, color: '#ff9800' }} />
                                </Avatar>
                            </Box>
                        </CardContent>
                    </SummaryCard>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                                        $<CountUp start={0} end={193000} duration={2.5} />
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'gray' }}>Earnings</Typography>
                                </Box>
                                <Avatar sx={{ backgroundColor: '#ffcdd2', width: 60, height: 60 }}>
                                    <AttachMoneyIcon sx={{ fontSize: 30, color: '#d32f2f' }} />
                                </Avatar>
                            </Box>
                        </CardContent>
                    </SummaryCard>
                </Grid>
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}>
                    <ChartCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Earnings</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                                    <Box sx={{ width: 12, height: 12, backgroundColor: '#1976d2', borderRadius: '50%', mr: 1 }} />
                                    <Typography variant="body2">Total Collections $75,000</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 12, height: 12, backgroundColor: '#d32f2f', borderRadius: '50%', mr: 1 }} />
                                    <Typography variant="body2">Fees Collection $15,000</Typography>
                                </Box>
                            </Box>
                            <ResponsiveContainer width="100%" height={200}>
                                <AreaChart data={earningsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="totalCollections" stackId="1" stroke="#1976d2" fill="#1976d2" fillOpacity={0.6} />
                                    <Area type="monotone" dataKey="feesCollection" stackId="2" stroke="#d32f2f" fill="#d32f2f" fillOpacity={0.6} />
                                </AreaChart>
                            </ResponsiveContainer>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                                <Typography variant="body2">Jan 20, 2019</Typography>
                                <TrendingUpIcon sx={{ color: 'gray' }} />
                            </Box>
                        </CardContent>
                    </ChartCard>
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <ChartCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Expenses</Typography>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={expensesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="amount" fill="#20b2aa" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </ChartCard>
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <ChartCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Students</Typography>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={studentsData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {studentsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 12, height: 12, backgroundColor: '#1976d2', borderRadius: '50%', mr: 1 }} />
                                    <Typography variant="body2">Female Students 45,000</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 12, height: 12, backgroundColor: '#ff9800', borderRadius: '50%', mr: 1 }} />
                                    <Typography variant="body2">Male Students 1,05,000</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </ChartCard>
                </Grid>
            </Grid>

            {/* Widgets Section */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <WidgetCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Event Calendar</Typography>
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
                            <Typography variant="body2" sx={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>
                                19
                            </Typography>
                        </CardContent>
                    </WidgetCard>
                </Grid>
                
                <Grid item xs={12} md={3}>
                    <WidgetCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Website Traffic</Typography>
                            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>2,590</Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>Unique Visitors</Typography>
                            {trafficData.map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Box sx={{ width: 12, height: 12, backgroundColor: item.color, borderRadius: '50%', mr: 1 }} />
                                    <Typography variant="body2" sx={{ flexGrow: 1 }}>{item.name}</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{item.value.toLocaleString()}</Typography>
                                </Box>
                            ))}
                        </CardContent>
                    </WidgetCard>
                </Grid>
                
                <Grid item xs={12} md={3}>
                    <WidgetCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Notice Board</Typography>
                            <List sx={{ maxHeight: 200, overflow: 'auto' }}>
                                {notices.map((notice, index) => (
                                    <ListItem key={index} sx={{ px: 0 }}>
                                        <ListItemAvatar>
                                            <Chip label={notice.date} size="small" color="success" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={notice.title}
                                            secondary={`${notice.author} / ${notice.time}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </WidgetCard>
                </Grid>
                
                <Grid item xs={12} md={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <SocialCard sx={{ backgroundColor: '#1976d2' }}>
                                <FacebookIcon sx={{ color: 'white', fontSize: 30 }} />
                                <Typography variant="body2" sx={{ color: 'white', textAlign: 'center' }}>Like us on facebook</Typography>
                                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>30,000</Typography>
                            </SocialCard>
                        </Grid>
                        <Grid item xs={6}>
                            <SocialCard sx={{ backgroundColor: '#03a9f4' }}>
                                <TwitterIcon sx={{ color: 'white', fontSize: 30 }} />
                                <Typography variant="body2" sx={{ color: 'white', textAlign: 'center' }}>Follow us on twitter</Typography>
                                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>1,11,000</Typography>
                            </SocialCard>
                        </Grid>
                        <Grid item xs={6}>
                            <SocialCard sx={{ backgroundColor: '#d32f2f' }}>
                                <GoogleIcon sx={{ color: 'white', fontSize: 30 }} />
                                <Typography variant="body2" sx={{ color: 'white', textAlign: 'center' }}>Follow us on googleplus</Typography>
                                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>19,000</Typography>
                            </SocialCard>
                        </Grid>
                        <Grid item xs={6}>
                            <SocialCard sx={{ backgroundColor: '#1565c0' }}>
                                <LinkedInIcon sx={{ color: 'white', fontSize: 30 }} />
                                <Typography variant="body2" sx={{ color: 'white', textAlign: 'center' }}>Follow us on linked</Typography>
                                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>45,000</Typography>
                            </SocialCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* Footer */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                    © Copyrights akkhor 2019. All rights reserved. Designed by PsdBosS
                </Typography>
            </Box>
        </DashboardContainer>
    );
};

const DashboardContainer = styled(Container)`
    padding: 24px;
    background-color: #f8f9fa;
    min-height: 100vh;
    
    @media (max-width: 768px) {
        padding: 16px;
    }
    
    @media (max-width: 480px) {
        padding: 8px;
    }
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

const ChartCard = styled(Card)`
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    height: 100%;
`;

const WidgetCard = styled(Card)`
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    height: 100%;
`;

const SocialCard = styled(Card)`
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 16px;
    text-align: center;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export default AdminHomePage;