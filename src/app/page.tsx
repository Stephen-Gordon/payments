'use client';
import React, { useState, useEffect, use } from 'react';
import AddToHomeScreen from '@/app/components/AddToHomeScreen/AddToHomeScreen';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import useUserAgent from '@/app/hooks/useUserAgent';

// next
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

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
      <p className=''>{welcomeMessage}</p>
      <AddToHomeScreen />
    </main>
  );
}
