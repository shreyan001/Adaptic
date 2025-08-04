import 'dotenv/config';
import {
  Account,
  Args,
  Mas,
  SmartContract,
  JsonRpcProvider,
} from '@massalabs/massa-web3';
import { getScByteCode } from './utils';

const account = await Account.fromEnv();
const provider = JsonRpcProvider.buildnet(account);

console.log('Deploying NFT Ticket contract...');

const byteCode = getScByteCode('build', 'main.wasm');

// No constructor arguments needed for this contract
const constructorArgs = new Args();

const contract = await SmartContract.deploy(
  provider,
  byteCode,
  constructorArgs,
  { coins: Mas.fromString('0.01') },
);

console.log('NFT Ticket contract deployed at:', contract.address);

console.log('\nDeployment completed successfully!');
console.log('Contract functions available:');
console.log('- mintTicket(to: string, tokenId: string, expiry: u64)');
console.log('- redeem(tokenId: string)');
console.log('- status(tokenId: string)');
console.log('- getOwner(tokenId: string)');
console.log('\nTo interact with the contract, use the other scripts:');
console.log('- npm run status (check ticket status)');
console.log('- npm run redeem (redeem a ticket)');
