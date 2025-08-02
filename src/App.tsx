import { useState } from "react";
import { NFTChatInterface } from "./components/NFTChatInterface";
import { Navbar } from "./components/Navbar";
import ProjectShowcase from "./components/ProjectShowcase";
import { useWallet } from "./hooks/useWallet";
import { MessageSquare, Info } from "lucide-react";
import "./App.css";

function App() {
  const [activeView, setActiveView] = useState<"chat" | "overview">("overview");

  const {
    isConnected: isWalletConnected,
    address: walletAddress,
    connect: handleConnectWallet,
    disconnect: handleDisconnectWallet,
    isLoading: walletLoading,
    error: walletError,
  } = useWallet();

  if (walletLoading) {
    return (
      <div className="min-h-screen bg-black geist-mono flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4" />
          <p className="text-white font-bold">CONNECTING WALLET...</p>
        </div>
      </div>
    );
  }

  if (walletError) {
    return (
      <div className="min-h-screen bg-black geist-mono flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-900 border-2 border-red-500 p-4 mb-4">
            <p className="text-red-300 font-bold mb-2">WALLET ERROR</p>
            <p className="text-red-400 text-sm">{walletError}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-white text-black border-2 border-white hover:bg-black hover:text-white transition geist-mono font-medium uppercase tracking-wider"
          >
            RETRY
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app h-max bg-black">
      <Navbar
        isWalletConnected={isWalletConnected}
        walletAddress={walletAddress || undefined}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
      />

      <main className="main-content w-100vw flex justify-center items-center">
        {/* View Toggle */}
        <div className="border-b-2 border-white bg-black w-full">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="flex items-center justify-between h-16 w-full">
              {/* View Switcher */}
              <div className="flex items-center border-2 border-white overflow-hidden">
                <button
                  onClick={() => setActiveView("chat")}
                  className={`px-6 py-3 geist-mono font-bold text-sm uppercase tracking-wider transition border-r border-white ${activeView === "chat" ? "bg-white text-black" : "bg-black text-white hover:bg-white hover:text-black"
                    }`}
                >
                  <MessageSquare className="h-4 w-4 mr-2 inline" />
                  AI CHAT INTERFACE
                </button>
                <button
                  onClick={() => setActiveView("overview")}
                  className={`px-6 py-3 geist-mono font-bold text-sm uppercase tracking-wider transition ${activeView === "overview" ? "bg-white text-black" : "bg-black text-white hover:bg-white hover:text-black"
                    }`}
                >
                  <Info className="h-4 w-4 mr-2 inline" />
                  PROJECT OVERVIEW
                </button>
              </div>

              {/* Status Indicators */}
              <div className="flex items-center space-x-6 text-xs geist-mono uppercase gap-3 tracking-wider text-white">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full border border-white ${isWalletConnected ? "bg-green-500" : "bg-red-500"
                      }`}
                  />
                  <span className="whitespace-nowrap">
                    WALLET: {isWalletConnected ? "CONNECTED" : "DISCONNECTED"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full border border-white" />
                  <span className="whitespace-nowrap">NETWORK: MASSA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-hidden bg-black">
          {activeView === "chat" ? (
            <NFTChatInterface
              isWalletConnected={isWalletConnected}
              walletAddress={walletAddress || undefined}
              apiBaseUrl="http://localhost:3001"
              apiEndpoint="/api/nft-agent"
            />
          ) : (
            <div className="h-full overflow-y-auto bg-black">
              <ProjectShowcase onLaunchChat={() => setActiveView("chat")} />
            </div>
          )}
        </div>
      </main>

      <footer className="border-t-2 border-white bg-black p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs geist-mono uppercase tracking-wider text-white">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <span>&copy; 2024 ADAPTIC PROTOCOL</span>
            <span>•</span>
            <span>MASSA BLOCKCHAIN</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>LANGGRAPH AI</span>
            <span>•</span>
            <span>AUTONOMOUS SMART CONTRACTS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
