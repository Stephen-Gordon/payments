'use client';

import Head from 'next/head';
import * as React from 'react';

import { useState, useEffect } from 'react';


// Web3auth
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
// IMP START - Dashboard Registration
const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1", // Please use 0x1 for Mainnet
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorer: "https://etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
};

const web3auth = new Web3AuthNoModal({
  clientId,
  chainConfig,
  web3AuthNetwork: "sapphire_mainnet",
});

const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });
const openloginAdapter = new OpenloginAdapter({
  privateKeyProvider: privateKeyProvider,
});
web3auth.configureAdapter(openloginAdapter);
// IMP END - SDK Initialization


export default function HomePage() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

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

  const login = async () => {
    // IMP START - Login
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "google",
      }
    );
    // IMP END - Login
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };


  const getDetails = async () => {
    try {
      console.log(provider)
    } catch (error) {

    }
  }


  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );


  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          Logged in
          <button
            onClick={getDetails}
          >
            Details
          </button>
        </div>
      </div>
    </>
  );


  return (
    <main>
      <Head>
        <title>Payments, Stephen Gordon</title>
      </Head>
      <section className='bg-slate-900 text-white w-screen h-screen'>
        {unloggedInView}
        {loggedIn && loggedInView}
      </section>
    </main>
  );
}
