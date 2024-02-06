'use client';
import Sheet from '@/app/components/Layouts/Sheet';
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
      <Sheet isOpen={isOpen}>{children}</Sheet>
    </>
  );
}
