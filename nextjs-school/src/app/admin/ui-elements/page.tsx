'use client';

import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
  Avatar,
  Badge,
  LinearProgress,
  CircularProgress,
  Alert,
  TextField,
  Switch,
  Slider,
  Rating,
} from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

const UIElementsPage = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        UI Elements
      </Typography>

      <Grid container spacing={3}>
        {/* Buttons */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Buttons
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" color="primary">Primary</Button>
              <Button variant="contained" color="secondary">Secondary</Button>
              <Button variant="contained" color="success">Success</Button>
              <Button variant="contained" color="warning">Warning</Button>
              <Button variant="contained" color="error">Error</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
            </Box>
          </Paper>
        </Grid>

        {/* Chips */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Chips
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="Default" />
              <Chip label="Primary" color="primary" />
              <Chip label="Success" color="success" />
              <Chip label="Warning" color="warning" />
              <Chip label="Error" color="error" />
              <Chip label="Deletable" onDelete={() => {}} />
              <Chip avatar={<Avatar>M</Avatar>} label="With Avatar" />
            </Box>
          </Paper>
        </Grid>

        {/* Alerts */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Alerts
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Alert severity="success">This is a success alert!</Alert>
              <Alert severity="info">This is an info alert!</Alert>
              <Alert severity="warning">This is a warning alert!</Alert>
              <Alert severity="error">This is an error alert!</Alert>
            </Box>
          </Paper>
        </Grid>

        {/* Progress */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Progress Indicators
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Linear Progress</Typography>
              <LinearProgress variant="determinate" value={70} />
            </Box>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress variant="determinate" value={25} color="primary" />
                <Typography variant="caption" display="block">25%</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress variant="determinate" value={50} color="secondary" />
                <Typography variant="caption" display="block">50%</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress variant="determinate" value={75} color="success" />
                <Typography variant="caption" display="block">75%</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Form Elements */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Form Elements
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Text Field" variant="outlined" size="small" />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography>Switch</Typography>
                <Switch defaultChecked />
              </Box>
              <Box>
                <Typography gutterBottom>Slider</Typography>
                <Slider defaultValue={30} />
              </Box>
              <Box>
                <Typography gutterBottom>Rating</Typography>
                <Rating defaultValue={3} />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Badges */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Badges & Avatars
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <Badge badgeContent={4} color="primary">
                <Avatar>A</Avatar>
              </Badge>
              <Badge badgeContent={10} color="secondary">
                <Avatar sx={{ bgcolor: '#7f56da' }}>B</Avatar>
              </Badge>
              <Badge badgeContent={99} color="error">
                <Avatar sx={{ bgcolor: '#4caf50' }}>C</Avatar>
              </Badge>
              <Badge variant="dot" color="success">
                <Avatar sx={{ bgcolor: '#ff9800' }}>D</Avatar>
              </Badge>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UIElementsPage;

