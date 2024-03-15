'use client';
import SheetLayout from '@/app/components/Layouts/SheetLayout';
import { Metadata } from 'next';
import * as React from 'react';
import TransitionLayout from '../components/Layouts/TransitionLayout';

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SheetLayout>
        <TransitionLayout>{children}</TransitionLayout>
      </SheetLayout>
    </>
  );
}
