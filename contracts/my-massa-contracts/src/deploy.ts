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

// Test minting a ticket
console.log('\nMinting a test ticket...');
const mintArgs = new Args()
  .addString(account.address!.toString()) // to address
  .addString('TICKET_001') // tokenId
  .addU64(BigInt(Date.now() + 86400000)); // expiry (24 hours from now)

const mintResult = await contract.call('mintTicket', mintArgs);
console.log('Mint transaction:', mintResult.id);

// Check ticket status
console.log('\nChecking ticket status...');
const statusArgs = new Args().addString('TICKET_001');
const statusResult = await contract.read('status', statusArgs);
console.log('Ticket status:', new TextDecoder().decode(statusResult.value));

// Get deployment events
const events = await provider.getEvents({
  smartContractAddress: contract.address,
});

for (const event of events) {
  console.log('Event message:', event.data);
}
