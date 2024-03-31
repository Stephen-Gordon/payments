import axios from 'axios';

const useGetBalance = async (address: string) => {
  
 try {
   const data = await axios
     .get(
       `https://api-sepolia.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8&address=${address}&tag=latest&apikey=F7A22CIQFVT5UDPBHKFN8GXYN9EXTS4G65`
     )
     .then((res) => {
       console.log('axios balance', res.data);
       return res.data.result;
     });

   console.log('axios ', data);
   return data;
 } catch (e) {
   console.error("axios balance", e);
 }
};

export default useGetBalance;