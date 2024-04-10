'use client';
import React, { useState, useEffect, use } from 'react';
import AddToHomeScreen from '@/app/components/AddToHomeScreen/AddToHomeScreen';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import useUserAgent from '@/app/hooks/useUserAgent';

// next
import { useRouter } from 'next/navigation';

// privy 
import { usePrivySmartAccount } from '@zerodev/privy';
import { TextGenerateEffect } from './components/ui/text-generate-effect';


export default function HomePage() {
  const router = useRouter();

  // loader
  const [loading, setLoading] = useState(true);
  const [textLoading, setTextLoading] = useState(true);

  const { zeroDevReady, authenticated } = usePrivySmartAccount();

  const { isMobile, userAgentString, userAgent, isStandalone } = useUserAgent();
 useEffect(() => {
   setTimeout(() => {
     if (isStandalone && authenticated) {
       router.push('/home');
     }
  
   }, 3000);
 }, [isStandalone, authenticated]);

  useEffect(() => {
    
    setTimeout(() => {
    
      if (isStandalone && !authenticated) {
        router.push('/login');
      }
      
    }, 3000)
  }, [isStandalone, authenticated]);

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

      {/*  <Link href='/home'>Home</Link>
      <Link href='/home'>login</Link> */}
      

      <AnimatePresence>
        {textLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            key={'intro-loading'}
            className='flex h-full w-full flex-col items-center justify-center'
          >
            <motion.h1
              key={'intro-loading-h1'}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
              className='mt-20 scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl'
            >
              Welcome to Payments
            </motion.h1>
            <motion.h3
              key={'intro-loading-h3'}
              onAnimationComplete={() => {
                setTimeout(() => {
                  setTextLoading(false);
                }, 3000);
              }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.4 }}
              className='text-muted-foreground  mt-20  scroll-m-20 text-center text-2xl font-semibold tracking-tight'
            >
              By Stephen Gordon
            </motion.h3>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
