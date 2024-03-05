// wagmi
'use client';
import { useBalance } from 'wagmi';

// Redux
import { RootState } from '../../../GlobalRedux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setBalance } from '@/GlobalRedux/Features/balance/balanceSlice';
export default function Balance() {
  const dispatch = useDispatch();
  const addressState = useSelector((state: RootState) => state.address.value);
  const balanceState = useSelector((state: RootState) => state.balance.value);

  const result = useBalance({
    address: addressState,
    token: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8',
  });

  // Dispatch an action to update the balance state in Redux
  if (result?.data?.formatted && result.data.formatted !== balanceState) {
    dispatch(setBalance(result.data.formatted)); // Dispatching an action with the balance value
  }

  // Render the balance
  return <div className='text-white'>${balanceState}</div>;
}
