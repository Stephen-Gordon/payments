'use client';

import React from 'react';

import { useEffect, useState } from 'react';
import '@radix-ui/themes/styles.css';
// Redux
import { Providers } from '../GlobalRedux/provider';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import config from '@/app/config';
import '@/styles/globals.css';
import '@/styles/colors.css';

// Redux
import { persistor } from '@/GlobalRedux/store';

import { PersistGate } from 'redux-persist/integration/react';
import { usePathname, useRouter } from 'next/navigation';

import { ThemeProvider } from '@/app/components/theme-provider';

import { ZeroDevProvider } from '@zerodev/privy';

// privy
import { PrivyProvider } from '@privy-io/react-auth';
import { usePrivySmartAccount } from '@zerodev/privy';

import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { baseSepolia } from 'viem/chains';
import BottomNavbar from './components/BottomNav/BottomNav';
import AuthPage from './components/AuthPage/AuthPage';

export default function RootLayout({
  auth,
  transactionmodal,
  drawer,
  children,
}: {
  auth: React.ReactNode;
  transactionmodal: React.ReactNode;
  children: React.ReactNode;
  drawer: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const router = useRouter();

  /* 
  
  useEffect(() => {
    if (window) {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
        router.push('/home');
        

      } else {
        setIsInstalled(false);
        router.push('/');
      }
    }
  }, []); */

  /* useEffect(() => {
    

     if (authenticated && zeroDevReady) {
       // route home
       console.log('authenticated');
       router.push('/home');
       return;
     } else {
       router.push('/login');
     }
   }, [authenticated, zeroDevReady]);  */

  return (
    <html className='h-full font-sans'>
      <head>
        <title>Payments, Stephen Gordon</title>

        <meta name='application-name' content='Payments' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-title' content='Payments' />
        <meta name='description' content='Payments, Stephen Gordon' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='/icons/browserconfig.xml' />
        <meta name='msapplication-TileColor' content='#020817' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='translucent' />
        <link rel='apple-touch-icon' href='/icons/touch-icon-iphone.png' />
        <link
          href='splashscreens/iphone5_splash.png'
          media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)'
          rel='apple-touch-startup-image'
        />
        <link
          href='splashscreens/iphone6_splash.png'
          media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)'
          rel='apple-touch-startup-image'
        />
        <link
          href='splashscreens/iphoneplus_splash.png'
          media='(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)'
          rel='apple-touch-startup-image'
        />
        <link
          href='splashscreens/iphonex_splash.png'
          media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)'
          rel='apple-touch-startup-image'
        />
        <link
          href='splashscreens/iphonexr_splash.png'
          media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)'
          rel='apple-touch-startup-image'
        />
        <link
          href='splashscreens/iphonexsmax_splash.png'
          media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)'
          rel='apple-touch-startup-image'
        />
        <link
          href='splashscreens/ipad_splash.png'
          media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)'
          rel='apple-touch-startup-image'
        />
        <link
          href='splashscreens/ipadpro1_splash.png'
          media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)'
          rel='apple-touch-startup-image'
        />
        <link
          href='splashscreens/ipadpro3_splash.png'
          media='(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)'
          rel='apple-touch-startup-image'
        />
        <link
          href='splashscreens/ipadpro2_splash.png'
          media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)'
          rel='apple-touch-startup-image'
        />
        <link rel='manifest' href='/manifest.json' />
        <link
          rel='mask-icon'
          href='/icons/safari-pinned-tab.svg'
          color='#020817'
        />
        <link rel='shortcut icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com'></link>
        <link rel='preconnect' href='https://fonts.gstatic.com'></link>
        <link
          href='https://fonts.googleapis.com/css?family=Nunito+Sans'
          rel='stylesheet'
        />

        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </head>

      <body id='main' className='overflow-hidden'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          disableTransitionOnChange
        >
          <ZeroDevProvider
            projectId={process.env.NEXT_PUBLIC_ZERODEV_ID as string}
          >
            <PrivyProvider
              appId={'cltk97hyk016h7afh32g4363z'}
              onSuccess={() => {
                router.push('/home');
              }}
              config={{
                appearance: {
                  theme: 'dark',
                },
                defaultChain: baseSepolia,
                loginMethods: ['apple', 'google', 'email'],
                embeddedWallets: {
                  createOnLogin: 'users-without-wallets',
                  noPromptOnSignature: true,
                },
              }}
            >
              <Providers>
                <PersistGate loading={null} persistor={persistor}>
                  <WagmiProvider config={config!}>
                    <QueryClientProvider client={queryClient}>
                      <LayoutGroup>
                        <div
                          vaul-drawer-wrapper=''
                          className='relative h-[100vh] justify-center overflow-hidden'
                        >
                          {auth}
                          {drawer}

                          {children}
                          <BottomNavbar />
                        </div>
                      </LayoutGroup>
                    </QueryClientProvider>
                  </WagmiProvider>
                </PersistGate>
              </Providers>
            </PrivyProvider>
          </ZeroDevProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
