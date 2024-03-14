'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

import { RotatingLines } from 'react-loader-spinner';
import { Drawer, DrawerContent } from '../ui/drawer';

export default function Success({
  transactionStatus,
  loading,
}: {
  transactionStatus: boolean;
  loading: boolean;
}) {
  return (
    <Drawer>
      <DrawerContent></DrawerContent>
    </Drawer>
  );
}
