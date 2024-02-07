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
      <Head>
        <title>Payments, Stephen Gordon</title>
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
