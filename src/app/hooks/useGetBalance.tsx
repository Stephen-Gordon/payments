import axios from 'axios';

const useGetBalance = async (address: string) => {
  try {
    const data = await axios
      .get(
        `https://api-sepolia.basescan.org/api?module=account&action=tokenbalance&contractaddress=0x036CbD53842c5426634e7929541eC2318f3dCF7e&address=${address}&tag=latest&apikey=6VRQH98BTKVZYXU68YJYWVX3EC2ZP6UEFV`
      )
      .then((res) => {
        console.log('axios balance', res.data);
        return res.data.result;
      });

    console.log('axios ', data);
    return data;
  } catch (e) {
    console.error('axios balance', e);
  }
};

export default useGetBalance;
