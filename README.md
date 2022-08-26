## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Description
A token transfer tool based on:

- frontend: next.js/react-boostrap/Redux/Hooks
- backend: pages/api @Next.js
- web3: web3.js/web3Modal(for multiple wallet connection)
- web3 network: Rinkeby testnet
- database: mongoDB
- deployment:Vercel

## Features
- show basic info from wallet account: balance, account
- transfer rinkeby faucet tokens to another address
- popups help to display submitted, confirmed and failed transactions
- balance history saved to mongoDB when connect wallet
- balance history fetched from mongoDB and displayed when click account address button at Nav
- switch network (if login with chain other than Rinkeby, will inject a switch network request automatically)
- future plan: token swap and NFT staking features
- use ChainLink to feed the real-time token exchange rate
