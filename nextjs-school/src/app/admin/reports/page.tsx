'use client';

import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import PaymentIcon from '@mui/icons-material/Payment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const ReportsPage = () => {
  const router = useRouter();

  const reports = [
    { icon: <PeopleIcon sx={{ fontSize: 40 }} />, title: 'Student Reports', color: '#7f56da', description: 'View student performance and analytics', path: '/admin/reports/students' },
    { icon: <SchoolIcon sx={{ fontSize: 40 }} />, title: 'Teacher Reports', color: '#4caf50', description: 'View teacher activity and performance', path: '/admin/reports/teachers' },
    { icon: <EventAvailableIcon sx={{ fontSize: 40 }} />, title: 'Attendance Reports', color: '#ff9800', description: 'View attendance statistics', path: '/admin/reports/attendance' },
    { icon: <PaymentIcon sx={{ fontSize: 40 }} />, title: 'Financial Reports', color: '#f44336', description: 'View fees and expense reports', path: '/admin/reports/financial' },
    { icon: <TrendingUpIcon sx={{ fontSize: 40 }} />, title: 'Performance Analytics', color: '#2196f3', description: 'View overall performance trends', path: '/admin/reports/performance' },
    { icon: <AssessmentIcon sx={{ fontSize: 40 }} />, title: 'Custom Reports', color: '#9c27b0', description: 'Generate custom reports', path: '/admin/reports/custom' },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Reports & Analytics
        </Typography>
        <Typography color="textSecondary">
          View and generate various reports for your school
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {reports.map((report, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                borderRadius: 2, 
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: `${report.color}15`,
                  borderRadius: 2,
                  p: 2,
                  mb: 2,
                  color: report.color
                }}>
                  {report.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center' }}>
                  {report.title}
                </Typography>
                <Typography color="textSecondary" sx={{ textAlign: 'center', mt: 1 }}>
                  {report.description}
                </Typography>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => router.push(report.path)}
                  >
                    View Report
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ReportsPage;
