'use client';

import { Metadata } from 'next';
import * as React from 'react';

import { useEffect } from 'react';

// Redux
import { Providers } from '../GlobalRedux/provider';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import config from '@/app/config';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { siteConfig } from '@/constant/config';

// Redux
import { useSelector } from 'react-redux';
import { RootState, persistor } from '@/GlobalRedux/store';

import { PersistGate } from 'redux-persist/integration/react';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
/* export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
    // creator: '@th_clarence',
  },
  // authors: [
  //   {
  //     name: 'Theodorus Clarence',
  //     url: 'https://theodorusclarence.com',
  //   },
  // ],
};
 */

import Link from 'next/link';
export default function RootLayout({
  auth,
  children,
}: {
  auth: React.ReactNode;
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  const authState = true;
  /* 
  const searchState = useSelector((state: RootState) => state.search.value);

  useEffect(() => {
    console.log('searchState', searchState);
  }, [searchState]); */

  return (
    <html>
      <body>
        <Providers>
          <PersistGate loading={null} persistor={persistor}>
            <WagmiProvider config={config!}>
              <QueryClientProvider client={queryClient}>
                <nav>
                  <Link href='/search'>Open modal</Link>
                </nav>
                <div>{authState && auth}</div>
                <main>{children}</main>
              </QueryClientProvider>
            </WagmiProvider>
          </PersistGate>
        </Providers>
      </body>
    </html>
  );
}
