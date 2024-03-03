// wagmi
'use client';
import { useBalance } from 'wagmi';

// Redux
import { RootState } from '../../../GlobalRedux/store';
import { useDispatch, useSelector } from 'react-redux';

export default function Balance() {
  const dispatch = useDispatch();
  const addressState = useSelector((state: RootState) => state.address.value);
  const balanceState = useSelector((state: RootState) => state.balance.value);

  const result = useBalance({
    address: addressState,
    token: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8',
  });

  if (result?.data?.formatted > balanceState) {
    dispatch(result?.data?.formatted);
  }

  // get balance from redux

  return (
    <div className='text-white'>
      {result?.data?.formatted > balanceState
        ? result?.data?.formatted
        : balanceState}
    </div>
  );
}
