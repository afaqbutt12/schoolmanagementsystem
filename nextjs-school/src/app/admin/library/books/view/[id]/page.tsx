'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Chip,
  CircularProgress,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LanguageIcon from '@mui/icons-material/Language';
import CategoryIcon from '@mui/icons-material/Category';
import ClassIcon from '@mui/icons-material/Class';

const ViewBookPage = () => {
  const router = useRouter();
  const params = useParams();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/book/${params.id}`);
        const data = await res.json();
        if (res.ok) {
          setBook(data);
        }
      } catch (error) {
        console.error('Failed to fetch book:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBook();
    }
  }, [params.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'success';
      case 'Borrowed': return 'warning';
      case 'Lost': return 'error';
      case 'Damaged': return 'error';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!book) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>Book not found</Typography>
        <Button onClick={() => router.back()} sx={{ mt: 2 }}>Go Back</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Book Details
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={() => window.print()}
          >
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => router.push(`/admin/library/books/edit/${params.id}`)}
            sx={{ backgroundColor: '#7f56da' }}
          >
            Edit
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Book Info Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
            <Box
              sx={{
                width: 150,
                height: 200,
                bgcolor: '#e3f2fd',
                borderRadius: 2,
                mx: 'auto',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MenuBookIcon sx={{ fontSize: 80, color: '#1976d2' }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              {book.bookName}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
              by {book.writer}
            </Typography>
            <Chip 
              label={book.status} 
              color={getStatusColor(book.status) as any}
              size="medium"
            />
            {book.idNo && (
              <Box sx={{ mt: 2 }}>
                <Chip label={`ID: ${book.idNo}`} variant="outlined" size="small" />
              </Box>
            )}
          </Paper>

          {/* Quick Info */}
          <Paper sx={{ p: 3, borderRadius: 2, mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Info
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <CategoryIcon color="action" fontSize="small" />
              <Typography variant="body2">Subject: {book.subject}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <ClassIcon color="action" fontSize="small" />
              <Typography variant="body2">Class: {book.class}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <LanguageIcon color="action" fontSize="small" />
              <Typography variant="body2">Language: {book.language || 'English'}</Typography>
            </Box>
            {book.pages && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MenuBookIcon color="action" fontSize="small" />
                <Typography variant="body2">Pages: {book.pages}</Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Details Card */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Book Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <PersonIcon color="action" />
                  <Box>
                    <Typography variant="body2" color="textSecondary">Author</Typography>
                    <Typography>{book.writer}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <MenuBookIcon color="action" />
                  <Box>
                    <Typography variant="body2" color="textSecondary">Publisher</Typography>
                    <Typography>{book.publisher || 'N/A'}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CalendarTodayIcon color="action" />
                  <Box>
                    <Typography variant="body2" color="textSecondary">Published Date</Typography>
                    <Typography>{book.published ? new Date(book.published).toLocaleDateString() : 'N/A'}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CalendarTodayIcon color="action" />
                  <Box>
                    <Typography variant="body2" color="textSecondary">Upload Date</Typography>
                    <Typography>{book.uploadDate ? new Date(book.uploadDate).toLocaleDateString() : 'N/A'}</Typography>
                  </Box>
                </Box>
              </Grid>
              {book.isbn && (
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" color="textSecondary">ISBN</Typography>
                    <Typography>{book.isbn}</Typography>
                  </Box>
                </Grid>
              )}
            </Grid>

            {book.description && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Description
                </Typography>
                <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography>{book.description}</Typography>
                </Box>
              </>
            )}

            {/* Borrowing Info */}
            {book.status === 'Borrowed' && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Borrowing Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
                      <Typography variant="body2" color="textSecondary">Borrower</Typography>
                      <Typography>{book.borrower?.name || 'N/A'}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
                      <Typography variant="body2" color="textSecondary">Borrow Date</Typography>
                      <Typography>{book.borrowDate ? new Date(book.borrowDate).toLocaleDateString() : 'N/A'}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
                      <Typography variant="body2" color="textSecondary">Return Date</Typography>
                      <Typography>{book.returnDate ? new Date(book.returnDate).toLocaleDateString() : 'N/A'}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewBookPage;

