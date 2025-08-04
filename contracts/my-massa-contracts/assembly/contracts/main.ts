import { Storage, Context, generateEvent } from '@massalabs/massa-as-sdk';
import { Args, stringToBytes } from '@massalabs/as-types';

// Keys for ticket data storage
function ownerKey(tokenId: string): string { return "owner_" + tokenId; }
function redeemedKey(tokenId: string): string { return "redeemed_" + tokenId; }
function expiryKey(tokenId: string): string { return "expiry_" + tokenId; }

// Mint ticket with expiry
export function mintTicket(binaryArgs: StaticArray<u8>): void {
    const argsDeser = new Args(binaryArgs);
    const to = argsDeser.nextString().expect('to address is missing');
    const tokenId = argsDeser.nextString().expect('tokenId is missing');
    const eventTimestamp = argsDeser.nextU64().expect('eventTimestamp is missing');
    
    // Store ticket data
    Storage.set(ownerKey(tokenId), to);
    Storage.set(expiryKey(tokenId), eventTimestamp.toString());
    Storage.set(redeemedKey(tokenId), "false");
    
    generateEvent(`Ticket ${tokenId} minted for ${to} with expiry ${eventTimestamp.toString()}`);
}

// Redeem ticket
export function redeem(binaryArgs: StaticArray<u8>): void {
    const argsDeser = new Args(binaryArgs);
    const tokenId = argsDeser.nextString().expect('tokenId is missing');
    
    // Check if ticket exists
    assert(Storage.has(ownerKey(tokenId)), "Ticket does not exist");
    
    // Check ownership
    const owner = Storage.get(ownerKey(tokenId));
    assert(owner == Context.caller().toString(), "Only ticket owner can redeem");
    
    // Check if already redeemed
    assert(Storage.get(redeemedKey(tokenId)) == "false", "Ticket already redeemed");
    
    // Check expiry
    const expiry = U64.parseInt(Storage.get(expiryKey(tokenId)));
    assert(Context.timestamp() < expiry, "Ticket expired");
    
    // Mark as redeemed
    Storage.set(redeemedKey(tokenId), "true");
    
    generateEvent(`Ticket ${tokenId} redeemed by ${owner}`);
}

// Check status
export function status(binaryArgs: StaticArray<u8>): StaticArray<u8> {
    const argsDeser = new Args(binaryArgs);
    const tokenId = argsDeser.nextString().expect('tokenId is missing');
    
    if (!Storage.has(ownerKey(tokenId))) {
        return stringToBytes("not_found");
    }
    
    const expiry = U64.parseInt(Storage.get(expiryKey(tokenId)));
    if (Storage.get(redeemedKey(tokenId)) == "true") {
        return stringToBytes("redeemed");
    }
    if (Context.timestamp() > expiry) {
        return stringToBytes("expired");
    }
    return stringToBytes("valid");
}

// Get ticket owner
export function getOwner(binaryArgs: StaticArray<u8>): StaticArray<u8> {
    const argsDeser = new Args(binaryArgs);
    const tokenId = argsDeser.nextString().expect('tokenId is missing');
    
    if (!Storage.has(ownerKey(tokenId))) {
        return stringToBytes("");
    }
    
    return stringToBytes(Storage.get(ownerKey(tokenId)));
}
