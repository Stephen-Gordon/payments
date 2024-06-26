'use client';
import SheetLayout from '@/app/components/Layouts/SheetLayout';
import { Metadata } from 'next';
import * as React from 'react';
import AuthPage from '../components/AuthPage/AuthPage';
import { VaulDrawer } from '../components/ui/VaulDrawer';
import { AnimatePresence, motion } from 'framer-motion';

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthPage>
        <VaulDrawer>
          <AnimatePresence mode='wait'>
            <motion.div
              className=''
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </VaulDrawer>
      </AuthPage>
    </>
  );
}
 