'use client';
import SheetLayout from '@/app/components/Layouts/SheetLayout';
import { Metadata } from 'next';
import * as React from 'react';
import AuthPage from '../components/AuthPage/AuthPage';
import { VaulDrawer } from '../components/ui/VaulDrawer';
import { motion } from 'framer-motion';

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthPage>
        <VaulDrawer>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='overflow-y-scroll'
          >
            {children}
          </motion.div>
        </VaulDrawer>
      </AuthPage>
    </>
  );
}
 