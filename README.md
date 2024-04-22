# Payments PWA

## Try it out
[https://payments-lyart.vercel.app/](https://payments-lyart.vercel.app/)

## Description
The inspiration for this thesis project came from my travels through several countries in Asia, where I observed that payment apps were widely used but inaccessible to foreign users due to the need for a local bank account for onramping. To address this challenge, I decided to create a payment app that is open and permissionless, built on blockchain technology and uses progressive web app technology. The aim of this app is to provide a seamless payment experience to users. The app uses a layer 2 blockchain to create an app that is secure, permissionless, fast, and accessible to all users. 

The app provides an easy-to-use interface that allows users to store, transfer, and receive payments via a blockchain. In addition, it implements account abstraction to create a smart contract account for users, enhancing the user experience when interacting with the blockchain.

## Demo 
https://github.com/Stephen-Gordon/payments/assets/91547618/53481091-577d-4333-b8c2-d531e5a444ea



## Features
The app allows users to receive payments via the base blockchain. A user can create a smart contract account using the Privy and ZeroDev SDKs. They can then receive USDC via scanning a QR code. On receiving a payment, a user receives a push notification using web-push. Once a user has some USDC, they can scan another user's QR code to send them USDC. If the person is a first-time payee, they can add the payee to their address book. The user can then choose an amount to send. They are then brought to a confirm page to check the amount and payee. Once the payment is sent the user is routed back to view all their transactions history.

## Inspired by 
- [Stablecoins](https://liamhorne.com/stablecoins)
- [Recovery](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Ethereum in the Next Decade](https://youtu.be/NS0P1eiW7NE?si=Uy_392SPh39S9muD)


## Why blockchain
Blockchain technology was chosen to build the app on top, not just for its open source and community-driven nature but also for its developer-friendly features. This technology empowers developers by providing them with auditable and transparent tools, reliable and self-custodial systems, and globally accessible platforms, making them an integral part of the blockchain ecosystem. Recent advancements in Layer 2 blockchains have further boosted scalability and transaction throughput, enhancing their UX.

## Why Base
Base was chosen as it falls into the greater vision outlined the Optimism Foundation, the [Superchain](https://docs.optimism.io/stack/explainer/). Base also provides fast transaction throughput, great documentation and developer experience, along with useful faucets for testnet tokens. Also Privy and ZeroDev, two other packages used for account creation, had great support for Base.

## Why Account Abstraction 
Account Abstraction allows users to create smart contract accounts that can still be used with the same functionality as an EOA wallet on an EVM blockchain. AA also allows for sponsoring user's gas fees, bundling transactions, and user's are not required to sign transactions first. All these attributes of AA provide a much better UX for users.

## Future Developments 
- Add ENS subdomain support 
- Migrate to a React Native Expo app
- Fix tyescipt bugs
- Add support for multiple wallets
- Add React Toast
- Add AA session keys and account recovery


## Built using
- [React](https://react.dev/)
- [Next JS](https://nextjs.org/)
- [Redux](https://redux.js.org/)
- [ZeroDev Account Abstraction](https://zerodev.app/)
- [Privy](https://www.privy.io/)
- [Viem](https://viem.sh/)
- [Tailwind](https://tailwindcss.com/)
- [ShadCN](https://ui.shadcn.com/)
- [Webpush](https://github.com/web-push-libs/web-push)
- [Base](https://www.base.org/)
- [Alchemy](https://www.alchemy.com/)
- [Framer Motion](https://www.framer.com/motion/)


# Similar Apps Studied 
- [Revolut](https://www.revolut.com/)
- [Uniswap Wallet](https://wallet.uniswap.org/)
- [Family](https://family.co/)
- [Wise](https://wise.com/)
- [Paypal](https://www.paypal.com/)
- [Coinbase Wallet](https://www.coinbase.com/wallet)
- [Rainbow Wallet](https://rainbow.me/)
- [Argent](https://www.argent.xyz/)
- [Cake Wakllet](https://cakewallet.com/)
- [UniPass](https://unipass.id/)


## Screenshots

<div align="center">
  <img src="./src/app/assets/screenshots/1.png"/>
</div>

<div align="center">
  <img src="./src/app/assets/screenshots/2.png"/>
</div>

<div align="center">
  <img src="./src/app/assets/screenshots/3.png"/>
</div>

## Connect With Me

- LinkedIn: [Stephen Gordon](https://www.linkedin.com/in/ste-gordon/)
- [Portfolio](https://www.stephengordon.ie)
