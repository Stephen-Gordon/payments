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
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
}, []);

  
 
  return (
    <main>
     
      {/*  <section className='h-screen w-screen bg-slate-900 text-white'>
        <Link
          href={{
            pathname: '/home',
          }}
        >
          Home
        </Link>
      </section> */}
    </main>
  );
}
