import React, { useState, useRef, useEffect } from 'react';
import { Send, Code, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import QuickActions from './QuickActions';
import NFTTicket from './NFTTicket';

// --- Enhanced Message Components ---
const AIMessageText: React.FC<{ content: string | React.ReactNode }> = ({ content }) => (
  <div className="prose prose-sm max-w-none break-words">
    {typeof content === 'string' ? (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom styling for markdown elements
          h1: ({children}) => <h1 className="text-lg font-bold mb-3 text-gray-900">{children}</h1>,
          h2: ({children}) => <h2 className="text-base font-semibold mb-2 text-gray-800">{children}</h2>,
          h3: ({children}) => <h3 className="text-sm font-medium mb-2 text-gray-700">{children}</h3>,
          p: ({children}) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
          strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
          em: ({children}) => <em className="italic text-gray-700">{children}</em>,
          ul: ({children}) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,
          ol: ({children}) => <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
          li: ({children}) => <li className="leading-relaxed">{children}</li>,
          code: ({children}) => <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-blue-600 border">{children}</code>,
          pre: ({children}) => <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto mb-3 border font-mono">{children}</pre>,
          blockquote: ({children}) => <blockquote className="border-l-4 border-blue-300 pl-4 italic mb-3 text-gray-700 bg-blue-25 py-2">{children}</blockquote>,
          a: ({href, children}) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline font-medium"
            >
              {children}
            </a>
          ),
          table: ({children}) => (
            <div className="overflow-x-auto mb-3">
              <table className="min-w-full border border-gray-200 text-xs">{children}</table>
            </div>
          ),
          thead: ({children}) => <thead className="bg-gray-50">{children}</thead>,
          tbody: ({children}) => <tbody>{children}</tbody>,
          tr: ({children}) => <tr className="border-b border-gray-200">{children}</tr>,
          th: ({children}) => <th className="px-2 py-1 text-left font-semibold border-r border-gray-200 last:border-r-0">{children}</th>,
          td: ({children}) => <td className="px-2 py-1 border-r border-gray-200 last:border-r-0">{children}</td>,
          hr: () => <hr className="my-4 border-gray-300" />,
        }}
      >
        {content}
      </ReactMarkdown>
    ) : (
      content
    )}
  </div>
);

