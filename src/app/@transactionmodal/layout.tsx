'use client';
import SheetLayout from '@/app/components/Layouts/SheetLayout';
import { Metadata } from 'next';
import * as React from 'react';

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('Sheet', 'Sheet');
  let isOpen = true;
  return (
    <>
      <SheetLayout isOpen={isOpen}>{children}</SheetLayout>
    </>
  );
}
