'use client';

import Head from 'next/head';

// React
import * as React from 'react';
import { useState, useEffect } from 'react';

import Link from 'next/link';

// Web3auth
import { Web3AuthNoModal } from '@web3auth/no-modal';
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';

import { useDispatch } from 'react-redux';

// Components
import useCreateKernal from '@/app/utils/useCreateKernal';

// spinner
import { RotatingLines } from 'react-loader-spinner';

import { setKernalClient } from '@/GlobalRedux/Features/kernalClient/kernalClientSlice';

import { useRouter } from 'next/navigation';
import { setLogin } from '@/GlobalRedux/Features/login/loginSlice';

// secure storage
import secureLocalStorage from 'react-secure-storage';

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
  // Kernal State
  const [kernalClient, setKernal] = useState<any>(null);
  // Loading State
  const [loading, setLoading] = useState<boolean>(false);
  // Login Success State
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const [error, setError] = useState<string>('');

  // router
  const router = useRouter();

  // set the kernal client in redux
  const dispatch = useDispatch();

  // initial useEffect to setup the sdk
  useEffect(() => {
    let value = secureLocalStorage.getItem('pk');
    if (value) {
      let option = {
        name: 'local',
        value: value,
      };
      const kernal = useCreateKernal(option);
      setReduxKernal(kernal);
      setReduxLogin();

      router.push('/home');
    }

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

  // Web3Auth login
  const login = async () => {
    try {
      console.log('logging in');
      setLoading(true);
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

  const setReduxLogin = async () => {
    try {
      console.log('setting login');
      dispatch(setLogin(true));
      console.log('login set');
    } catch (error) {
      console.log(error);
    }
  };

  // ZeroDev SDK setup
  const setUp = async () => {
    try {
      if (web3auth) {
        let option = {
          name: 'web3auth',
          value: web3auth,
        };
        const kernal = await useCreateKernal(option);
        setKernal(kernal);
        if (kernal.account) {
          setLoading(false);
          setLoginSuccess(true);
          setReduxKernal(kernal);
          setTimeout(() => {
            router.push('/home');
          }, 2000);
        } else {
          setError('Error creating account');
        }
        console.log('My account:', kernal.account.address);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setReduxKernal = async (kernal: any) => {
    try {
      console.log('setting kernal');
      dispatch(setKernalClient(kernal));
      console.log('kernal set');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className=' h-screen w-screen p-4 text-white'>
      <div className='min-h-1/2 flex w-full content-end justify-center p-4 text-center'>
        <div className='w-full'>
          <div className='mb-12'>
            <h1 className='text-4xl font-bold'>Sign in</h1>
          </div>
          <button
            onClick={login}
            className='blurios w-full rounded-lg border border-slate-500 px-8 py-4 text-white transition-all duration-300 hover:opacity-80'
          >
            {!loading ? (
              'Sign in with Google'
            ) : (
              <RotatingLines
                visible={true}
                height='24'
                width='24'
                color='grey'
                strokeWidth='5'
                animationDuration='1'
              />
            )}
            {error && error}
          </button>
        </div>
      </div>

      <Link
        href={{
          pathname: '/home',
        }}
      >
        Home
      </Link>
    </section>
  );
}
