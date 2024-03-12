import { useSelector } from 'react-redux';
import { RootState } from '../../GlobalRedux/store';
import { usePrivySmartAccount } from '@zerodev/privy';
const useGetAddress = () => {
  const addressState = useSelector((state: RootState) => state.address.value);
  //const addressState = user?.wallet?.address;
  return addressState;
};

export default useGetAddress;
