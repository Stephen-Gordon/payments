// wagmi
'use client';
import { useBalance } from 'wagmi';

// Redux
import { RootState } from '../../../GlobalRedux/store';
import { useSelector } from 'react-redux';

export default function Balance() {
  const addressState = useSelector((state: RootState) => state.address.value);

  const result = useBalance({
    address: addressState,
    token: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8',
  });

  return <div className='text-white'>{result?.data?.formatted}</div>;
}
