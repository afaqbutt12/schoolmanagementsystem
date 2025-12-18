'use client';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const RedButton = styled(Button)({
  backgroundColor: '#f00',
  color: 'white',
  marginLeft: '4px',
  '&:hover': {
    backgroundColor: '#eb7979',
    borderColor: '#f26767',
    boxShadow: 'none',
  },
});

export const BlackButton = styled(Button)({
  backgroundColor: '#000000',
  color: 'white',
  marginLeft: '4px',
  '&:hover': {
    backgroundColor: '#212020',
    borderColor: '#212020',
    boxShadow: 'none',
  },
});

export const DarkRedButton = styled(Button)({
  backgroundColor: '#650909',
  color: 'white',
  '&:hover': {
    backgroundColor: '#eb7979',
    borderColor: '#f26767',
    boxShadow: 'none',
  },
});

export const BlueButton = styled(Button)({
  backgroundColor: '#080a43',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#0a1e82',
  },
});

export const PurpleButton = styled(Button)({
  backgroundColor: '#270843',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#3f1068',
  },
});

export const LightPurpleButton = styled(Button)({
  backgroundColor: '#7f56da',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#7a1ccb',
  },
});

export const GreenButton = styled(Button)({
  backgroundColor: '#133104',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#266810',
  },
});

export const BrownButton = styled(Button)({
  backgroundColor: '#2c1006',
  color: 'white',
  '&:hover': {
    backgroundColor: '#40220c',
    borderColor: '#40220c',
    boxShadow: 'none',
  },
});

export const IndigoButton = styled(Button)({
  backgroundColor: '#2f2b80',
  color: 'white',
  '&:hover': {
    backgroundColor: '#534ea6',
    borderColor: '#473d90',
    boxShadow: 'none',
  },
});

