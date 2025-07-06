import { useState, useEffect } from 'react';
import { JsonRPCClient } from "@massalabs/massa-web3";

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  client: JsonRPCClient | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useWallet = (): WalletContextType => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [client, setClient] = useState<JsonRPCClient | null>(null);

  useEffect(() => {
    // Initialize Massa client
    const massaClient = JsonRPCClient.buildnet();
    setClient(massaClient);

    // Check if wallet was previously connected
    const savedAddress = localStorage.getItem('massa_wallet_address');
    if (savedAddress) {
      setAddress(savedAddress);
      setIsConnected(true);
    }
  }, []);

  const connect = async () => {
    try {
      // In a real implementation, this would integrate with Massa Station or another wallet
      // For demo purposes, we'll simulate a wallet connection
      const demoAddress = "AS121byc9dBwjbeREk4rzUZisFyfMkdZ1Uhtcnm6n6s5hnCX6fsHc";
      
      setAddress(demoAddress);
      setIsConnected(true);
      localStorage.setItem('massa_wallet_address', demoAddress);
      
      console.log('Wallet connected:', demoAddress);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    localStorage.removeItem('massa_wallet_address');
    console.log('Wallet disconnected');
  };

  return {
    isConnected,
    address,
    client,
    connect,
    disconnect,
  };
};
