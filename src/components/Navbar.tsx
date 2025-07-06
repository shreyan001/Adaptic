import React, { useState } from 'react';
import { Wallet, Menu, X, Bot, Sparkles } from 'lucide-react';
import { MassaLogo } from '@massalabs/react-ui-kit';

interface NavbarProps {
  isWalletConnected: boolean;
  walletAddress?: string;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isWalletConnected,
  walletAddress,
  onConnectWallet,
  onDisconnectWallet,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="bg-massa-gray border-b border-gray-700 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <MassaLogo className="h-8 w-8" />
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-white">Adaptic Protocol</h1>
              <div className="flex items-center space-x-1 px-2 py-1 bg-massa-purple/20 rounded-full">
                <Bot className="h-4 w-4 text-massa-purple" />
                <Sparkles className="h-3 w-3 text-massa-purple animate-pulse-slow" />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#dashboard" className="text-gray-300 hover:text-white transition-colors">
              Dashboard
            </a>
            <a href="#marketplace" className="text-gray-300 hover:text-white transition-colors">
              Marketplace
            </a>
            <a href="#portfolio" className="text-gray-300 hover:text-white transition-colors">
              Portfolio
            </a>
            <a href="#docs" className="text-gray-300 hover:text-white transition-colors">
              Docs
            </a>

            {/* Wallet Connection */}
            <div className="flex items-center space-x-4">
              {isWalletConnected ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400 font-mono">
                      {formatAddress(walletAddress || '')}
                    </span>
                  </div>
                  <button
                    onClick={onDisconnectWallet}
                    className="btn-secondary text-sm"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={onConnectWallet}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Connect Wallet</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              <a href="#dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </a>
              <a href="#marketplace" className="text-gray-300 hover:text-white transition-colors">
                Marketplace
              </a>
              <a href="#portfolio" className="text-gray-300 hover:text-white transition-colors">
                Portfolio
              </a>
              <a href="#docs" className="text-gray-300 hover:text-white transition-colors">
                Docs
              </a>
              
              {/* Mobile Wallet Connection */}
              <div className="pt-4 border-t border-gray-700">
                {isWalletConnected ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 px-3 py-2 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-400 font-mono">
                        {formatAddress(walletAddress || '')}
                      </span>
                    </div>
                    <button
                      onClick={onDisconnectWallet}
                      className="btn-secondary w-full"
                    >
                      Disconnect Wallet
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={onConnectWallet}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <Wallet className="h-4 w-4" />
                    <span>Connect Wallet</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
