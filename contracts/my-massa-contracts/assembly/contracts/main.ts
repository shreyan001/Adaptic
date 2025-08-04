import { Storage, Context } from "@massalabs/massa-as-sdk";

// Keys encoding schemes for ticket data
function redeemedKey(id: string): string { return "redeemed_" + id; }
function expiryKey(id: string): string { return "expiry_" + id; }

// Mint ticket with expiry
export function mintTicket(to: Address, tokenId: string, eventTimestamp: u64): void {
    // mint NFT logic from standards
    Storage.set(expiryKey(tokenId), eventTimestamp.toString());
    Storage.set(redeemedKey(tokenId), "false");
}

// Redeem ticket
export function redeem(tokenId: string): void {
    let owner = getNFTOwner(tokenId); // pseudocode, use NFT standard
    assert(owner == Context.sender, "Only ticket owner can redeem");
    let expiry = U64.parseInt(Storage.get(expiryKey(tokenId)));
    assert(Context.timestamp < expiry, "Ticket expired");
    Storage.set(redeemedKey(tokenId), "true");
}

// Check status
export function status(tokenId: string): string {
    let expiry = U64.parseInt(Storage.get(expiryKey(tokenId)));
    if (Storage.get(redeemedKey(tokenId)) == "true") return "redeemed";
    if (Context.timestamp > expiry) return "expired";
    return "valid";
}
