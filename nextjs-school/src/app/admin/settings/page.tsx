'use client';

import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  TextField,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import PaletteIcon from '@mui/icons-material/Palette';
import LanguageIcon from '@mui/icons-material/Language';

const SettingsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Notifications Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ bgcolor: '#e3f2fd', p: 1, borderRadius: 2 }}>
                <NotificationsIcon sx={{ color: '#2196f3' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Notifications
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={<Switch defaultChecked color="primary" />}
                label="Email Notifications"
              />
              <FormControlLabel
                control={<Switch defaultChecked color="primary" />}
                label="Push Notifications"
              />
              <FormControlLabel
                control={<Switch color="primary" />}
                label="SMS Notifications"
              />
              <FormControlLabel
                control={<Switch defaultChecked color="primary" />}
                label="Weekly Reports"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ bgcolor: '#fce4ec', p: 1, borderRadius: 2 }}>
                <SecurityIcon sx={{ color: '#e91e63' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Security
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={<Switch defaultChecked color="primary" />}
                label="Two-Factor Authentication"
              />
              <FormControlLabel
                control={<Switch defaultChecked color="primary" />}
                label="Login Alerts"
              />
              <Divider sx={{ my: 1 }} />
              <Button variant="outlined" color="error">
                Change Password
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Appearance Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ bgcolor: '#f3e5f5', p: 1, borderRadius: 2 }}>
                <PaletteIcon sx={{ color: '#9c27b0' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Appearance
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Dark Mode"
              />
              <FormControlLabel
                control={<Switch defaultChecked color="primary" />}
                label="Compact Sidebar"
              />
              <FormControlLabel
                control={<Switch defaultChecked color="primary" />}
                label="Show Statistics"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Language Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ bgcolor: '#e8f5e9', p: 1, borderRadius: 2 }}>
                <LanguageIcon sx={{ color: '#4caf50' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Language & Region
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                select
                fullWidth
                label="Language"
                defaultValue="en"
                SelectProps={{ native: true }}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </TextField>
              <TextField
                select
                fullWidth
                label="Timezone"
                defaultValue="utc"
                SelectProps={{ native: true }}
              >
                <option value="utc">UTC</option>
                <option value="est">Eastern Time</option>
                <option value="pst">Pacific Time</option>
                <option value="gmt">GMT</option>
              </TextField>
            </Box>
          </Paper>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined">Reset to Defaults</Button>
            <Button variant="contained" sx={{ bgcolor: '#7f56da' }}>
              Save Settings
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SettingsPage;

