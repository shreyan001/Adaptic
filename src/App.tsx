import { Navbar } from './components/Navbar';
import { ChatInterface } from './components/ChatInterface';
import { useWallet } from './components/WalletProvider';
import './App.css';

/**
 * Main App component for Adaptic Protocol
 * A conversational AI platform for creating redeemable NFTs on Massa blockchain
 */
function App() {
  const { isConnected, address, connect, disconnect } = useWallet();

  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      // In a real app, you'd show a user-friendly error message
    }
  };

  return (
    <div className="min-h-screen bg-massa-dark">
      <Navbar
        isWalletConnected={isConnected}
        walletAddress={address || undefined}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={disconnect}
      />
      <ChatInterface isWalletConnected={isConnected} />
    </div>
  );
}

export default App;