const HumanMessageText: React.FC<{ content: string }> = ({ content }) => (
  <div className="whitespace-pre-wrap break-words">
    <ReactMarkdown
      components={{
        // Simplified styling for human messages
        p: ({children}) => <span className="leading-relaxed">{children}</span>,
        strong: ({children}) => <strong className="font-semibold">{children}</strong>,
        em: ({children}) => <em className="italic">{children}</em>,
        code: ({children}) => <code className="bg-blue-700 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
        a: ({href, children}) => (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-200 hover:text-white underline"
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);

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
  sender?: 'user' | 'ai'; // For backward compatibility
  nftContract?: NFTContractObject;
  nftTicket?: {
    id: string;
    name: string;
    description: string;
    image: string;
    attributes: Array<{ trait_type: string; value: string }>;
  };
}

// Props interface
interface NFTChatInterfaceProps {
  isWalletConnected: boolean;
  walletAddress?: string;
  apiUrl: string;
  ContractPreviewComponent?: React.ComponentType<{ contract: NFTContractObject }>;
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


// Main NFT Chat Interface Component
export const NFTChatInterface: React.FC<NFTChatInterfaceProps> = ({
  isWalletConnected,
  apiUrl,
  ContractPreviewComponent = DefaultContractPreview,
}) => {
  const initialAIMessage = `Hi! I'm **NFT Assistant**, your intelligent guide to the world of Non-Fungible Tokens! 🎨

**What I Do:**
I help you create, understand, and work with NFTs on various blockchain networks. Whether you're an artist, collector, or developer - I'm here to assist!

💡 **Quick Examples:**
- "Help me create an NFT collection for my artwork"
- "Explain how NFT royalties work"
- "Generate metadata for my digital art"
- "What's the best marketplace for selling NFTs?"

🎯 **Special Features:**
- NFT ticket generation
- Smart contract guidance
- Marketplace recommendations
- Metadata creation

Is there something specific you'd like to know about NFTs, or would you like to start creating one right now?`

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: initialAIMessage,
      type: 'ai',
      timestamp: new Date()
    }
  ])
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentEventSource, setCurrentEventSource] = useState<EventSource | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLInputElement>(null);

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
    const currentInput = content;
    if (!messageContent) setInput('');
    setIsLoading(true);

    // Close any existing EventSource
    if (currentEventSource) {
      currentEventSource.close();
    }

    try {
      console.log('🌐 Using API URL:', apiUrl);
      
      // Prepare chat history in the required format
      const chatHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      // Create EventSource for SSE with hardcoded URL
      const queryParams = new URLSearchParams({
        input: currentInput,
        chat_history: JSON.stringify(chatHistory)
      });
      
      // Add wallet address if available
      if (walletAddress) {
        queryParams.append('wallet_address', walletAddress);
        console.log('💼 Sending wallet address to API:', walletAddress);
      } else {
        console.log('⚠️ No wallet address available');
      }
      
      const fullUrl = `http://localhost:3001/api/agent?${queryParams}`;
      console.log('📡 Making request to:', fullUrl);

      const eventSource = new EventSource(fullUrl);

      setCurrentEventSource(eventSource);

      const aiMessageId = (Date.now() + 1).toString();
      let aiMessageContent = '';
      let nftContractData: NFTContractObject | null = null;
      let nftTicketData: {
        id: string;
        name: string;
        description: string;
        image: string;
        attributes: Array<{ trait_type: string; value: string }>;
      } | null = null;

      eventSource.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          
          console.log('📨 Backend Response:', {
            type: data.type,
            hasContent: !!data.content,
            hasContract: !!data.contract,
            hasTicket: !!data.ticket,
            timestamp: new Date().toISOString()
          });
          
          switch (data.type) {
            case 'message':
              aiMessageContent += data.content;
              setMessages(prev => {
                const newMessages = [...prev];
                const existingIndex = newMessages.findIndex(msg => msg.id === aiMessageId);
                
                if (existingIndex >= 0) {
                  newMessages[existingIndex] = {
                    ...newMessages[existingIndex],
                    content: aiMessageContent
                  };
                } else {
                  newMessages.push({
                    id: aiMessageId,
                    type: 'ai',
                    content: aiMessageContent,
                    timestamp: new Date(),
                  });
                }
                return newMessages;
              });
              break;

            case 'nft_contract':
              nftContractData = data.contract;
              setMessages(prev => {
                const newMessages = [...prev];
                const existingIndex = newMessages.findIndex(msg => msg.id === aiMessageId);
                
                if (existingIndex >= 0) {
                  newMessages[existingIndex] = {
                    ...newMessages[existingIndex],
                    nftContract: nftContractData || undefined
                  };
                }
                return newMessages;
              });
              break;

            case 'nft_ticket':
              nftTicketData = data.ticket;
              setMessages(prev => {
                const newMessages = [...prev];
                const existingIndex = newMessages.findIndex(msg => msg.id === aiMessageId);
                
                if (existingIndex >= 0) {
                  newMessages[existingIndex] = {
                    ...newMessages[existingIndex],
                    nftTicket: nftTicketData || undefined
                  };
                }
                return newMessages;
              });
              break;

            case 'loading':
              // Handle loading state if needed
              console.log('📊 Loading indicator received');
              break;

            case 'error': {
              console.error('❌ Backend error:', data.message || data.payload?.message);
              const errorMessage: Message = {
                id: `backend-error-${Date.now()}`,
                type: 'ai',
                content: `❌ **Backend Error:** ${data.message || data.payload?.message || "An unexpected error occurred"}\n\n**What happened?** The server encountered an issue while processing your request.\n\n**Next steps:**\n- Try sending your message again\n- Check your internet connection\n- If the problem persists, please contact support`,
                timestamp: new Date(),
              };
              setMessages(prev => [...prev, errorMessage]);
              break;
            }

            case 'end':
              console.log('✅ Stream ended, closing EventSource');
              eventSource.close();
              setCurrentEventSource(null);
              setIsLoading(false);
              break;
              
            default:
              console.warn('⚠️ Unknown message type received:', data.type, data);
              break;
          }
        } catch (parseError) {
          console.error('❌ Error parsing SSE data:', parseError, "Raw data:", event.data);
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
        setCurrentEventSource(null);
        setIsLoading(false);
        
        const errorMessage: Message = {
          id: `connection-error-${Date.now()}`,
          type: 'ai',
          content: `🔌 **Connection Error:** Unable to connect to the agent.\n\n**Possible causes:**\n- Server is temporarily unavailable\n- Network connectivity issues\n- Firewall blocking the connection\n\n**Please try again** in a few moments.`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      };

    } catch (error) {
      console.error('❌ Error setting up SSE:', error);
      setIsLoading(false);
      
      const errorMessage: Message = {
        id: `setup-error-${Date.now()}`,
        type: 'ai',
        content: `❌ **Setup Error:** Failed to initialize chat connection.\n\n**Please try again** or refresh the page.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
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
      <div className="flex-1 overflow-y-auto chat-scroll-area">
         <div className="p-2">
           <div className="space-y-2">
             {showWelcome && messages.length === 0 && (
               <div className="text-center py-6">
                 <div className="mb-4">
                   <div className="w-12 h-12 bg-black text-white border-2 text-center border-black flex items-center justify-center mx-auto mb-3">
                     <Sparkles className="h-6 w-6" />
                   </div>
                   <h1 className="text-xl font-bold geist-mono uppercase tracking-wider text-black mb-2">
                     ADAPTIC PROTOCOL
                   </h1>
                   <p className="text-xs geist-mono text-center text-black mb-4">
                     AI Assistant for autonomous NFTs on Massa blockchain.
                   </p>
                 </div>
                 
                 <QuickActions onActionClick={handleQuickAction} />
                 
                 <div className="mt-4 text-xs geist-mono uppercase tracking-wider">
                   WALLET: {isWalletConnected ? `CONNECTED` : 'NOT CONNECTED'} • MASSA
                 </div>
               </div>
             )}
             
             {messages.map((message) => (
               <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                   message.type === 'user' 
                     ? 'bg-blue-600 text-white' 
                     : 'bg-gray-100 text-gray-900 border border-gray-200'
                 } geist-mono`}>
                   {message.type === 'ai' ? (
                     <>
                       <AIMessageText content={message.content} />
                       {message.nftTicket && (
                         <NFTTicket ticket={message.nftTicket} />
                       )}
                     </>
                   ) : (
                     <HumanMessageText content={message.content} />
                   )}
                   {message.nftContract && (
                     <div className="mt-2">
                       <ContractPreviewComponent contract={message.nftContract} />
                     </div>
                   )}
                 </div>
               </div>
             ))}
             
             {isLoading && (
               <div className="flex justify-start">
                 <div className="max-w-[70%] px-3 py-2 rounded-lg text-sm bg-blue-50 border border-blue-200 shadow-sm geist-mono">
                   <div className="flex items-center space-x-3">
                     <div className="flex gap-1">
                       <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                       <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:200ms]"></span>
                       <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:400ms]"></span>
                     </div>
                     <span className="text-sm text-gray-600">AI is thinking...</span>
                   </div>
                 </div>
               </div>
             )}
             <div ref={messagesEndRef} />
           </div>
         </div>
       </div>

      {/* Input Area */}
      <div className="flex gap-3 p-4 border-t border-gray-200 bg-white">
        <input
          ref={textareaRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="DESCRIBE YOUR NFT CONCEPT..."
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500 geist-mono text-sm transition-all bg-white text-gray-900"
        />
        <div className="relative group">
          <button
            onClick={() => handleSend()} 
            disabled={!input.trim() || isLoading}
            className={`px-6 py-2.5 font-medium text-white rounded-lg transition-colors geist-mono text-sm flex items-center gap-2 shadow-sm
              bg-blue-600 hover:bg-blue-700
              disabled:bg-gray-400 disabled:cursor-not-allowed`}
          >

            {isLoading ? (
              <>
                <div className="flex gap-1">
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:200ms]"></span>
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:400ms]"></span>
                </div>
                <span>PROCESSING</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>SEND</span>
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};