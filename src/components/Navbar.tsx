import React, { useState } from 'react';
import { Wallet, Menu, X } from 'lucide-react';

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
    <nav className="bg-black border-b-2 py-2.5 w-[100%] flex items-center justify-center border-white">
      <div className="w-[90%] mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-6 gap-1.5 flex-shrink-0">
            <div className="w-12 h-12 bg-white border-2 border-white flex items-center justify-center rounded-lg">
              <img 
                src="/adaptic.logo.png" 
                alt="Adaptic Protocol Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white geist-mono uppercase tracking-wider">
                ADAPTIC PROTOCOL
              </h1>
              <span className="text-xs text-white geist-mono uppercase tracking-wider opacity-90">
                AI-POWERED REDEEMABLE NFTS
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center justify-center border gap-1.5 border-white rounded-lg overflow-hidden">
              <button className="px-8 py-3 text-white hover:bg-white hover:text-black transition-all duration-200 border-r border-white geist-mono font-medium uppercase tracking-wider">DASHBOARD</button>
              <button className="px-8 py-3 text-white hover:bg-white hover:text-black transition-all duration-200 border-r border-white geist-mono font-medium uppercase tracking-wider">MARKETPLACE</button>
              <button className="px-8 py-3 text-white hover:bg-white hover:text-black transition-all duration-200 border-r border-white geist-mono font-medium uppercase tracking-wider">PORTFOLIO</button>
              <button className="px-8 py-3 text-white hover:bg-white hover:text-black transition-all duration-200 geist-mono font-medium uppercase tracking-wider">DOCS</button>
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            {isWalletConnected ? (
              <div className="flex items-center space-x-3">
                <div className="bg-white text-black px-4 py-2 border-2 border-white rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm geist-mono font-bold">
                      {formatAddress(walletAddress || '')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onDisconnectWallet}
                  className="px-4 py-2 bg-red-600 text-white border-2 border-red-600 hover:bg-white hover:text-red-600 transition-all duration-200 geist-mono font-medium uppercase tracking-wider rounded"
                >
                  DISCONNECT
                </button>
              </div>
            ) : (
              <button
                onClick={onConnectWallet}
                className="px-4 py-2 bg-white text-black border-2 border-white hover:bg-black hover:text-white transition-all duration-200 geist-mono font-medium uppercase tracking-wider flex items-center space-x-2 rounded"
              >
                <Wallet className="h-4 w-4" />
                <span>CONNECT WALLET</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-white hover:text-black p-2 transition-all duration-200"
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
          <div className="md:hidden py-4 border-t-2 border-white">
            <div className="flex flex-col space-y-2">
              <button className="px-4 py-3 text-left text-white hover:bg-white hover:text-black transition-all duration-200 geist-mono font-medium uppercase tracking-wider border-b border-gray-600">DASHBOARD</button>
              <button className="px-4 py-3 text-left text-white hover:bg-white hover:text-black transition-all duration-200 geist-mono font-medium uppercase tracking-wider border-b border-gray-600">MARKETPLACE</button>
              <button className="px-4 py-3 text-left text-white hover:bg-white hover:text-black transition-all duration-200 geist-mono font-medium uppercase tracking-wider border-b border-gray-600">PORTFOLIO</button>
              <button className="px-4 py-3 text-left text-white hover:bg-white hover:text-black transition-all duration-200 geist-mono font-medium uppercase tracking-wider">DOCS</button>
              
              {/* Mobile Wallet Connection */}
              <div className="pt-4 border-t-2 border-white mt-4">
                {isWalletConnected ? (
                  <div className="space-y-3">
                    <div className="bg-white text-black px-4 py-3 border-2 border-white rounded">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm geist-mono font-bold">
                          {formatAddress(walletAddress || '')}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={onDisconnectWallet}
                      className="w-full px-4 py-3 bg-red-600 text-white border-2 border-red-600 hover:bg-white hover:text-red-600 transition-all duration-200 geist-mono font-medium uppercase tracking-wider rounded"
                    >
                      DISCONNECT WALLET
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={onConnectWallet}
                    className="w-full px-4 py-3 bg-white text-black border-2 border-white hover:bg-black hover:text-white transition-all duration-200 geist-mono font-medium uppercase tracking-wider flex items-center justify-center space-x-2 rounded"
                  >
                    <Wallet className="h-4 w-4" />
                    <span>CONNECT WALLET</span>
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
