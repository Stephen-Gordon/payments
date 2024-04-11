import { IProvider } from '@web3auth/base';
import RPC from '../web3RPC';
import { createEcdsaKernelAccountClient } from '@zerodev/presets/zerodev';
import { baseSepolia } from 'viem/chains';
import { Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import secureLocalStorage from 'react-secure-storage';

const useCreateKernal = async (option) => {
  let privateKey;
  let signer;
  // check if its web3auth or local private key
  if (option.name == 'web3auth') {
    const rpc = new RPC(option?.value.provider as IProvider);
    privateKey = await rpc.getPrivateKey();
    signer = privateKeyToAccount(`0x${privateKey}` as Hex);

    secureLocalStorage.setItem('pk', privateKey);
  } else if (option.name == 'local') {
    // If theres a private key in storage, use it
    // @ts-ignore

    privateKey = option.value;
    signer = privateKeyToAccount(`0x${privateKey}` as Hex);
  }

  const kernelClient = await createEcdsaKernelAccountClient({
    chain: baseSepolia,
    projectId: process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID as string,
    // @ts-ignore
    signer: signer,
  });

  return kernelClient;
};

export default useCreateKernal;
