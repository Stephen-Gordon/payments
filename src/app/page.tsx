'use client';

import Head from 'next/head';

// React
import * as React from 'react';
import { useState, useEffect } from 'react';

// Web3auth
import { Web3AuthNoModal } from '@web3auth/no-modal';
import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';

import { useDispatch } from 'react-redux';

// Components
import Balance from '@/app/components/Balance/Balance';
import useCreateKernal from '@/app/utils/useCreateKernal';
import Link from 'next/link';

//
import { setKernalClient } from '@/GlobalRedux/Features/kernalClient/kernalClientSlice';

import { parseEther } from 'viem';

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: '0xaa36a7',
  rpcTarget: 'https://rpc.ankr.com/eth_sepolia',
  displayName: 'Sepolia',
  blockExplorer: 'https://etherscan.io/',
  ticker: 'Eth',
  tickerName: 'Eth',
};

const web3auth = new Web3AuthNoModal({
  // @ts-ignore
  clientId:
    'BCUJ9sDhdO5iekR-oaXL7bIC5Dg3tPNyhtGp_4z_SLp3B0ZKp-0qmE9RFWxUdY4g1wNzJqkxr10d14ty-PoAqCI',
  chainConfig,
  web3AuthNetwork: 'sapphire_devnet',
});

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});
const openloginAdapter = new OpenloginAdapter({
  privateKeyProvider: privateKeyProvider,
});
web3auth.configureAdapter(openloginAdapter);

export default function HomePage() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [kernalClient, setKernal] = useState<any>(null);
  // set the kernal client in redux
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        // IMP START - SDK Initialization
        await web3auth.init();
        // IMP END - SDK Initialization
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    console.log('kernalClient', kernalClient);
  }, [kernalClient]);

  const login = async () => {
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: 'google',
      }
    );
    setProvider(web3authProvider);

    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const unloggedInView = (
    <button onClick={login} className='card'>
      Login
    </button>
  );

  const setUp = async () => {
    try {
      if (web3auth) {
        const kernal = await useCreateKernal(web3auth);
        setKernal(kernal);
        console.log('My account:', kernal.account.address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const setReduxKernal = async () => {
      try {
        console.log('setting kernal');
        dispatch(setKernalClient(kernalClient));
        console.log('kernal set');
      } catch (error) {}
    };
    setReduxKernal();
  }, [kernalClient]);

  const loggedInView = (
    <>
      <div className='flex-container'>
        <div>
          Logged in
          <button onClick={setUp}>Setup</button>
        </div>
      </div>
    </>
  );

  return (
    <main>
      <head>
        <title>Payments, Stephen Gordon</title>
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
      <section className='h-screen w-screen bg-slate-900 text-white'>
        {unloggedInView}
        {loggedInView}

        <Link
          href={{
            pathname: '/home',
          }}
        >
          Home
        </Link>
      </section>
    </main>
  );
}
