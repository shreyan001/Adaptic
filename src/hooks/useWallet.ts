import { useState, useCallback } from 'react';
import { getWallets, WalletName } from '@massalabs/wallet-provider';
import { Provider, SignedData } from '@massalabs/massa-web3';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  provider: Provider | null;
  isLoading: boolean;
  error: string | null;
}

interface UseWalletReturn extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  getBalance: () => Promise<bigint | null>;
  signMessage: (message: Uint8Array | string) => Promise<SignedData | null>;
}

export const useWallet = (): UseWalletReturn => {
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    address: null,
    provider: null,
    isLoading: false,
    error: null,
  });

  // No auto-connect - user must manually connect

  const connect = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const wallets = await getWallets();
      if (wallets.length === 0) {
        throw new Error('No Massa wallet found. Please install MassaStation or a compatible wallet.');
      }

      // Support both MassaWallet and Bearby wallet
      const wallet = wallets.find(
        (w) => w.name() === WalletName.MassaWallet || w.name() === WalletName.Bearby
      );
      
      if (!wallet) {
        throw new Error('No compatible wallet found. Please install MassaStation or Bearby wallet.');
      }
      
      // Try to get existing accounts first
      const accounts = await wallet.accounts();
      
      // If no accounts, this might trigger wallet connection UI
      if (accounts.length === 0) {
        console.log('No accounts found. Please connect your wallet manually.');
        throw new Error('No accounts available. Please connect your wallet.');
      }

      const provider = accounts[0]; // Use first account as provider
      
      setState(prev => ({
        ...prev,
        isConnected: true,
        address: provider.address,
        provider,
        isLoading: false,
      }));
      
      console.log('Wallet connected successfully:', provider.address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
      }));
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Clear the connection state
      setState({
        isConnected: false,
        address: null,
        provider: null,
        isLoading: false,
        error: null,
      });
      
      console.log('Wallet disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to disconnect wallet',
      }));
    }
  }, []);

  const getBalance = useCallback(async (): Promise<bigint | null> => {
    if (!state.provider) {
      console.warn('No provider connected');
      return null;
    }

    try {
      const balance = await state.provider.balance(true); // true for final balance
      return balance;
    } catch (error) {
      console.error('Error getting balance:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to get balance',
      }));
      return null;
    }
  }, [state.provider]);

  const signMessage = useCallback(async (message: Uint8Array | string): Promise<SignedData | null> => {
    if (!state.provider) {
      console.warn('No provider connected');
      return null;
    }

    try {
      const signature = await state.provider.sign(message);
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to sign message',
      }));
      return null;
    }
  }, [state.provider]);

  return {
    ...state,
    connect,
    disconnect,
    getBalance,
    signMessage,
  };
};