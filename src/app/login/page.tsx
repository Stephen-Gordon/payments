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

import { AnimatePresence, motion } from 'framer-motion';
import { BackgroundGradientAnimation } from '../components/ui/background-gradient-animation';
import Link from 'next/link';
import { TextGenerateEffect } from '../components/ui/text-generate-effect';

const Page = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [installationPrompt, setInstallationPrompt] = useState<any>();

  const [routeHome, setRouteHome] = useState(false);
  // router
  const router = useRouter();

  // privy
  const { ready, authenticated, login, zeroDevReady, user } =
    usePrivySmartAccount();

    

  // redux
  const dispatch = useDispatch();

 /*  useEffect(() => {
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setIsInstalled(false);
      setInstallationPrompt(e);
    });
  }, []); */

 /*  useEffect(() => {
   
    window.addEventListener('DOMContentLoaded', () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      }
    });
  }); */
  useEffect(() => {
    if (zeroDevReady && authenticated ) {
      console.log("authenticated", authenticated)
      // set user address
      console.log("address", user?.wallet?.address)
      dispatch(setAddress(user?.wallet?.address as string));
      
      // route home
      
     
    }
  }, [authenticated, zeroDevReady]);


  
  return (
    <>
      <AnimatePresence>

          <motion.div
          
            key={"login-page"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className='relative'
          >
            <div className='absolute -z-50 '>
              <BackgroundGradientAnimation />
            </div>
            <div className='mt-[30vh] grid justify-center p-4'>
              <div className=' space-y-2 text-center'>
                <motion.h1
                  key='create-an-account'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='text-2xl font-semibold tracking-tight'
                >
                  Log in or Sign up
                </motion.h1>
                {/*   <motion.p  initial={{opacity: 0}} animate={{ opacity: 1}} exit={{opacity:0 }} className='text-muted-foreground text-sm'>
                    Enter your email below to create your account
                  </motion.p> */}
              </div>
              <Button className='mt-4' onClick={login}>
                Login
              </Button>
              <Link href={'/home'}>home</Link>
            </div>
          </motion.div>

      </AnimatePresence>
    </>
  );
};

export default Page;
