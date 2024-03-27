/* import { MoralisNextApi } from "@moralisweb3/next";

export default MoralisNextApi({
  apiKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjY4NTRjOTU5LTk5NGEtNGYwZC04MjA0LTA4YWM2MmE3Y2EwOSIsIm9yZ0lkIjoiMzc2ODcxIiwidXNlcklkIjoiMzg3Mjg5IiwidHlwZUlkIjoiMTQxNjQyOTUtNzg4MS00Yzk2LTkxM2ItNTQ5YjBiZjU2M2FkIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDc3NDAwOTgsImV4cCI6NDg2MzUwMDA5OH0.GrOEC01ujomn_3cVNZKKxCkd5QVP52i5I3HsFxSp23Q',
}); */

import { MoralisNextApi } from '@moralisweb3/next';



export default MoralisNextApi({
  apiKey: process.env.MORALIS_API_KEY  });