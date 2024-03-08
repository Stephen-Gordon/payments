'use client';

import { Metadata } from 'next';
import * as React from 'react';

import { useEffect } from 'react';
import '@radix-ui/themes/styles.css';
// Redux
import { Providers } from '../GlobalRedux/provider';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import config from '@/app/config';
import Head from 'next/head';
import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { siteConfig } from '@/constant/config';

// Redux
import { useSelector } from 'react-redux';
import { RootState, persistor } from '@/GlobalRedux/store';

import { PersistGate } from 'redux-persist/integration/react';
import { usePathname, useRouter } from 'next/navigation';
import ReactPullToRefresh from 'react-pull-to-refresh';

import { ThemeProvider } from '@/app/components/theme-provider';
// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
/* 

export const metadata: Metadata = {
  title: 'PWA with Next 13',
  description: 'PWA application with Next 13',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'nextjs13', 'next13', 'pwa', 'next-pwa'],
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
  authors: [
    { name: 'Rajesh Prajapati' },
    {
      name: 'Rajesh Prajapati',
      url: 'https://www.linkedin.com/in/raazeshp96/',
    },
  ],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon-128x128.png' },
    { rel: 'icon', url: 'icons/icon-128x128.png' },
  ],
}; */

import bgimage from '../../public/images/Rectangle.png';
import { LayoutGroup } from 'framer-motion';

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
  const pathname = usePathname();
  /*   const loginState = useSelector((state: RootState) => state.login.value);

  // Redirect to login if not authenticated
  if (!loginState && pathname !== '/login') {
    router.push('/login');
    return null;
  }
  console.log(loginState);


 */

  return (
    <html className='h-full overflow-auto font-sans'>
      <head>
        {/* <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        /> */}
        <title>Payments, Stephen Gordon</title>
        
        <meta name='application-name' content='PWA App' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='PWA App' />
        <meta name='description' content='PWA Payments, Stephen Gordon' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='/icons/browserconfig.xml' />
        <meta name='msapplication-TileColor' content='#2B5797' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#101012' />
        <link rel='apple-touch-icon' href='/icons/touch-icon-iphone.png' />
        <link
          rel='apple-touch-icon'
          sizes='152x152'
          href='/icons/touch-icon-ipad.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/icons/touch-icon-iphone-retina.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='167x167'
          href='/icons/touch-icon-ipad-retina.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/icons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/icons/favicon-16x16.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <link
          rel='mask-icon'
          href='/icons/safari-pinned-tab.svg'
          color='#5bbad5'
        />
        <link rel='shortcut icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com'></link>
        <link rel='preconnect' href='https://fonts.gstatic.com'></link>
        <link
          href='https://fonts.googleapis.com/css?family=IBM+Plex+Sans'
          rel='stylesheet'
        />

        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </head>
  

      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          disableTransitionOnChange
        >
          <Providers>
            <PersistGate loading={null} persistor={persistor}>
              <WagmiProvider config={config!}>
                <QueryClientProvider client={queryClient}>
                  <LayoutGroup>
                    <div>{auth}</div>
                    <div>{drawer}</div>
                    {/*   <div>{transactionmodal}</div> */}
                    {/* <div className=' absolute -z-50 flex h-1/2 w-1/2  justify-center '>
                    <div
                      style={{
                        backgroundImage: `url(${bgimage.src})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }}
                    ></div>
                  </div> */}
                    <main
                      /*  style={{
                        backgroundColor: 'rgba(16, 16, 18, 1)',
                      }} */
                      className=' h-screen w-screen text-gray-300'
                    >
                      {children}
                    </main>
                  </LayoutGroup>
                </QueryClientProvider>
              </WagmiProvider>
            </PersistGate>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
