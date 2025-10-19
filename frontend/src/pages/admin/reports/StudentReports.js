import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { 
    Container, 
    Grid, 
    Paper, 
    Typography, 
    Box, 
    Card, 
    CardContent, 
    Avatar, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TextField, 
    Button, 
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar
} from '@mui/material';
import styled from 'styled-components';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    PieChart, 
    Pie, 
    Cell, 
    LineChart, 
    Line,
    AreaChart,
    Area
} from 'recharts';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const StudentReports = () => {
    const dispatch = useDispatch();
    const { studentsList, loading } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        if (currentUser._id) {
            dispatch(getAllStudents(currentUser._id));
        }
    }, [dispatch, currentUser._id]);

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [dateRange, setDateRange] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Sample data for demonstration
    const attendanceData = [
        { name: 'Class 1', present: 85, absent: 15 },
        { name: 'Class 2', present: 92, absent: 8 },
        { name: 'Class 3', present: 78, absent: 22 },
        { name: 'Class 4', present: 88, absent: 12 },
        { name: 'Class 5', present: 95, absent: 5 },
    ];

    const examResultsData = [
        { subject: 'Mathematics', average: 85, grade: 'A', students: 120 },
        { subject: 'English', average: 78, grade: 'B', students: 120 },
        { subject: 'Science', average: 82, grade: 'A-', students: 120 },
        { subject: 'History', average: 75, grade: 'B-', students: 120 },
        { subject: 'Physics', average: 88, grade: 'A', students: 120 },
    ];

    const gradeDistribution = [
        { name: 'A+', value: 15, color: '#4caf50' },
        { name: 'A', value: 25, color: '#8bc34a' },
        { name: 'B+', value: 20, color: '#cddc39' },
        { name: 'B', value: 18, color: '#ffeb3b' },
        { name: 'C+', value: 12, color: '#ffc107' },
        { name: 'C', value: 8, color: '#ff9800' },
        { name: 'D', value: 2, color: '#ff5722' },
    ];

    const monthlyTrends = [
        { month: 'Jan', attendance: 85, performance: 78 },
        { month: 'Feb', attendance: 88, performance: 82 },
        { month: 'Mar', attendance: 82, performance: 85 },
        { month: 'Apr', attendance: 90, performance: 88 },
        { month: 'May', attendance: 87, performance: 90 },
        { month: 'Jun', attendance: 92, performance: 85 },
    ];

    const topPerformers = [
        { name: 'John Doe', class: 'Class 5', grade: 'A+', attendance: '98%' },
        { name: 'Jane Smith', class: 'Class 4', grade: 'A', attendance: '95%' },
        { name: 'Mike Johnson', class: 'Class 3', grade: 'A', attendance: '92%' },
        { name: 'Sarah Wilson', class: 'Class 2', grade: 'A-', attendance: '90%' },
        { name: 'David Brown', class: 'Class 1', grade: 'A-', attendance: '88%' },
    ];

    const recentActivities = [
        { action: 'New student enrolled', student: 'Emma Davis', time: '2 hours ago', type: 'enrollment' },
        { action: 'Exam completed', student: 'Alex Miller', time: '4 hours ago', type: 'exam' },
        { action: 'Attendance updated', student: 'Lisa Garcia', time: '6 hours ago', type: 'attendance' },
        { action: 'Grade submitted', student: 'Tom Wilson', time: '8 hours ago', type: 'grade' },
        { action: 'Parent meeting scheduled', student: 'Kate Anderson', time: '1 day ago', type: 'meeting' },
    ];

    const summaryStats = [
        { title: "Total Students", value: studentsList?.length || 0, icon: <PersonIcon />, color: "#1976d2", trend: "+5%" },
        { title: "Average Attendance", value: "89%", icon: <SchoolIcon />, color: "#4caf50", trend: "+2%" },
        { title: "Exam Performance", value: "85%", icon: <AssessmentIcon />, color: "#ff9800", trend: "+3%" },
        { title: "Active Classes", value: "12", icon: <SchoolIcon />, color: "#9c27b0", trend: "+1" },
    ];

    const handleExport = () => {
        // Export functionality
        console.log('Exporting reports...');
    };

    const handlePrint = () => {
        // Print functionality
        window.print();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <ReportsContainer>
            {/* Header */}
            <ReportsHeader>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>Student Reports</Typography>
                <Typography variant="body2" sx={{ color: 'gray', mb: 3 }}>Comprehensive analytics and insights for student performance</Typography>
                
                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExport}>
                        Export Report
                    </Button>
                    <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint}>
                        Print Report
                    </Button>
                </Box>
            </ReportsHeader>

            {/* Filters */}
            <FiltersCard>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>Filters</Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                placeholder="Search students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Class</InputLabel>
                                <Select
                                    value={selectedClass}
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                    label="Class"
                                >
                                    <MenuItem value="">All Classes</MenuItem>
                                    <MenuItem value="1">Class 1</MenuItem>
                                    <MenuItem value="2">Class 2</MenuItem>
                                    <MenuItem value="3">Class 3</MenuItem>
                                    <MenuItem value="4">Class 4</MenuItem>
                                    <MenuItem value="5">Class 5</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Subject</InputLabel>
                                <Select
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    label="Subject"
                                >
                                    <MenuItem value="">All Subjects</MenuItem>
                                    <MenuItem value="math">Mathematics</MenuItem>
                                    <MenuItem value="english">English</MenuItem>
                                    <MenuItem value="science">Science</MenuItem>
                                    <MenuItem value="history">History</MenuItem>
                                    <MenuItem value="physics">Physics</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Date Range"
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </FiltersCard>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {summaryStats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <SummaryCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: stat.color }}>
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: 'gray' }}>{stat.title}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                            {stat.trend.startsWith('+') ? (
                                                <TrendingUpIcon sx={{ color: '#4caf50', fontSize: 16, mr: 0.5 }} />
                                            ) : (
                                                <TrendingDownIcon sx={{ color: '#f44336', fontSize: 16, mr: 0.5 }} />
                                            )}
                                            <Typography variant="body2" sx={{ color: stat.trend.startsWith('+') ? '#4caf50' : '#f44336' }}>
                                                {stat.trend}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Avatar sx={{ backgroundColor: stat.color, width: 60, height: 60 }}>
                                        {stat.icon}
                                    </Avatar>
                                </Box>
                            </CardContent>
                        </SummaryCard>
                    </Grid>
                ))}
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {/* Attendance by Class */}
                <Grid item xs={12} md={6}>
                    <ChartCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Attendance by Class</Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={attendanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="present" fill="#4caf50" name="Present %" />
                                    <Bar dataKey="absent" fill="#f44336" name="Absent %" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </ChartCard>
                </Grid>

                {/* Grade Distribution */}
                <Grid item xs={12} md={6}>
                    <ChartCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Grade Distribution</Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={gradeDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {gradeDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </ChartCard>
                </Grid>

                {/* Monthly Trends */}
                <Grid item xs={12}>
                    <ChartCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Monthly Performance Trends</Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={monthlyTrends}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="attendance" stackId="1" stroke="#1976d2" fill="#1976d2" fillOpacity={0.6} name="Attendance %" />
                                    <Area type="monotone" dataKey="performance" stackId="2" stroke="#4caf50" fill="#4caf50" fillOpacity={0.6} name="Performance %" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </ChartCard>
                </Grid>
            </Grid>

            {/* Data Tables */}
            <Grid container spacing={3}>
                {/* Top Performers */}
                <Grid item xs={12} md={6}>
                    <DataTableCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Top Performers</Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Student</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Class</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Grade</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Attendance</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {topPerformers.map((performer, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{performer.name}</TableCell>
                                                <TableCell>{performer.class}</TableCell>
                                                <TableCell>
                                                    <Chip label={performer.grade} color="primary" size="small" />
                                                </TableCell>
                                                <TableCell>{performer.attendance}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </DataTableCard>
                </Grid>

                {/* Subject Performance */}
                <Grid item xs={12} md={6}>
                    <DataTableCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Subject Performance</Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Average</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Grade</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Students</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {examResultsData.map((subject, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{subject.subject}</TableCell>
                                                <TableCell>{subject.average}%</TableCell>
                                                <TableCell>
                                                    <Chip label={subject.grade} color="secondary" size="small" />
                                                </TableCell>
                                                <TableCell>{subject.students}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </DataTableCard>
                </Grid>

                {/* Recent Activities */}
                <Grid item xs={12}>
                    <DataTableCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Recent Activities</Typography>
                            <List>
                                {recentActivities.map((activity, index) => (
                                    <ListItem key={index} sx={{ px: 0 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ backgroundColor: getActivityColor(activity.type) }}>
                                                {getActivityIcon(activity.type)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={activity.action}
                                            secondary={`${activity.student} • ${activity.time}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </DataTableCard>
                </Grid>
            </Grid>
        </ReportsContainer>
    );
};

// Helper functions for activity colors and icons
const getActivityColor = (type) => {
    const colors = {
        enrollment: '#4caf50',
        exam: '#2196f3',
        attendance: '#ff9800',
        grade: '#9c27b0',
        meeting: '#f44336'
    };
    return colors[type] || '#757575';
};

const getActivityIcon = (type) => {
    const icons = {
        enrollment: <PersonIcon />,
        exam: <AssessmentIcon />,
        attendance: <SchoolIcon />,
        grade: <TrendingUpIcon />,
        meeting: <SchoolIcon />
    };
    return icons[type] || <PersonIcon />;
};

const ReportsContainer = styled(Container)`
    padding: 24px;
    background-color: #f8f9fa;
    min-height: 100vh;
`;

const ReportsHeader = styled(Box)`
    margin-bottom: 24px;
`;

const FiltersCard = styled(Card)`
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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

const ChartCard = styled(Card)`
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    height: 100%;
`;

const DataTableCard = styled(Card)`
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    height: 100%;
`;

export default StudentReports;
