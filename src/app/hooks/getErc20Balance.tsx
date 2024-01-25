import { Address } from 'viem'
import { publicClient } from './client'
import { polygonMumbai } from 'viem/chains'

export default function getBalance({ address, token }: { address: Address, token: any }) {


  const usdc = publicClient.getERC20({
    address: '0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97', // usdc address
    id: polygonMumbai
  })

  const balance = publicClient.getERC20Balance({
    erc20: usdc,
    address: "0xc8C26Ab40fe4723519fE66B8dBb625FC070A982c"
  })

}