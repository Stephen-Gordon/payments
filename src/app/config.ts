'use client'
import { http, createConfig } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'

const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
});

export default config;