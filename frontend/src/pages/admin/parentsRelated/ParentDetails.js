import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Avatar,
    IconButton,
    Breadcrumbs,
    Link,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ParentDetails = () => {
    // Sample parent data
    const parentData = {
        name: 'Steven Jones',
        gender: 'Male',
        occupation: 'Business',
        id: '#15059',
        address: 'House #10, Road #6, Australia',
        religion: 'Islam',
        phone: '+ 88 98568888418',
        email: 'jessiarose@gmail.com',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    };

    const getAvatarColor = (name) => {
        const colors = ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0', '#F44336'];
        const index = name.length % colors.length;
        return colors[index];
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Breadcrumbs */}
            <Breadcrumbs sx={{ mb: 2 }}>
                <Link 
                    underline="hover" 
                    color="inherit" 
                    href="#" 
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Home
                </Link>
                <Typography color="text.primary">Parents Details</Typography>
            </Breadcrumbs>

            {/* Title */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                About Me
            </Typography>

            {/* Profile Card */}
            <Paper sx={{ p: 4, boxShadow: '0px 4px 8px rgba(0,0,0,0.1)', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
                    {/* Profile Picture */}
                    <Box sx={{ flexShrink: 0 }}>
                        <Avatar
                            sx={{
                                width: 120,
                                height: 120,
                                backgroundColor: getAvatarColor(parentData.name),
                                fontSize: '48px',
                                fontWeight: 'bold'
                            }}
                        >
                            {parentData.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                    </Box>

                    {/* Profile Information */}
                    <Box sx={{ flex: 1 }}>
                        {/* Header with Name and Action Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                                {parentData.name}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton size="small" sx={{ color: '#666' }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton size="small" sx={{ color: '#666' }}>
                                    <PrintIcon />
                                </IconButton>
                                <IconButton size="small" sx={{ color: '#666' }}>
                                    <DownloadIcon />
                                </IconButton>
                                <IconButton size="small" sx={{ color: '#666' }}>
                                    <MoreVertIcon />
                                </IconButton>
                            </Box>
                        </Box>

                        {/* Description */}
                        <Typography variant="body1" sx={{ mb: 2, color: '#666', lineHeight: 1.6 }}>
                            {parentData.description}
                        </Typography>

                        {/* Detailed Information */}
                        <Paper sx={{ p: 3, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                                Personal Information
                            </Typography>
                            <List dense>
                                <ListItem sx={{ px: 0 }}>
                                    <ListItemText 
                                        primary="Name" 
                                        secondary={parentData.name}
                                        primaryTypographyProps={{ fontWeight: 'bold', color: '#333' }}
                                        secondaryTypographyProps={{ color: '#666' }}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem sx={{ px: 0 }}>
                                    <ListItemText 
                                        primary="Gender" 
                                        secondary={parentData.gender}
                                        primaryTypographyProps={{ fontWeight: 'bold', color: '#333' }}
                                        secondaryTypographyProps={{ color: '#666' }}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem sx={{ px: 0 }}>
                                    <ListItemText 
                                        primary="Occupation" 
                                        secondary={parentData.occupation}
                                        primaryTypographyProps={{ fontWeight: 'bold', color: '#333' }}
                                        secondaryTypographyProps={{ color: '#666' }}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem sx={{ px: 0 }}>
                                    <ListItemText 
                                        primary="ID" 
                                        secondary={parentData.id}
                                        primaryTypographyProps={{ fontWeight: 'bold', color: '#333' }}
                                        secondaryTypographyProps={{ color: '#666' }}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem sx={{ px: 0 }}>
                                    <ListItemText 
                                        primary="Address" 
                                        secondary={parentData.address}
                                        primaryTypographyProps={{ fontWeight: 'bold', color: '#333' }}
                                        secondaryTypographyProps={{ color: '#666' }}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem sx={{ px: 0 }}>
                                    <ListItemText 
                                        primary="Religion" 
                                        secondary={parentData.religion}
                                        primaryTypographyProps={{ fontWeight: 'bold', color: '#333' }}
                                        secondaryTypographyProps={{ color: '#666' }}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem sx={{ px: 0 }}>
                                    <ListItemText 
                                        primary="Phone" 
                                        secondary={parentData.phone}
                                        primaryTypographyProps={{ fontWeight: 'bold', color: '#333' }}
                                        secondaryTypographyProps={{ color: '#666' }}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem sx={{ px: 0 }}>
                                    <ListItemText 
                                        primary="E-mail" 
                                        secondary={parentData.email}
                                        primaryTypographyProps={{ fontWeight: 'bold', color: '#333' }}
                                        secondaryTypographyProps={{ color: '#666' }}
                                    />
                                </ListItem>
                            </List>
                        </Paper>
                    </Box>
                </Box>
            </Paper>

            {/* Footer */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    © Copyrights akkhor 2019. All rights reserved. Designed by PsdBosS
                </Typography>
            </Box>
        </Box>
    );
};

export default ParentDetails;
