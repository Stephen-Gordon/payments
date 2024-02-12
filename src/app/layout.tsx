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

export default function RootLayout({
  auth,
  transactionmodal,
  children,
}: {
  auth: React.ReactNode;
  transactionmodal: React.ReactNode;
  children: React.ReactNode;
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

  const onRefresh = async () => {
    console.log('refreshing');

    window.location.reload();
  };

  return (
    <html className='bg-dark h-full overflow-auto '>
      <head>
        <title>Payments, Stephen Gordon</title>
        <title>Payments, Stephen Gordon</title>
        <meta name='application-name' content='PWA App' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='PWA App' />
        <meta name='description' content='Best PWA App in the world' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='/icons/browserconfig.xml' />
        <meta name='msapplication-TileColor' content='#2B5797' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#000000' />

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
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'
        />

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:url' content='https://yourdomain.com' />
        <meta name='twitter:title' content='PWA App' />
        <meta name='twitter:description' content='Best PWA App in the world' />
        <meta
          name='twitter:image'
          content='https://yourdomain.com/icons/android-chrome-192x192.png'
        />
        <meta name='twitter:creator' content='@DavidWShadow' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='PWA App' />
        <meta property='og:description' content='Best PWA App in the world' />
        <meta property='og:site_name' content='PWA App' />
        <meta property='og:url' content='https://yourdomain.com' />
        <meta
          property='og:image'
          content='https://yourdomain.com/icons/apple-touch-icon.png'
        />

        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_2048.png'
          sizes='2048x2732'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_1668.png'
          sizes='1668x2224'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_1536.png'
          sizes='1536x2048'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_1125.png'
          sizes='1125x2436'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_1242.png'
          sizes='1242x2208'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_750.png'
          sizes='750x1334'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_640.png'
          sizes='640x1136'
        />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </head>
      <Head>
        <title>Payments, Stephen Gordon</title>
        <meta name='application-name' content='PWA App' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='PWA App' />
        <meta name='description' content='Best PWA App in the world' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='/icons/browserconfig.xml' />
        <meta name='msapplication-TileColor' content='#2B5797' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#000000' />

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
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'
        />

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:url' content='https://yourdomain.com' />
        <meta name='twitter:title' content='PWA App' />
        <meta name='twitter:description' content='Best PWA App in the world' />
        <meta
          name='twitter:image'
          content='https://yourdomain.com/icons/android-chrome-192x192.png'
        />
        <meta name='twitter:creator' content='@DavidWShadow' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='PWA App' />
        <meta property='og:description' content='Best PWA App in the world' />
        <meta property='og:site_name' content='PWA App' />
        <meta property='og:url' content='https://yourdomain.com' />
        <meta
          property='og:image'
          content='https://yourdomain.com/icons/apple-touch-icon.png'
        />

        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_2048.png'
          sizes='2048x2732'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_1668.png'
          sizes='1668x2224'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_1536.png'
          sizes='1536x2048'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_1125.png'
          sizes='1125x2436'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_1242.png'
          sizes='1242x2208'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_750.png'
          sizes='750x1334'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_640.png'
          sizes='640x1136'
        />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </Head>

      <body>
        <Providers>
          <PersistGate loading={null} persistor={persistor}>
            <WagmiProvider config={config!}>
              <QueryClientProvider client={queryClient}>
                <ReactPullToRefresh
                  onRefresh={onRefresh}
                  className='your-own-class-if-you-want'
                  style={{ textAlign: 'center' }}
                >
                  <div>{auth}</div>
                  <div>{transactionmodal}</div>
                  <main className='bg-dark h-screen w-screen text-gray-300'>
                    {children}
                  </main>
                </ReactPullToRefresh>
              </QueryClientProvider>
            </WagmiProvider>
          </PersistGate>
        </Providers>
      </body>
    </html>
  );
}
