'use client';
import { IProvider } from '@web3auth/base';

// rpc
import RPC from '../web3RPC';

// Zero Dev
import { createEcdsaKernelAccountClient } from '@zerodev/presets/zerodev';
import { sepolia } from 'viem/chains';
import { Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

import { useDispatch } from 'react-redux';

// secure storage
import secureLocalStorage from 'react-secure-storage';

const useCreateKernal = async (web3auth) => {
  // take in the web3auth provider as a param

  // create a new RPC instance
  const rpc = new RPC(web3auth.provider as IProvider);

  // get the private key
  const privateKey = await rpc.getPrivateKey();

  // create a signer from the private key
  const signer = privateKeyToAccount(`0x${privateKey}` as Hex);

  secureLocalStorage.setItem('pk', privateKey);

  // create the Account Abstraction Kernal Client
  const kernelClient = await createEcdsaKernelAccountClient({
    // required
    chain: sepolia,
    projectId: 'f6375b6f-2205-4fc7-bc87-f03218789b86',
    signer: signer,
  });

  // return the kernal client
  return kernelClient;
};

export default useCreateKernal;
