'use client'
import { http, createConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'

const config = createConfig({ 
  chains: [polygonMumbai],
  transports: {
    [polygonMumbai.id]: http(),
  },
});

export default config;