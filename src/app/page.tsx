'use client';
import React, { useState, useEffect, use } from 'react';
import AddToHomeScreen from '@/app/components/AddToHomeScreen/AddToHomeScreen';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import useUserAgent from '@/app/hooks/useUserAgent';

// next
import { useRouter } from 'next/navigation';

// privy 
import { usePrivySmartAccount } from '@zerodev/privy';
import Link from 'next/link';
export default function HomePage() {
  const router = useRouter();


  const { zeroDevReady, authenticated } = usePrivySmartAccount();
  
  const { isMobile, userAgentString, userAgent, isStandalone } =
      useUserAgent();

 
    useEffect(() => {
      if (zeroDevReady && authenticated) router.push('/home');
    }, [zeroDevReady, authenticated, router]);

    useEffect(() => {
      if (isStandalone) {
        router.push('/login');
      }
    }, [isStandalone])
 
  const [welcomeMessage, setWelcomeMessage] =
    useState<string>('Checking device...');

  useEffect(() => {
    const welcomeMessage = isMobile
      ? ''
      : 'You are on a desktop device. Please use a mobile device to view this app.';
    setWelcomeMessage(welcomeMessage);
  }, [isMobile]);

  return (
    <div className='flex min-h-screen flex-col items-center gap-10 px-4 py-20'>
      <p className=''>{welcomeMessage}</p>
      <AddToHomeScreen />

      <Link href='/home'>Home</Link>
      <Link href='/home'>login</Link>
    </div>
  );
}
