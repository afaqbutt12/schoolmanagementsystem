'use client';

import { Snackbar, Alert } from '@mui/material';

interface PopupProps {
  message: string;
  setShowPopup: (show: boolean) => void;
  showPopup: boolean;
}

const Popup = ({ message, setShowPopup, showPopup }: PopupProps) => {
  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <Snackbar
      open={showPopup}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Popup;

