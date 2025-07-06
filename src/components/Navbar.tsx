import React, { useState } from 'react';
import { Wallet, Menu, X, Bot, Sparkles } from 'lucide-react';
import { Button } from '@massalabs/react-ui-kit';

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
    <nav className="border-b border-gray-700" style={{ backgroundColor: 'var(--surface-color)' }}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <img 
              src="/adaptic.logo.png" 
              alt="Adaptic Protocol" 
              className="adaptic-logo"
            />
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-white">Adaptic Protocol</h1>
              <div className="flex items-center space-x-1 px-2 py-1 icon-container">
                <Bot className="h-4 w-4 icon-container-accent" />
                <Sparkles className="h-3 w-3 animate-pulse-slow icon-container-accent" />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#dashboard" className="text-gray-300 hover:text-white transition-colors text-sm">
              Dashboard
            </a>
            <a href="#marketplace" className="text-gray-300 hover:text-white transition-colors text-sm">
              Marketplace
            </a>
            <a href="#portfolio" className="text-gray-300 hover:text-white transition-colors text-sm">
              Portfolio
            </a>
            <a href="#docs" className="text-gray-300 hover:text-white transition-colors text-sm">
              Docs
            </a>

            {/* Wallet Connection */}
            <div className="flex items-center space-x-3">
              {isWalletConnected ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 status-connected">
                    <div className="h-2 w-2 animate-pulse" style={{ backgroundColor: 'var(--success-color)' }}></div>
                    <span className="text-sm font-mono text-green-400">
                      {formatAddress(walletAddress || '')}
                    </span>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={onDisconnectWallet}
                    className="btn-compact"
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  onClick={onConnectWallet}
                  className="flex items-center space-x-2"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Connect Wallet</span>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              <a href="#dashboard" className="text-gray-300 hover:text-white transition-colors text-sm">
                Dashboard
              </a>
              <a href="#marketplace" className="text-gray-300 hover:text-white transition-colors text-sm">
                Marketplace
              </a>
              <a href="#portfolio" className="text-gray-300 hover:text-white transition-colors text-sm">
                Portfolio
              </a>
              <a href="#docs" className="text-gray-300 hover:text-white transition-colors text-sm">
                Docs
              </a>
              
              {/* Mobile Wallet Connection */}
              <div className="pt-4 border-t border-gray-700">
                {isWalletConnected ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 px-3 py-2 status-connected">
                      <div className="h-2 w-2 animate-pulse" style={{ backgroundColor: 'var(--success-color)' }}></div>
                      <span className="text-sm font-mono text-green-400">
                        {formatAddress(walletAddress || '')}
                      </span>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={onDisconnectWallet}
                      className="w-full"
                    >
                      Disconnect Wallet
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    onClick={onConnectWallet}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <Wallet className="h-4 w-4" />
                    <span>Connect Wallet</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
