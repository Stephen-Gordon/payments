import { useSelector } from 'react-redux';
import { RootState } from '../../GlobalRedux/store';
import { usePrivySmartAccount } from '@zerodev/privy';
const useGetAddress = () => {
  //const addressState = useSelector((state: RootState) => state.address.value);
  const { user } = usePrivySmartAccount();
  const addressState = user?.wallet?.address;
  //const addressState = user?.wallet?.address;
  return addressState ? addressState : '';
};

export default useGetAddress;
