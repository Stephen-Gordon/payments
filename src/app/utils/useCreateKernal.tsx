'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../../GlobalRedux/store';
import { IProvider } from '@web3auth/base';

// rpc
import RPC from '../web3RPC';

// Zero Dev
import { createEcdsaKernelAccountClient } from '@zerodev/presets/zerodev';
import { polygonMumbai } from 'viem/chains';
import { Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

import { useDispatch } from 'react-redux';

const useCreateKernal = async (web3auth) => {
  // take in the web3auth provider as a param

  // create a new RPC instance
  const rpc = new RPC(web3auth.provider as IProvider);

  // get the private key
  const privateKey = await rpc.getPrivateKey();

  // create a signer from the private key
  const signer = privateKeyToAccount(`0x${privateKey}` as Hex);

  // create the Account Abstraction Kernal Client
  const kernelClient = await createEcdsaKernelAccountClient({
    // required
    chain: polygonMumbai,
    projectId: 'f1d2d8bf-0feb-430a-9f6f-dfeb8bc639a3',
    signer: signer,
  });

  // return the kernal client
  return kernelClient;
};

export default useCreateKernal;
