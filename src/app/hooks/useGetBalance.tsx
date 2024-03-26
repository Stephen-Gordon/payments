/* // wagmi
'use client';
import { useBalance } from 'wagmi';

// Redux

import { RootState } from '@/GlobalRedux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setBalance } from '@/GlobalRedux/Features/balance/balanceSlice';

const useGetBalance = (address: string) => {
  const result = useBalance({
    // @ts-ignore
    address: address,
    token: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8',
  });

  const dispatch = useDispatch();
  dispatch(setBalance(result?.data?.formatted));

  return result?.data?.formatted;
};

export default useGetBalance;
 */
// wagmi
'use client';
import { useBalance } from 'wagmi';

// Redux

import { RootState } from '@/GlobalRedux/store';
import { useDispatch, useSelector } from 'react-redux';

const useGetBalance = (address: string) => {
  const result = useBalance({
    // @ts-ignore
    address: address,
    token: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8',
  });


  return result?.data?.formatted;
};

export default useGetBalance;
