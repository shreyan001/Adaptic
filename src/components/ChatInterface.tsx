import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, FileText, Coins, Trophy, Calendar } from 'lucide-react';
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
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('tournament') || message.includes('gaming')) {
      return "🎮 Great choice! I can help you create gaming tournament NFTs. These can serve as entry passes that automatically update with bracket progressions and prize pool changes. Would you like to set up a tournament with automatic bracket management, or create betting positions that update with match results?";
    }
    
    if (message.includes('domain')) {
      return "🌐 Domain custody NFTs are perfect for managing your domain portfolio! I can create smart contracts that automatically track expiry dates, renewal costs, and estimated values. Your domains can even be used as collateral for DeFi loans. What domains would you like to tokenize?";
    }
    
    if (message.includes('ticket') || message.includes('event')) {
      return "🎫 Event ticket NFTs that evolve over time! I can create tickets that start as basic entry and upgrade to VIP experiences as events approach. They can include backstage pass eligibility and become collectibles post-event. What type of event are you organizing?";
    }
    
    if (message.includes('help') || message.includes('what')) {
      return "I can help you create various types of redeemable NFTs:\n\n🎮 Gaming Tournament NFTs - Entry passes + betting positions\n🌐 Domain Custody NFTs - Automated domain management\n🎫 Event Ticket NFTs - Evolving event experiences\n💼 Software License NFTs - Transferable licenses\n🏆 Achievement NFTs - Cross-platform gaming rewards\n📱 Subscription NFTs - Transferable service access\n\nWhich interests you most?";
    }
    
    if (message.includes('wallet') && !isWalletConnected) {
      return "To create and manage NFTs, you'll need to connect your Massa wallet first. Please click the 'Connect Wallet' button in the navbar to get started!";
    }
    
    return "I understand you're interested in creating redeemable NFTs! Could you tell me more about what type of asset you'd like to tokenize? I can help with gaming assets, domains, event tickets, software licenses, and many other redeemable items.";
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

  const getMessageIcon = (type: string) => {
    return type === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />;
  };

  const quickActions = [
    { icon: Trophy, label: "Tournament NFT", action: "Create a gaming tournament with automatic bracket management" },
    { icon: FileText, label: "Domain Custody", action: "Set up domain portfolio management with auto-renewal" },
    { icon: Calendar, label: "Event Tickets", action: "Create evolving event tickets with VIP upgrades" },
    { icon: Coins, label: "Subscription NFT", action: "Tokenize subscription services for trading" },
  ];

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 4rem)', backgroundColor: 'var(--background-color)' }}>
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-gray-700 bg-surface">
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
        <div className="px-6 py-4 bg-surface border-b border-gray-700">
          <p className="text-sm text-gray-400 mb-3">Quick start with popular NFT types:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => setInputValue(action.action)}
                className="quick-action-btn"
              >
                <action.icon className="h-5 w-5 icon-container-accent" />
                <span className="text-xs text-white font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {/* Project Showcase - only show initially */}
        {messages.length <= 1 && (
          <ProjectShowcase onLaunchChat={handleLaunchChat} />
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-2xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`p-2 icon-container ${message.type === 'user' ? 'bg-accent' : 'bg-surface'}`}>
                {getMessageIcon(message.type)}
              </div>
              <div className={`chat-message ${message.type}`}>
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3 max-w-2xl">
              <div className="p-2 icon-container bg-surface">
                <Bot className="h-5 w-5" />
              </div>
              <div className="chat-message ai">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-surface border-t border-gray-700 px-6 py-4">
        {!isWalletConnected && (
          <div className="mb-4 p-3 status-warning">
            <p className="text-yellow-400 text-sm">
              💡 Connect your wallet to create and deploy redeemable NFTs
            </p>
          </div>
        )}
        
        <div className="flex space-x-3">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe the redeemable NFT you want to create..."
              rows={3}
              className="adaptic-textarea w-full"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="btn-primary px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 self-end"
          >
            <Send className="h-4 w-4" />
            <span>Send</span>
          </button>
        </div>
        
        <div className="mt-3 text-xs text-gray-500 text-center">
          Try: "Create a tournament NFT for a chess competition" or "Help me tokenize my domain portfolio"
        </div>
      </div>
    </div>
  );
};
