'use client';
import SheetLayout from '@/app/components/Layouts/SheetLayout';
import { Metadata } from 'next';
import * as React from 'react';
import AuthPage from '../components/AuthPage/AuthPage';

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthPage>
        <SheetLayout>{children}</SheetLayout>
      </AuthPage>
    </>
  );
}
