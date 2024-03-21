'use client';
import { setAddress } from '@/GlobalRedux/Features/address/addressSlice';
import { useLogin, usePrivy } from '@privy-io/react-auth';
import { usePrivySmartAccount } from '@zerodev/privy';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { isAndroid } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { Button } from '../components/ui/button';

import { motion } from 'framer-motion';
import { BackgroundGradientAnimation } from '../components/ui/background-gradient-animation';

const Page = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [installationPrompt, setInstallationPrompt] = useState<any>();
  const router = useRouter();
  const { ready, authenticated, login, zeroDevReady, user } =
    usePrivySmartAccount();

  // redux
  const dispatch = useDispatch();

  useEffect(() => {
    // Helps you prompt your users to install your PWA
    // See https://web.dev/learn/pwa/installation-prompt/
    // iOS Safari does not have this event, so you will have
    // to prompt users to add the PWA via your own UI (e.g. a
    // pop-up modal)
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setIsInstalled(false);
      setInstallationPrompt(e);
    });
  }, []);

  useEffect(() => {
    // Detect if the PWA is installed
    // https://web.dev/learn/pwa/detection/#detecting-the-transfer
    window.addEventListener('DOMContentLoaded', () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      }
    });
  });
  useEffect(() => {
    if (zeroDevReady && authenticated && user.wallet.address) {
      // set user address
      dispatch(setAddress(user?.wallet?.address));
      
      // route home
      router.push('/home');
    }
  }, [authenticated, zeroDevReady, user]);


  return (
    <>
      <main className='relative'>
        <div className='absolute -z-50 '> 
          <BackgroundGradientAnimation/>
        </div>
        <div className='grid p-4 justify-center mt-[30vh]'>

                <div className=' space-y-2 text-center'>
                  <motion.h1 key="create-an-account" initial={{opacity: 0}} animate={{ opacity: 1}} exit={{opacity:0 }} className='text-2xl font-semibold tracking-tight'>
                    Log in or Sign up
                  </motion.h1>
                {/*   <motion.p  initial={{opacity: 0}} animate={{ opacity: 1}} exit={{opacity:0 }} className='text-muted-foreground text-sm'>
                    Enter your email below to create your account
                  </motion.p> */}
                </div>
                <Button className='mt-4' disabled={!ready || authenticated} onClick={login}>
                  Login
                </Button>

          
        </div>
      </main>
    </>
  );
};

export default Page;
