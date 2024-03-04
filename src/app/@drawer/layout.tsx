'use client';
import SheetLayout from '@/app/components/Layouts/SheetLayout';
import { Metadata } from 'next';
import * as React from 'react';

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
