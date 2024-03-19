'use client';
import React, { useState, useEffect } from 'react';
import AddToHomeScreen from '@/app/components/AddToHomeScreen/AddToHomeScreen';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import useUserAgent from '@/app/hooks/useUserAgent';

export default function HomePage() {
  const [welcomeMessage, setWelcomeMessage] =
    useState<string>('Checking device...');
  const { isMobile, userAgentString, userAgent } = useUserAgent();

  useEffect(() => {
    const welcomeMessage = isMobile
      ? 'You are on a mobile device.'
      : 'You are on a desktop device. Please use a mobile device to view this app.';
    setWelcomeMessage(welcomeMessage);
  }, [isMobile]);

  return (
    <main className='flex min-h-screen flex-col items-center gap-10 px-4 py-20'>
      <motion.h1
        className='text-center text-4xl font-bold'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Welcome to Payments
      </motion.h1>
      <motion.p
        className='text-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {welcomeMessage}
      </motion.p>
      {userAgentString && (
        <p className='text-center text-xs text-gray-400'>{userAgentString}</p>
      )}
      <AddToHomeScreen />
      
    </main>
  );
}
