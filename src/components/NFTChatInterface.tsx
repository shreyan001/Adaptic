import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Bot, User, Code, Loader2, Sparkles } from 'lucide-react';
import QuickActions from './QuickActions';

// NFT Contract Object interface for the black & white design system
interface NFTContractObject {
  id: string;
  type: 'ticketing' | 'gaming' | 'domain' | 'event' | 'financial';
  name: string;
  description: string;
  contractCode?: string;
  deploymentAddress?: string;
  metadata: {
    totalSupply: number;
    mintPrice: string;
    redeemableConditions: string[];
    autonomousFeatures: string[];
  };
  status: 'draft' | 'ready' | 'deployed';
}

// Message interface
interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  nftContract?: NFTContractObject;
}

// Props interface
interface NFTChatInterfaceProps {
  isWalletConnected: boolean;
  walletAddress?: string;
  apiBaseUrl: string;
  apiEndpoint: string;
  ContractPreviewComponent?: React.ComponentType<{ contract: NFTContractObject }>;
  ScrollAreaComponent?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
}

// Default Contract Preview Component
const DefaultContractPreview: React.FC<{ contract: NFTContractObject }> = ({ contract }) => (
  <div className="card mt-4">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold geist-mono uppercase tracking-wider">
        {contract.name}
      </h3>
      <div className="flex items-center space-x-2">
        <Code className="h-4 w-4" />
        <span className="text-sm geist-mono uppercase tracking-wider">
          {contract.type}
        </span>
      </div>
    </div>
    
    <p className="text-base geist-mono mb-4">{contract.description}</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <span className="label">TOTAL SUPPLY</span>
        <p className="text-base geist-mono">{contract.metadata.totalSupply}</p>
      </div>
      <div>
        <span className="label">MINT PRICE</span>
        <p className="text-base geist-mono">{contract.metadata.mintPrice}</p>
      </div>
    </div>
    
    <div className="mb-4">
      <span className="label">REDEEMABLE CONDITIONS</span>
      <ul className="list-none space-y-1">
        {contract.metadata.redeemableConditions.map((condition, index) => (
          <li key={index} className="text-sm geist-mono flex items-center">
            <span className="w-2 h-2 bg-black mr-2"></span>
            {condition}
          </li>
        ))}
      </ul>
    </div>
    
    <div className="mb-4">
      <span className="label">AUTONOMOUS FEATURES</span>
      <ul className="list-none space-y-1">
        {contract.metadata.autonomousFeatures.map((feature, index) => (
          <li key={index} className="text-sm geist-mono flex items-center">
            <span className="w-2 h-2 bg-black mr-2"></span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
    
    {contract.status === 'ready' && (
      <button className="btn-primary geist-mono w-full">
        DEPLOY TO MASSA BLOCKCHAIN
      </button>
    )}
    
    {contract.status === 'deployed' && contract.deploymentAddress && (
      <div className="bg-black text-white p-4 border-2 border-black">
        <span className="label text-white">DEPLOYED AT</span>
        <p className="text-sm geist-mono break-all">{contract.deploymentAddress}</p>
      </div>
    )}
  </div>
);

// Default Scroll Area Component
const DefaultScrollArea: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`overflow-y-auto custom-scrollbar ${className}`}>
    {children}
  </div>
);

// AI Message Component
const AIMessage: React.FC<{ content: string; nftContract?: NFTContractObject; ContractPreviewComponent: React.ComponentType<{ contract: NFTContractObject }> }> = ({ 
  content, 
  nftContract, 
  ContractPreviewComponent 
}) => (
  <div className="flex items-start space-x-4 mb-6">
    <div className="w-8 h-8 bg-black text-white border-2 border-black flex items-center justify-center flex-shrink-0">
      <Bot className="h-4 w-4" />
    </div>
    <div className="flex-1 max-w-3xl">
      <div className="chat-message ai">
        <div className="geist-mono text-sm leading-relaxed">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
            h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 geist-mono uppercase tracking-wider">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-bold mb-3 geist-mono uppercase tracking-wider">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-bold mb-2 geist-mono uppercase tracking-wider">{children}</h3>,
            p: ({ children }) => <p className="mb-3 geist-mono">{children}</p>,
            ul: ({ children }) => <ul className="list-none mb-3 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-none mb-3 space-y-1">{children}</ol>,
            li: ({ children }) => (
              <li className="flex items-start geist-mono">
                <span className="w-2 h-2 bg-black mr-2 mt-2 flex-shrink-0"></span>
                <span>{children}</span>
              </li>
            ),
            code: ({ children }) => (
              <code className="bg-black text-white px-2 py-1 text-xs geist-mono border-2 border-black">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-black text-white p-4 border-2 border-black overflow-x-auto mb-3">
                <code className="geist-mono text-sm">{children}</code>
              </pre>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-black pl-4 mb-3 geist-mono italic">
                {children}
              </blockquote>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
        </div>
      </div>
      {nftContract && <ContractPreviewComponent contract={nftContract} />}
    </div>
  </div>
);

// Human Message Component
const HumanMessage: React.FC<{ content: string }> = ({ content }) => (
  <div className="flex items-start space-x-4 mb-6 justify-end">
    <div className="flex-1 max-w-3xl">
      <div className="chat-message user">
        <p className="geist-mono text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
    <div className="w-8 h-8 bg-white text-black border-2 border-black flex items-center justify-center flex-shrink-0">
      <User className="h-4 w-4" />
    </div>
  </div>
);

// Typing Indicator Component
const TypingIndicator: React.FC = () => (
  <div className="flex items-start space-x-4 mb-6">
    <div className="w-8 h-8 bg-black text-white border-2 border-black flex items-center justify-center flex-shrink-0">
      <Bot className="h-4 w-4" />
    </div>
    <div className="flex-1 max-w-3xl">
      <div className="chat-message ai">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="geist-mono text-sm uppercase tracking-wider">AI PROCESSING...</span>
        </div>
      </div>
    </div>
  </div>
);

// AI Response Generator Function
const generateAIResponse = (userInput: string): Message => {
  const input = userInput.toLowerCase();
  let content = '';
  let nftContract: NFTContractObject | undefined;

  // Analyze user input and generate appropriate response
  if (input.includes('ticket') || input.includes('event') || input.includes('concert')) {
    content = `# TICKETING NFT ANALYSIS

I'll help you create an **EVENT TICKETING NFT** system with autonomous features.

## PROPOSED ARCHITECTURE:

- **NFT TYPE**: Event Ticket with Post-Event Transformation
- **AUTONOMOUS FEATURES**: Time-based metadata updates, location verification
- **REDEEMABLE CONDITIONS**: Event attendance, time expiry, venue check-in

## SMART CONTRACT FEATURES:

\`\`\`assemblyscript
// Autonomous ticket validation
function validateTicket(ticketId: u64, location: string, timestamp: u64): bool {
  // Auto-verify event attendance and transform NFT
}
\`\`\`

## NEXT STEPS:

1. **EVENT DETAILS**: What's the event name, date, and venue?
2. **TRANSFORMATION RULES**: How should the ticket change after the event?
3. **UTILITY FEATURES**: Any special perks for attendees?

*Ready to generate the complete smart contract code?*`;
    
    nftContract = {
      id: Date.now().toString(),
      type: 'ticketing',
      name: 'EVENT TICKET NFT',
      description: 'Autonomous event ticket that transforms into collectible',
      metadata: {
        totalSupply: 1000,
        mintPrice: '10 MAS',
        redeemableConditions: ['Event attendance verification', 'Time-based expiry', 'Location check-in'],
        autonomousFeatures: ['Auto-transformation post-event', 'Attendance tracking', 'Collectible metadata update']
      },
      status: 'draft'
    };
  } else if (input.includes('game') || input.includes('gaming') || input.includes('sword') || input.includes('weapon')) {
    content = `# GAMING NFT ANALYSIS

I'll design a **GAMING ASSET NFT** with performance-based evolution.

## PROPOSED SYSTEM:

- **NFT TYPE**: Evolving Gaming Item
- **AUTONOMOUS FEATURES**: Performance tracking, stat upgrades, rarity adjustments
- **REDEEMABLE CONDITIONS**: Battle victories, experience points, achievement unlocks

## SMART CONTRACT LOGIC:

\`\`\`assemblyscript
// Auto-upgrade based on performance
function upgradeWeapon(weaponId: u64, victories: u32): void {
  // Autonomous stat enhancement based on battle data
}
\`\`\`

## EVOLUTION MECHANICS:

- **LEVEL 1**: Basic weapon stats
- **LEVEL 5**: Enhanced damage (+25%)
- **LEVEL 10**: Special abilities unlock
- **LEGENDARY**: Rare transformation at 100 victories

*Want me to generate the complete gaming contract with stat mechanics?*`;
    
    nftContract = {
      id: Date.now().toString(),
      type: 'gaming',
      name: 'EVOLVING GAMING SWORD',
      description: 'Gaming weapon that levels up through battles',
      metadata: {
        totalSupply: 5000,
        mintPrice: '25 MAS',
        redeemableConditions: ['Battle victories', 'Experience thresholds', 'Achievement unlocks'],
        autonomousFeatures: ['Auto-stat upgrades', 'Performance tracking', 'Rarity evolution']
      },
      status: 'draft'
    };
  } else if (input.includes('domain') || input.includes('web3') || input.includes('trading')) {
    content = `# DOMAIN NFT ANALYSIS

I'll create a **WEB3 DOMAIN NFT** with autonomous trading capabilities.

## PROPOSED FEATURES:

- **NFT TYPE**: Self-Trading Domain Portfolio
- **AUTONOMOUS FEATURES**: Market analysis, automated listing, price optimization
- **REDEEMABLE CONDITIONS**: Market conditions, profit thresholds, demand metrics

## TRADING ALGORITHM:

\`\`\`assemblyscript
// Autonomous domain trading logic
function evaluateMarket(domainId: u64, marketData: MarketInfo): void {
  // Auto-list domain when profitable conditions are met
}
\`\`\`

## REVENUE OPTIMIZATION:

- **MARKET MONITORING**: Real-time domain value tracking
- **AUTO-LISTING**: Intelligent pricing based on demand
- **PROFIT SHARING**: Revenue distribution to holders

*Ready to implement the autonomous trading smart contract?*`;
    
    nftContract = {
      id: Date.now().toString(),
      type: 'domain',
      name: 'AUTONOMOUS DOMAIN TRADER',
      description: 'Web3 domain with automated trading logic',
      metadata: {
        totalSupply: 100,
        mintPrice: '100 MAS',
        redeemableConditions: ['Market profit thresholds', 'Demand indicators', 'Time-based triggers'],
        autonomousFeatures: ['Auto-trading algorithm', 'Market analysis', 'Revenue optimization']
      },
      status: 'draft'
    };
  } else if (input.includes('defi') || input.includes('financial') || input.includes('yield') || input.includes('staking')) {
    content = `# FINANCIAL NFT ANALYSIS

I'll build a **DEFI-INTEGRATED NFT** with autonomous yield generation.

## PROPOSED STRUCTURE:

- **NFT TYPE**: Yield-Generating Financial Instrument
- **AUTONOMOUS FEATURES**: Auto-staking, yield compounding, risk management
- **REDEEMABLE CONDITIONS**: Yield thresholds, time locks, performance metrics

## DEFI INTEGRATION:

\`\`\`assemblyscript
// Autonomous yield farming
function optimizeYield(nftId: u64, protocols: Protocol[]): void {
  // Auto-allocate funds to highest-yield opportunities
}
\`\`\`

## YIELD STRATEGIES:

- **AUTO-STAKING**: Automatic delegation to validators
- **YIELD FARMING**: Multi-protocol optimization
- **RISK MANAGEMENT**: Automated rebalancing

*Want me to generate the complete DeFi smart contract?*`;
    
    nftContract = {
      id: Date.now().toString(),
      type: 'financial',
      name: 'DEFI YIELD NFT',
      description: 'Autonomous yield-generating financial instrument',
      metadata: {
        totalSupply: 500,
        mintPrice: '200 MAS',
        redeemableConditions: ['Yield performance targets', 'Time-based unlocks', 'Risk thresholds'],
        autonomousFeatures: ['Auto-yield optimization', 'Risk management', 'Compound interest']
      },
      status: 'draft'
    };
  } else {
    content = `# CUSTOM NFT CONCEPT ANALYSIS

I understand you want to create: **"${userInput}"**

## INTELLIGENT ANALYSIS:

Based on your description, I recommend building a **CUSTOM AUTONOMOUS NFT** with the following features:

## RECOMMENDED ARCHITECTURE:

- **CONTRACT TYPE**: Autonomous Redeemable NFT
- **BLOCKCHAIN**: Massa (for autonomous execution)
- **CORE FEATURES**: Self-updating metadata, condition-based transformations

## IMPLEMENTATION APPROACH:

1. **DEFINE TRIGGERS**: What conditions should activate NFT changes?
2. **SET AUTONOMOUS RULES**: How should the contract behave automatically?
3. **CONFIGURE METADATA**: What information should evolve over time?
4. **INTEGRATION POINTS**: Any external data sources or APIs needed?

## NEXT STEPS:

To provide more specific recommendations, please tell me:
- What type of NFT utility are you envisioning?
- What real-world conditions should trigger changes?
- Any specific blockchain integrations needed?

*Ready to dive deeper into your custom concept?*`;
  }

  return {
    id: (Date.now() + 1).toString(),
    type: 'ai',
    content,
    timestamp: new Date(),
    nftContract
  };
};

// Main NFT Chat Interface Component
export const NFTChatInterface: React.FC<NFTChatInterfaceProps> = ({
  isWalletConnected,
  walletAddress,
  apiBaseUrl,
  apiEndpoint,
  ContractPreviewComponent = DefaultContractPreview,
  ScrollAreaComponent = DefaultScrollArea,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageContent?: string) => {
    const content = messageContent || input.trim();
    if (!content || isLoading) return;

    // Hide welcome screen when first message is sent
    if (showWelcome) {
      setShowWelcome(false);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    if (!messageContent) setInput('');
    setIsLoading(true);

    try {
      // Make actual API call to backend using provided props
      const response = await fetch(`${apiBaseUrl}${apiEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          walletAddress: walletAddress,
          isWalletConnected: isWalletConnected,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Create AI response from backend data
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.content || data.message || 'No response from backend',
        timestamp: new Date(),
        nftContract: data.nftContract // Include contract data if provided by backend
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending message to backend:', error);
      
      // Fallback to mock response if backend is unavailable
      console.log('Falling back to mock response...');
      
      setTimeout(() => {
        const aiResponse: Message = generateAIResponse(content);
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1000); // Shorter delay for fallback
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (prompt: string) => {
    handleSend(prompt);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Chat Messages */}
      <ScrollAreaComponent className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {showWelcome && messages.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-8">
                <div className="w-16 h-16 bg-black text-white border-2 border-black flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h1 className="text-3xl font-bold geist-mono uppercase tracking-wider mb-4">
                  WELCOME TO ADAPTIC PROTOCOL
                </h1>
                <p className="text-lg geist-mono max-w-2xl mx-auto mb-8">
                  I'm your **AI ASSISTANT** for creating autonomous redeemable NFTs on the Massa blockchain. 
                  I specialize in generating smart contracts that evolve based on real-world conditions.
                </p>
              </div>
              
              <QuickActions onActionClick={handleQuickAction} />
              
              <div className="mt-8 text-sm geist-mono uppercase tracking-wider">
                WALLET: {isWalletConnected ? `CONNECTED (${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)})` : 'NOT CONNECTED'} • 
                NETWORK: MASSA BLOCKCHAIN
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            message.type === 'ai' ? (
              <AIMessage
                key={message.id}
                content={message.content}
                nftContract={message.nftContract}
                ContractPreviewComponent={ContractPreviewComponent}
              />
            ) : (
              <HumanMessage key={message.id} content={message.content} />
            )
          ))}
          
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </ScrollAreaComponent>

      {/* Input Area */}
      <div className="border-t-2 border-black p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="DESCRIBE YOUR NFT CONCEPT..."
                className="adaptic-textarea w-full geist-mono"
                rows={3}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={() => handleSend()} 
              disabled={!input.trim() || isLoading}
              className="btn-primary geist-mono flex items-center space-x-2 self-end"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span>{isLoading ? 'PROCESSING' : 'SEND'}</span>
            </button>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm geist-mono">
            <div className="flex items-center space-x-4">
              <span className="uppercase tracking-wider">
                WALLET: {isWalletConnected ? 'CONNECTED' : 'DISCONNECTED'}
              </span>
              <span className="uppercase tracking-wider">
                NETWORK: MASSA BLOCKCHAIN
              </span>
            </div>
            <span className="uppercase tracking-wider text-xs">
              PRESS ENTER TO SEND • SHIFT+ENTER FOR NEW LINE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};