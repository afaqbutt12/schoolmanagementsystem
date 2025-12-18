'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  CircularProgress,
  Divider,
  Chip,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import HistoryIcon from '@mui/icons-material/History';
import { useAppSelector } from '@/redux/hooks';

const CustomReportsPage = () => {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.user);
  
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const [reportConfig, setReportConfig] = useState({
    reportType: '',
    class: '',
    dateFrom: '',
    dateTo: '',
    includeAttendance: true,
    includeGrades: true,
    includeFinancial: false,
    includePerformance: true,
    format: 'pdf',
  });

  const reportTypes = [
    { value: 'student_progress', label: 'Student Progress Report' },
    { value: 'class_summary', label: 'Class Summary Report' },
    { value: 'attendance_detailed', label: 'Detailed Attendance Report' },
    { value: 'financial_summary', label: 'Financial Summary Report' },
    { value: 'teacher_evaluation', label: 'Teacher Evaluation Report' },
    { value: 'exam_analysis', label: 'Exam Analysis Report' },
  ];

  const savedReports = [
    { id: 1, name: 'Monthly Student Progress - March 2024', type: 'student_progress', date: '2024-03-15', status: 'Ready' },
    { id: 2, name: 'Class 10A Attendance Q1', type: 'attendance_detailed', date: '2024-03-10', status: 'Ready' },
    { id: 3, name: 'Financial Summary Feb 2024', type: 'financial_summary', date: '2024-03-01', status: 'Ready' },
    { id: 4, name: 'Midterm Exam Analysis', type: 'exam_analysis', date: '2024-02-25', status: 'Ready' },
  ];

  useEffect(() => {
    const fetchClasses = async () => {
      if (currentUser?._id) {
        try {
          const res = await fetch(`/api/sclass/school/${currentUser._id}`);
          if (res.ok) {
            const data = await res.json();
            setClasses(Array.isArray(data) ? data : []);
          }
        } catch (error) {
          console.error('Failed to fetch classes:', error);
        }
      }
      setLoading(false);
    };

    fetchClasses();
  }, [currentUser]);

  const handleConfigChange = (field: string, value: any) => {
    setReportConfig({ ...reportConfig, [field]: value });
  };

  const handleGenerateReport = async () => {
    setGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGenerating(false);
    setReportGenerated(true);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Custom Reports
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Report Configuration */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Report Configuration
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={reportConfig.reportType}
                    onChange={(e) => handleConfigChange('reportType', e.target.value)}
                    label="Report Type"
                  >
                    {reportTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Class</InputLabel>
                  <Select
                    value={reportConfig.class}
                    onChange={(e) => handleConfigChange('class', e.target.value)}
                    label="Class"
                  >
                    <MenuItem value="">All Classes</MenuItem>
                    {classes.map((cls: any) => (
                      <MenuItem key={cls._id} value={cls._id}>{cls.sclassName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date From"
                  type="date"
                  value={reportConfig.dateFrom}
                  onChange={(e) => handleConfigChange('dateFrom', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date To"
                  type="date"
                  value={reportConfig.dateTo}
                  onChange={(e) => handleConfigChange('dateTo', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, mt: 2 }}>
                  Include in Report
                </Typography>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reportConfig.includeAttendance}
                        onChange={(e) => handleConfigChange('includeAttendance', e.target.checked)}
                      />
                    }
                    label="Attendance Data"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reportConfig.includeGrades}
                        onChange={(e) => handleConfigChange('includeGrades', e.target.checked)}
                      />
                    }
                    label="Grade Data"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reportConfig.includeFinancial}
                        onChange={(e) => handleConfigChange('includeFinancial', e.target.checked)}
                      />
                    }
                    label="Financial Data"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reportConfig.includePerformance}
                        onChange={(e) => handleConfigChange('includePerformance', e.target.checked)}
                      />
                    }
                    label="Performance Metrics"
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Export Format</InputLabel>
                  <Select
                    value={reportConfig.format}
                    onChange={(e) => handleConfigChange('format', e.target.value)}
                    label="Export Format"
                  >
                    <MenuItem value="pdf">PDF Document</MenuItem>
                    <MenuItem value="excel">Excel Spreadsheet</MenuItem>
                    <MenuItem value="csv">CSV File</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                startIcon={generating ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
                onClick={handleGenerateReport}
                disabled={!reportConfig.reportType || generating}
                sx={{ backgroundColor: '#9c27b0' }}
              >
                {generating ? 'Generating...' : 'Generate Report'}
              </Button>
              <Button variant="outlined" startIcon={<SaveIcon />}>
                Save Configuration
              </Button>
            </Box>

            {reportGenerated && (
              <Alert severity="success" sx={{ mt: 3 }}>
                Report generated successfully! 
                <Button size="small" startIcon={<DownloadIcon />} sx={{ ml: 2 }}>
                  Download
                </Button>
              </Alert>
            )}
          </Paper>
        </Grid>

        {/* Saved Reports */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <HistoryIcon color="action" />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Recent Reports
              </Typography>
            </Box>

            {savedReports.map((report) => (
              <Card 
                key={report.id} 
                sx={{ 
                  mb: 2, 
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#f5f5f5' }
                }}
              >
                <CardContent sx={{ py: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    {report.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Chip label={report.type.replace('_', ' ')} size="small" variant="outlined" />
                    <Typography variant="caption" color="textSecondary" sx={{ alignSelf: 'center' }}>
                      {report.date}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Chip label={report.status} size="small" color="success" />
                    <Button size="small" startIcon={<DownloadIcon />}>
                      Download
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomReportsPage;

