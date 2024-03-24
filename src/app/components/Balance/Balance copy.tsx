// wagmi
'use client';
import { useBalance } from 'wagmi';

// Redux
import { RootState } from '../../../GlobalRedux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setBalance } from '@/GlobalRedux/Features/balance/balanceSlice';

// React
import { useEffect } from 'react';

// next
import { usePathname } from 'next/navigation';

export default function Balance() {
  // Redux
  const dispatch = useDispatch();
  // next
  const pathname = usePathname();
  // hooks
  const address = useSelector((state: RootState) => state.address.value);

  

  const checkBalance = async () => {
    try {
      console.log('balance', result?.data?.formatted);

      const result = useBalance({
        // @ts-ignore
        address: address,
        token: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8',
      });
      // @ts-ignore
      dispatch(setBalance(result?.data?.formatted));
    } catch (error) {
      console.log('error', error);
    }
  };

  // pathname use effect
  useEffect(() => {
    console.log(`Route changed to: ${pathname}`);
    checkBalance();
  }, [pathname]);

  // Get the balance from Redux
  const balanceState = useSelector((state: RootState) => state.balance.value);
  console.log('balanceState', balanceState);
  
  // Render the balance
  return <div className='text-white'>${balanceState}</div>;
}
