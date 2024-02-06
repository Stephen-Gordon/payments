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

// spinner
import { RotatingLines } from 'react-loader-spinner';

import { setKernalClient } from '@/GlobalRedux/Features/kernalClient/kernalClientSlice';

import { parseEther } from 'viem';
import { useRouter } from 'next/navigation';

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

export default function Page() {
  const [kernalClient, setKernal] = useState<any>(null);

  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const router = useRouter();

  // set the kernal client in redux
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        // init the web3auth sdk
        await web3auth.init();
        console.log('web3auth initialized');
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (loginSuccess) {
      router.push('/home');
    }
  }, [loginSuccess]);

  const login = async () => {
    try {
      console.log('logging in');
      const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
          loginProvider: 'google',
        }
      );

      if (web3auth.connected) {
        console.log('logged in, calling setup');
        setUp();
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <main>
      <Head>
        <title>Payments, Stephen Gordon</title>
      </Head>
      <section className='grid justify-center text-white'>
        <button
          onClick={login}
          className='rounded-lg bg-blue-500 px-8 py-4 text-white transition-all duration-300 hover:bg-blue-700'
        >
          {!loading ? 'Sign in with Google' : <RotatingLines />}
        </button>
      </section>
    </main>
  );
}
