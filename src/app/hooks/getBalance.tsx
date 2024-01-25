import { publicClient } from './client'

export default function getBalance({ address, token }) {

  const balance = publicClient.getBalance({
    address: address,
    token: token
  })

}