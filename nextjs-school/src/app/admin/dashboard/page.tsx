'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Grid, Paper, Typography, Box, CircularProgress, Button, ButtonGroup, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import CountUp from 'react-countup';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { getAllStudents } from '@/redux/studentRelated/studentHandle';
import { getAllTeachers } from '@/redux/teacherRelated/teacherHandle';
import { getAllParents } from '@/redux/parentRelated/parentHandle';
import { getAllFees } from '@/redux/feesRelated/feesHandle';
import { getAllExpenses } from '@/redux/expenseRelated/expenseHandle';
import { getAllNotices } from '@/redux/noticeRelated/noticeHandle';

const AdminHomePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser, currentRole } = useAppSelector((state) => state.user);
  const { studentsList } = useAppSelector((state) => state.student);
  const { teachersList } = useAppSelector((state) => state.teacher);
  const { parentsList } = useAppSelector((state) => state.parent);
  const { feesList } = useAppSelector((state) => state.fees);
  const { noticesList } = useAppSelector((state) => state.notice);

  const [calendarView, setCalendarView] = useState('Month');

  useEffect(() => {
    if (!currentUser || currentRole !== 'Admin') {
      router.push('/admin/login');
      return;
    }
    
    const adminID = currentUser._id;
    dispatch(getAllStudents(adminID));
    dispatch(getAllTeachers(adminID));
    dispatch(getAllParents(adminID));
    dispatch(getAllFees(adminID));
    dispatch(getAllExpenses(adminID));
    dispatch(getAllNotices(adminID));
  }, [dispatch, currentUser, currentRole, router]);

  if (!currentUser) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const numberOfStudents = Array.isArray(studentsList) ? studentsList.length : 0;
  const numberOfTeachers = Array.isArray(teachersList) ? teachersList.length : 0;
  const numberOfParents = Array.isArray(parentsList) ? parentsList.length : 0;
  const totalEarnings = Array.isArray(feesList) ? feesList.reduce((acc: number, fee: any) => acc + (fee.amount || 0), 0) : 0;

  // Earnings chart data
  const earningsData = [
    { day: 'Mon', totalCollections: 20000, feesCollection: 5000 },
    { day: 'Tue', totalCollections: 35000, feesCollection: 8000 },
    { day: 'Wed', totalCollections: 45000, feesCollection: 10000 },
    { day: 'Thu', totalCollections: 55000, feesCollection: 11000 },
    { day: 'Fri', totalCollections: 65000, feesCollection: 12000 },
    { day: 'Sat', totalCollections: 72000, feesCollection: 14000 },
    { day: 'Sun', totalCollections: 75000, feesCollection: 15000 },
  ];

  // Expenses chart data
  const expensesData = [
    { month: 'Jan 2019', amount: 8000 },
    { month: 'Feb 2019', amount: 10000 },
    { month: 'Mar 2019', amount: 8500 },
  ];

  // Students pie chart data
  const studentsData = [
    { name: 'Female Students', value: 45000, color: '#4facfe' },
    { name: 'Male Students', value: 105000, color: '#fa709a' },
  ];

  // Website traffic data
  const trafficData = [
    { label: 'Direct', value: 12890, color: '#4caf50' },
    { label: 'Search', value: 7245, color: '#2196f3' },
    { label: 'Referrals', value: 4256, color: '#ff9800' },
    { label: 'Social', value: 500, color: '#f44336' },
  ];

  const currentDate = new Date();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', pb: 4 }}>
      <Container maxWidth="xl" sx={{ pt: 3 }}>
        {/* Stats Cards Row */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Students Card */}
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#4a90d9', mb: 0.5 }}>
                    <CountUp start={0} end={numberOfStudents} duration={2} separator="," />
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666' }}>
                    Students
                  </Typography>
                </Box>
                <IconWrapper sx={{ bgcolor: '#e3f2fd' }}>
                  <PeopleIcon sx={{ fontSize: 32, color: '#4a90d9' }} />
                </IconWrapper>
              </Box>
            </StatsCard>
          </Grid>

          {/* Teachers Card */}
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#26a69a', mb: 0.5 }}>
                    <CountUp start={0} end={numberOfTeachers} duration={2} separator="," />
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666' }}>
                    Teachers
                  </Typography>
                </Box>
                <IconWrapper sx={{ bgcolor: '#e0f2f1' }}>
                  <SchoolIcon sx={{ fontSize: 32, color: '#26a69a' }} />
                </IconWrapper>
              </Box>
            </StatsCard>
          </Grid>

          {/* Parents Card */}
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#ef9a9a', mb: 0.5 }}>
                    <CountUp start={0} end={numberOfParents} duration={2} separator="," />
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666' }}>
                    Parents
                  </Typography>
                </Box>
                <IconWrapper sx={{ bgcolor: '#ffebee' }}>
                  <GroupIcon sx={{ fontSize: 32, color: '#ef9a9a' }} />
                </IconWrapper>
              </Box>
            </StatsCard>
          </Grid>

          {/* Earnings Card */}
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#f06292', mb: 0.5 }}>
                    $<CountUp start={0} end={totalEarnings} duration={2} separator="," />
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666' }}>
                    Earnings
                  </Typography>
                </Box>
                <IconWrapper sx={{ bgcolor: '#fce4ec' }}>
                  <AttachMoneyIcon sx={{ fontSize: 32, color: '#f06292' }} />
                </IconWrapper>
              </Box>
            </StatsCard>
          </Grid>
        </Grid>

        {/* Charts Row */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Earnings Chart */}
          <Grid item xs={12} lg={5}>
            <ChartCard>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Earnings
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#4a90d9' }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Total Collections</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>$75,000</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#f06292' }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Fees Collection</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>$15,000</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={earningsData}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4a90d9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4a90d9" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorFees" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f06292" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f06292" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="totalCollections" stroke="#4a90d9" fillOpacity={1} fill="url(#colorTotal)" />
                    <Area type="monotone" dataKey="feesCollection" stroke="#f06292" fillOpacity={1} fill="url(#colorFees)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <Typography variant="caption" color="textSecondary">Jan 20, 2019</Typography>
                <Typography variant="caption" color="primary" sx={{ cursor: 'pointer' }}>↗</Typography>
              </Box>
            </ChartCard>
          </Grid>

          {/* Expenses Chart */}
          <Grid item xs={12} lg={3.5}>
            <ChartCard>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Expenses
              </Typography>
              <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={expensesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#26a69a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </ChartCard>
          </Grid>

          {/* Students Pie Chart */}
          <Grid item xs={12} lg={3.5}>
            <ChartCard>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Students
              </Typography>
              <Box sx={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={studentsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={0}
                      dataKey="value"
                    >
                      {studentsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#4facfe' }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Female Students</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>45,000</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#fa709a' }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Male Students</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>1,05,000</Typography>
                  </Box>
                </Box>
              </Box>
            </ChartCard>
          </Grid>
        </Grid>

        {/* Bottom Section Row 1: Calendar & Traffic */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Event Calendar */}
          <Grid item xs={12} md={6}>
            <ChartCard>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontStyle: 'italic', mb: 2 }}>
                Event Calendar
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <CalendarTodayIcon sx={{ fontSize: 20, color: '#999' }} />
                  <CalendarTodayIcon sx={{ fontSize: 20, color: '#999' }} />
                </Box>
              </Box>
              <ButtonGroup size="small" sx={{ mb: 2 }}>
                {['Day', 'Week', 'Month'].map((view) => (
                  <Button
                    key={view}
                    variant={calendarView === view ? 'contained' : 'outlined'}
                    onClick={() => setCalendarView(view)}
                    sx={{
                      bgcolor: calendarView === view ? '#2196f3' : 'transparent',
                      color: calendarView === view ? 'white' : '#666',
                      borderColor: '#e0e0e0',
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: calendarView === view ? '#1976d2' : '#f5f5f5',
                      },
                    }}
                  >
                    {view}
                  </Button>
                ))}
              </ButtonGroup>
              <Typography variant="h2" sx={{ fontWeight: 300, color: '#333', textAlign: 'center', py: 3 }}>
                {currentDate.getDate()}
              </Typography>
            </ChartCard>
          </Grid>

          {/* Website Traffic */}
          <Grid item xs={12} md={6}>
            <ChartCard>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Website Traffic
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                2,590
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Unique Visitors
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {trafficData.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.color }} />
                      <Typography variant="body2">{item.label}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.value.toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </ChartCard>
          </Grid>

        </Grid>

        {/* Bottom Section Row 2: Notice Board & Social */}
        <Grid container spacing={3}>
          {/* Notice Board */}
          <Grid item xs={12} md={6}>
            <ChartCard>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Notice Board
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {Array.isArray(noticesList) && noticesList.length > 0 ? (
                  noticesList.slice(0, 3).map((notice: any, index: number) => (
                    <Box key={notice._id || index} sx={{ display: 'flex', gap: 2 }}>
                      <Box 
                        sx={{ 
                          bgcolor: '#4caf50', 
                          color: 'white', 
                          px: 1, 
                          py: 0.5, 
                          borderRadius: 1, 
                          fontSize: 11,
                          whiteSpace: 'nowrap',
                          height: 'fit-content'
                        }}
                      >
                        {new Date(notice.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                          {notice.title?.substring(0, 30)}...
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Admin / 5 min ago
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ bgcolor: '#4caf50', color: 'white', px: 1, py: 0.5, borderRadius: 1, fontSize: 11, whiteSpace: 'nowrap', height: 'fit-content' }}>
                        16 June, 2019
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                          Great School management...
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Jennyfar Lopez / 5 min ago
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>School</Typography>
                  </Box>
                )}
              </Box>
            </ChartCard>
          </Grid>

          {/* Social Media Stats */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {/* Facebook */}
              <Grid item xs={6}>
                <SocialCard sx={{ bgcolor: '#3b5998' }}>
                  <FacebookIcon sx={{ fontSize: 32, color: 'white', mb: 1 }} />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Like us on
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    facebook
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mt: 1 }}>
                    30,000
                  </Typography>
                </SocialCard>
              </Grid>
              {/* Twitter */}
              <Grid item xs={6}>
                <SocialCard sx={{ bgcolor: '#00bcd4' }}>
                  <TwitterIcon sx={{ fontSize: 32, color: 'white', mb: 1 }} />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Follow us on
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    twitter
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mt: 1 }}>
                    1,11,000
                  </Typography>
                </SocialCard>
              </Grid>
              {/* Google+ */}
              <Grid item xs={6}>
                <SocialCard sx={{ bgcolor: '#f44336' }}>
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>G</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Follow us on
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    googleplus
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mt: 1 }}>
                    19,000
                  </Typography>
                </SocialCard>
              </Grid>
              {/* LinkedIn */}
              <Grid item xs={6}>
                <SocialCard sx={{ bgcolor: '#2196f3' }}>
                  <LinkedInIcon sx={{ fontSize: 32, color: 'white', mb: 1 }} />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Follow us on
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    linked
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mt: 1 }}>
                    45,000
                  </Typography>
                </SocialCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 3, 
          mt: 4, 
          borderTop: '1px solid #e0e0e0',
          bgcolor: 'white'
        }}
      >
        <Typography variant="body2" color="textSecondary">
          © Copyrights akkhor 2019. All rights reserved. Designed by PsdBosS
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminHomePage;

const StatsCard = styled(Paper)({
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  border: '1px solid #f0f0f0',
});

const IconWrapper = styled(Box)({
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ChartCard = styled(Paper)({
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  border: '1px solid #f0f0f0',
  height: '100%',
});

const SocialCard = styled(Box)({
  padding: '16px',
  borderRadius: '8px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
