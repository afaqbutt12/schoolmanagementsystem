'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { initializeUser } from '@/redux/userRelated/userSlice';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  return <>{children}</>;
}

