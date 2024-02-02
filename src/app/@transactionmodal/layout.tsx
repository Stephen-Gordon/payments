'use client';
import Sheet from '@/app/components/Layouts/Sheet';
import { Metadata } from 'next';
import * as React from 'react';

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sheet>{children}</Sheet>
    </>
  );
}
