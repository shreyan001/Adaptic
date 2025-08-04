# NFT Ticket Smart Contract

This project implements an NFT ticket system with expiry and redemption functionality on the Massa blockchain. The contract allows minting tickets with expiration dates, redeeming them before expiry, and checking their status.

## Contract Features

- **Mint Tickets**: Create NFT tickets with custom expiry dates
- **Redeem Tickets**: Redeem tickets (only by owner before expiry)
- **Status Check**: Check if tickets are redeemed or expired
- **Owner Verification**: Get the owner of any ticket
- **Event Generation**: Emits events for minting and redemption actions

## Deployed Contract

**Buildnet Address**: `AS1vNYMbqQxXUXiZFwkAYKU9a3t7NUoQr4uYWHnPNnxWX4wWYXmm`

### Available Functions

- `mintTicket(to: string, tokenId: string, expiry: u64)` - Create new NFT tickets
- `redeem(tokenId: string)` - Redeem tickets (owner only, before expiry)
- `status(tokenId: string)` - Check redemption and expiry status
- `getOwner(tokenId: string)` - Get ticket owner address

## Build

By default this will build all files in `assembly/contracts` directory.

```shell
npm run build
```

## Deploy a smart contract

Prerequisites:

- You must add a `.env` file at the root of the repository with the following keys:
  - `PRIVATE_KEY='your_private_key_here'`
  - `NETWORK_URL=https://buildnet.massa.net/api/v2` (for buildnet)
  - `CHAIN_ID=77658366` (for buildnet)

The following command will build and deploy the NFT ticket contract:

```shell
npm run deploy
```

## Interact with the Contract

After deployment, you can interact with the contract using these scripts:

### Check Ticket Status
```shell
npm run status
```

### Redeem a Ticket
```shell
npm run redeem
```

### Example Usage

1. **Mint a ticket**: Call `mintTicket` with recipient address, token ID, and expiry timestamp
2. **Check status**: Use `status` to see if ticket is redeemed or expired
3. **Redeem ticket**: Owner can call `redeem` before expiry
4. **Verify ownership**: Use `getOwner` to check ticket ownership

For more information, please visit our ReadTheDocs about
[Massa smart-contract development](https://docs.massa.net/en/latest/web3-dev/smart-contracts.html).

## Unit tests

The test framework documentation is available here: [as-pect docs](https://as-pect.gitbook.io/as-pect)

```shell
npm run test
```

## Format code

```shell
npm run fmt
```
