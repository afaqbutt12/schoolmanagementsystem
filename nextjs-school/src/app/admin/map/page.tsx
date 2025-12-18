'use client';

import {
  Container,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const MapPage = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Map
      </Typography>

      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* Placeholder map */}
        <Box 
          sx={{ 
            height: 500, 
            backgroundColor: '#e8e8e8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {/* Simple placeholder map design */}
          <Box 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 50%, #80deea 100%)',
              opacity: 0.5
            }} 
          />
          <Box sx={{ position: 'relative', textAlign: 'center' }}>
            <LocationOnIcon sx={{ fontSize: 80, color: '#f44336', mb: 2 }} />
            <Typography variant="h6" color="textSecondary">
              School Location
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Interactive map will be displayed here
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            School Address
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <MapIcon sx={{ color: '#7f56da' }} />
            <Box>
              <Typography variant="body1">
                123 Education Street
              </Typography>
              <Typography variant="body2" color="textSecondary">
                City, State 12345
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Country
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default MapPage;

