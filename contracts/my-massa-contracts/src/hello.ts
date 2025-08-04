import {
  bytesToStr,
  SmartContract,
  JsonRpcProvider,
  Args,
} from '@massalabs/massa-web3';
import 'dotenv/config';

// Paste the address of the deployed contract here
const CONTRACT_ADDR = 'AS12N5DvTVwvaLbaniMgDJqKwJ3uXBGwzzGuB1f6fjeSx3nhhahTE';

// Here we only use the read method of the contract so we don't need an account
// provider will be a JsonRpcPublicProvider instance
const provider = JsonRpcProvider.buildnet();

const ticketContract = new SmartContract(provider, CONTRACT_ADDR);

// Example: Check status of a ticket
const tokenId = 'TICKET_001';
const statusArgs = new Args().addString(tokenId);

try {
  const statusResult = await ticketContract.read('status', statusArgs);
  const status = bytesToStr(statusResult.value);
  console.log(`Ticket ${tokenId} status: ${status}`);
  
  // Get ticket owner
  const ownerResult = await ticketContract.read('getOwner', statusArgs);
  const owner = bytesToStr(ownerResult.value);
  console.log(`Ticket ${tokenId} owner: ${owner || 'No owner found'}`);
  
} catch (error) {
  console.error('Error reading from contract:', error);
}
