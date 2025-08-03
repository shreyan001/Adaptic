import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, FileText, Coins, Trophy, Calendar, Loader2 } from 'lucide-react';
import ProjectShowcase from './ProjectShowcase';
interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  metadata?: {
    nftType?: string;
    actionType?: string;
    contractAddress?: string;
  };
}

interface ChatInterfaceProps {
  isWalletConnected: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ isWalletConnected }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "👋 Welcome to Adaptic Protocol! I'm your AI assistant for creating and managing redeemable NFTs. I can help you create gaming tournament entry NFTs, domain custody tokens, event tickets, and much more. What would you like to build today?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    // Check if backend is available (this would be replaced with actual backend check)
    const isBackendConnected = false; // This should be determined by actual API health check
    
    if (!isBackendConnected) {
      return `🔌 Backend connection failed. Server unavailable or not responding. Check if backend is running and try again.`;
    }
    
    const message = userMessage.toLowerCase();
    
    if (message.includes('tournament') || message.includes('gaming')) {
      return "🎮 Gaming tournament NFT: Entry passes with auto-updating brackets and prize pools. Want automatic bracket management or betting positions?";
    }
    
    if (message.includes('domain')) {
      return "🌐 Domain custody NFT: Auto-track expiry dates, renewal costs, values. Use as DeFi collateral. Which domains to tokenize?";
    }
    
    if (message.includes('ticket') || message.includes('event')) {
      return "🎫 Event ticket NFT: Evolves from basic entry to VIP, includes backstage access, becomes collectible. What event type?";
    }
    
    if (message.includes('help') || message.includes('what')) {
      return "Available NFT types:\n🎮 Gaming Tournament\n🌐 Domain Custody\n🎫 Event Tickets\n💼 Software Licenses\n🏆 Achievements\n📱 Subscriptions\n\nWhich interests you?";
    }
    
    if (message.includes('wallet') && !isWalletConnected) {
      return "Connect your Massa wallet first to create NFTs. Click 'Connect Wallet' in navbar.";
    }
    
    return "What type of redeemable NFT do you want to create? (gaming, domains, tickets, licenses, etc.)";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: simulateAIResponse(inputValue),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLaunchChat = () => {
    // Focus on the input area and scroll to it
    inputRef.current?.focus();
    inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };



  const quickActions = [
    { icon: Trophy, label: "Tournament NFT", action: "Create a gaming tournament with automatic bracket management" },
    { icon: FileText, label: "Domain Custody", action: "Set up domain portfolio management with auto-renewal" },
    { icon: Calendar, label: "Event Tickets", action: "Create evolving event tickets with VIP upgrades" },
    { icon: Coins, label: "Subscription NFT", action: "Tokenize subscription services for trading" },
  ];

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-gray-700 bg-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 icon-container">
              <Bot className="h-5 w-5 icon-container-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">AI Asset Creator</h2>
              <p className="text-sm text-gray-400">Create redeemable NFTs with conversational AI</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Sparkles className="h-4 w-4 animate-pulse-slow icon-container-accent" />
            <span className="text-sm font-medium icon-container-accent">AI Powered</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="px-4 py-2 bg-black border-b border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => setInputValue(action.action)}
                className="quick-action-btn"
              >
                <action.icon className="h-4 w-4 icon-container-accent" />
                <span className="text-xs text-white font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto chat-scroll-area" style={{height: 'calc(100vh - 200px)'}}>
        <div className="p-2">
          {/* Project Showcase - only show initially */}
          {messages.length <= 1 && (
            <div className="mb-4">
              <ProjectShowcase onLaunchChat={handleLaunchChat} />
            </div>
          )}
          
          <div className="space-y-2">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900 border border-gray-200'
                } geist-mono`}>
                  <div className="whitespace-pre-wrap break-words">{message.content}</div>
                  {message.metadata && (
                    <div className="mt-1 text-xs text-gray-600">
                      {message.metadata.nftType && (
                        <span>Type: {message.metadata.nftType}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[75%] px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-900 border border-gray-200 geist-mono">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-px" />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex gap-2 p-3 border-t border-gray-800 w-full bg-white">
        {!isWalletConnected && (
          <div className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-yellow-50 border border-yellow-400 text-yellow-800 text-sm">
            💡 Connect your wallet to create and deploy redeemable NFTs
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe the redeemable NFT you want to create..."
          disabled={isTyping}
          className="flex-1 px-3 py-1.5 border border-gray-300 rounded-none focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed geist-mono text-sm bg-white text-gray-900"
        />
        <div className="relative group">
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="px-4 py-1.5 font-medium text-white rounded-none transition-colors geist-mono border text-sm flex items-center gap-2 bg-blue-600 hover:bg-blue-700 border-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
            {isTyping ? 'AI is typing...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};
