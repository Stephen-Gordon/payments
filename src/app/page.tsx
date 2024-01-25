'use client';

import Head from 'next/head';
import * as React from 'react';

import { useState, useEffect } from 'react';


// Web3auth
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "./web3RPC"; // for using web3.js


// Zero Dev 
import { createEcdsaKernelAccountClient } from '@zerodev/presets/zerodev';
import { providerToSmartAccountSigner } from '@zerodev/sdk';
import { polygonMumbai } from 'viem/chains';
import { SmartAccountSigner } from 'permissionless/accounts';
import { Hex, zeroAddress } from "viem"
import { generatePrivateKey } from "viem/accounts"
import { privateKeyToAccount } from "viem/accounts"

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x13881",
  rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
  displayName: "Polygon Mumbai",
  blockExplorer: "https://etherscan.io/",
  ticker: "Matic",
  tickerName: "Matic",
};

const web3auth = new Web3AuthNoModal({
  // @ts-ignore
  clientId: "BCUJ9sDhdO5iekR-oaXL7bIC5Dg3tPNyhtGp_4z_SLp3B0ZKp-0qmE9RFWxUdY4g1wNzJqkxr10d14ty-PoAqCI",
  chainConfig,
  web3AuthNetwork: "sapphire_devnet",
});

const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });
const openloginAdapter = new OpenloginAdapter({
  privateKeyProvider: privateKeyProvider,
});
web3auth.configureAdapter(openloginAdapter);


export default function HomePage() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [kernalClient, setKernalClient] = useState<any>(null);

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
    console.log("kernalClient", kernalClient)
  }, [kernalClient])

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

  const setUp = async () => {
    try {

      if (web3auth) {

        const rpc = new RPC(web3auth.provider as IProvider);
        const privateKey = await rpc.getPrivateKey();
        const signer = privateKeyToAccount(`0x${privateKey}` as Hex)
        const kernelClient = await createEcdsaKernelAccountClient({
          // required
          chain: polygonMumbai,
          projectId: "f1d2d8bf-0feb-430a-9f6f-dfeb8bc639a3",
          signer: signer,
        })
        setKernalClient(kernelClient)


        console.log("My account:", kernelClient.account.address)


        const txnHash = await kernelClient.sendTransaction({
          to: zeroAddress,
          value: BigInt(0),
          data: "0x",
        })

        console.log("txn hash:", txnHash)

        const userOpHash = await kernelClient.sendUserOperation({
          userOperation: {
            callData: await kernelClient.account.encodeCallData({
              to: zeroAddress,
              value: BigInt(0),
              data: "0x",
            }),
          },
        })

        console.log("userOp hash:", userOpHash)

      }

    } catch (error) {

    }
  }


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
          <button
            onClick={setUp}
          >
            Setup
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
