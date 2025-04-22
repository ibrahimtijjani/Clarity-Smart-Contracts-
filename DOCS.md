# StacksLiquid DeFi Application Documentation

## Table of Contents
1.  [Application Overview](#application-overview)
2.  [Project Structure](#project-structure)
3.  [Core Features](#core-features)
    *   [Token Balance Display](#token-balance-display)
    *   [Token Deposit](#token-deposit)
    *   [Token Withdrawal](#token-token-withdrawal)
    *   [Rewards Display](#rewards-display)
4.  [Clarity Smart Contracts](#clarity-smart-contracts)
    *   [liquidity-pool.clar](#liquidity-poolclar)
    *   [liquidity-token.clar](#liquidity-tokenclar)
    *   [rewards.clar](#rewardsclar)
5.  [UI Components](#ui-components)
    *   [WalletAddressInput](#walletaddressinput)
    *   [Home (Main Page)](#home-main-page)
    *   [Icons](#icons)
6.  [Styling](#styling)
7.  [Services](#services)
    *   [stacks.ts](#stacksts)

## 1. Application Overview
StacksLiquid is a decentralized finance (DeFi) application built on the Stacks blockchain. It allows users to deposit STX and SIP-010 tokens into liquidity pools, earn rewards for providing liquidity, and withdraw their liquidity plus rewards. The application includes Clarity smart contracts for secure and transparent operations and a Next.js UI for user interaction.

## 2. Project Structure
The project is structured as follows:
```
clarity/
├── contracts/
│   ├── liquidity-pool.clar
│   ├── liquidity-token.clar
│   └── rewards.clar
├── tests/
│   ├── liquidity-pool_test.ts
│   ├── liquidity-token_test.ts
│   └── rewards_test.ts
└── settings/
    └── Devnet.toml
ui/
├── public/
├── src/
│   ├── ai/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   └── App.js
└── package.json
```
-   `clarity/`: Contains Clarity smart contracts and related tests.
-   `ui/`: Contains the Next.js UI application.
-   `src/components/`: Reusable UI components.
-   `src/pages/`: Next.js pages for different routes.
-   `src/services/`: Services for interacting with the Stacks blockchain.
-   `src/ai/`: Genkit AI functionality.

## 3. Core Features
### Token Balance Display
The application displays STX and SIP-010 token balances for the user's wallet.
-   Implemented in: `src/app/page.tsx`
-   Function: `getTokenBalances(walletAddress: string)` in `src/services/stacks.ts`

### Token Deposit
Users can deposit STX or SIP-010 tokens into specified liquidity pools via a user interface connected to the wallet.
-   Implemented in: `src/app/page.tsx`
-   Function: `depositTokens(walletAddress: string, token: string, amount: number, pool: string)` in `src/services/stacks.ts`

### Token Withdrawal
Users can withdraw STX or SIP-010 tokens from specified liquidity pools.
-   Implemented in: `src/app/page.tsx`
-   Function: `withdrawTokens(walletAddress: string, token: string, amount: number, pool: string)` in `src/services/stacks.ts`

### Rewards Display
The application displays rewards earned for providing liquidity in an easy-to-read format.
-   Implemented in: `src/app/page.tsx`
-   Function: `getRewards(walletAddress: string)` in `src/services/stacks.ts`

## 4. Clarity Smart Contracts
### liquidity-pool.clar
This contract manages the liquidity pool operations, including deposits and withdrawals.
-   Path: `clarity/contracts/liquidity-pool.clar`
-   Functions:
    -   `deposit(token: String, amount: uint, sender: principal)`: Deposits tokens into the pool.
    -   `withdraw(token: String, amount: uint, recipient: principal)`: Withdraws tokens from the pool.
    -   `get-total-supply(): uint`: Returns the total supply of liquidity pool tokens.
### liquidity-token.clar
This contract defines the liquidity pool token (LP token) and its properties.
-   Path: `clarity/contracts/liquidity-token.clar`
-   Functions:
    -   `mint(amount: uint, recipient: principal)`: Mints new LP tokens.
    -   `burn(amount: uint, sender: principal)`: Burns LP tokens.
    -   `get-balance(account: principal)`: Returns the balance of LP tokens for an account.
    -   `get-total-supply(): uint`: Returns the total supply of liquidity tokens.
### rewards.clar
This contract manages the distribution of rewards to liquidity providers.
-   Path: `clarity/contracts/rewards.clar`
-   Functions:
    -   `distribute-rewards(pool: String, amount: uint)`: Distributes rewards to liquidity providers.
    -   `get-rewards(account: principal, pool: String)`: Returns the rewards earned by an account in a specific pool.
    -   `get-total-rewards(): uint`: Returns the total amount of rewards.

## 5. UI Components
### WalletAddressInput
A component that allows users to input their Stacks wallet address.
-   File: `src/app/page.tsx`
-   State: Manages the wallet address input using `useState`.

### Home (Main Page)
The main page component that integrates all the features of the application.
-   File: `src/app/page.tsx`
-   Features:
    -   Displays token balances using the `TokenBalance` interface.
    -   Allows users to deposit and withdraw tokens using `depositTokens` and `withdrawTokens` functions.
    -   Displays rewards using the `Rewards` interface and `getRewards` function.
    -   Uses ShadCN UI components for a modern and responsive design.

### Icons
-   File: `src/components/icons.ts`
-   Description: This file imports and exports various icons from the `lucide-react` library, providing a centralized location for icon management. It includes icons such as `ArrowRight`, `Check`, `ChevronsUpDown`, `Circle`, and more.

## 6. Styling
The application uses Tailwind CSS and ShadCN UI for styling. The color scheme is defined in `src/app/globals.css` using HSL CSS variables:
-   Primary color: Vibrant blue (#29ABE2)
-   Secondary color: Light grey (#F5F5F5)
-   Accent color: Green (#2ecc71)
## 7. Services
### stacks.ts
-   File: `src/services/stacks.ts`
-   Description: This service file contains functions for interacting with the Stacks blockchain, including fetching token balances, depositing tokens, withdrawing tokens, and retrieving rewards. The functions simulate blockchain API calls for demonstration purposes.
    -   `getTokenBalances(walletAddress: string)`: Retrieves token balances for a given wallet address.
    -   `depositTokens(walletAddress: string, token: string, amount: number, pool: string)`: Deposits tokens into a liquidity pool.
    -   `withdrawTokens(walletAddress: string, token: string, amount: number, pool: string)`: Withdraws tokens from a liquidity pool.
    -   `getRewards(walletAddress: string)`: Retrieves rewards earned for providing liquidity.
