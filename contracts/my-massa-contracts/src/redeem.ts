import {
  Account,
  Args,
  SmartContract,
  JsonRpcProvider,
  bytesToStr,
} from '@massalabs/massa-web3';
import 'dotenv/config';

// Paste the address of the deployed contract here
const CONTRACT_ADDR = 'AS12N5DvTVwvaLbaniMgDJqKwJ3uXBGwzzGuB1f6fjeSx3nhhahTE';

const account = await Account.fromEnv();
const provider = JsonRpcProvider.buildnet(account);

const ticketContract = new SmartContract(provider, CONTRACT_ADDR);

// Example: Redeem a ticket
const tokenId = 'TICKET_001';
const redeemArgs = new Args().addString(tokenId);

try {
  // Check status before redemption
  const statusArgs = new Args().addString(tokenId);
  const statusResult = await ticketContract.read('status', statusArgs);
  const status = bytesToStr(statusResult.value);
  console.log(`Ticket ${tokenId} status before redemption: ${status}`);
  
  if (status === 'valid') {
    // Redeem the ticket
    console.log(`\nRedeeming ticket ${tokenId}...`);
    const redeemResult = await ticketContract.call('redeem', redeemArgs);
    console.log('Redeem transaction:', redeemResult.id);
    
    // Check status after redemption
    const newStatusResult = await ticketContract.read('status', statusArgs);
    const newStatus = bytesToStr(newStatusResult.value);
    console.log(`Ticket ${tokenId} status after redemption: ${newStatus}`);
    
    // Get events
    const events = await provider.getEvents({
      smartContractAddress: CONTRACT_ADDR,
    });
    
    console.log('\nRecent events:');
    for (const event of events.slice(-3)) { // Show last 3 events
      console.log('Event message:', event.data);
    }
  } else {
    console.log(`Cannot redeem ticket. Current status: ${status}`);
  }
  
} catch (error) {
  console.error('Error redeeming ticket:', error);
}