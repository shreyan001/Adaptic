import React from 'react';
import { ExternalLink, Code, Zap, Shield, Cpu, Bot, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

interface ProjectShowcaseProps {
  onLaunchChat: () => void;
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onLaunchChat }) => {
  return (
    <div className="bg-white border-2 border-black p-8">
      {/* Header Section */}
      <div className="text-center gap-2 mb-12">
        <div className='w-100% h-fit flex items-center justify-center'>
        <div className="w-20 h-20 bg-black text-white border-2 border-black flex items-center justify-center mx-auto mb-6 rounded-lg">
          <Bot className="h-10 w-10" />
        </div></div>
        <h1 className="text-4xl font-bold text-black geist-mono uppercase tracking-wider mb-4">
          ADAPTIC PROTOCOL
        </h1>
        <p className="text-xl text-black geist-mono mb-6">
          AUTONOMOUS REDEEMABLE NFTS ON MASSA BLOCKCHAIN
        </p>
        <button 
          onClick={onLaunchChat}
          className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2 mb-6"
        >
          <MessageSquare className="h-5 w-5" />
          <span>START BUILDING NOW</span>
          <ArrowRight className="h-5 w-5" />
        </button>
        <div className="w-24 h-1 bg-black mx-auto"></div>
      </div>

      {/* Architecture Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-black geist-mono uppercase tracking-wider mb-6">
            SYSTEM ARCHITECTURE
          </h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-black text-white border-2 border-black flex items-center justify-center flex-shrink-0">
                <Cpu className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-black geist-mono uppercase tracking-wider mb-2">
                  AI PROCESSING ENGINE
                </h3>
                <p className="text-sm text-black geist-mono leading-relaxed">
                  LANGGRAPH-POWERED INTELLIGENT AGENT THAT ANALYZES USER REQUIREMENTS AND GENERATES OPTIMIZED SMART CONTRACT CODE FOR REDEEMABLE NFT SYSTEMS.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-black text-white border-2 border-black flex items-center justify-center flex-shrink-0">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-black geist-mono uppercase tracking-wider mb-2">
                  AUTONOMOUS EXECUTION
                </h3>
                <p className="text-sm text-black geist-mono leading-relaxed">
                  MASSA BLOCKCHAIN'S AUTONOMOUS SMART CONTRACTS ENABLE SELF-EXECUTING LOGIC WITHOUT EXTERNAL TRIGGERS OR CENTRALIZED INFRASTRUCTURE.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-black text-white border-2 border-black flex items-center justify-center flex-shrink-0">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-black geist-mono uppercase tracking-wider mb-2">
                  DEFI INTEGRATION
                </h3>
                <p className="text-sm text-black geist-mono leading-relaxed">
                  SEAMLESS INTEGRATION WITH DECENTRALIZED FINANCE PROTOCOLS FOR YIELD GENERATION, AUTOMATED TRADING, AND LIQUIDITY PROVISION.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-black geist-mono uppercase tracking-wider mb-6">
            TECHNICAL STACK
          </h2>
          <div className="space-y-4">
            <div className="card">
              <h3 className="font-bold text-black geist-mono uppercase tracking-wider mb-2">
                FRONTEND
              </h3>
              <ul className="list-none space-y-1">
                <li className="text-sm text-black geist-mono flex items-center">
                  <span className="w-2 h-2 bg-black mr-2"></span>
                  REACT + TYPESCRIPT
                </li>
                <li className="text-sm text-black geist-mono flex items-center">
                  <span className="w-2 h-2 bg-black mr-2"></span>
                  TAILWIND CSS
                </li>
                <li className="text-sm text-black geist-mono flex items-center">
                  <span className="w-2 h-2 bg-black mr-2"></span>
                  MASSA WALLET INTEGRATION
                </li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="font-bold text-black geist-mono uppercase tracking-wider mb-2">
                BACKEND
              </h3>
              <ul className="list-none space-y-1">
                <li className="text-sm text-black geist-mono flex items-center">
                  <span className="w-2 h-2 bg-black mr-2"></span>
                  LANGGRAPH AI AGENTS
                </li>
                <li className="text-sm text-black geist-mono flex items-center">
                  <span className="w-2 h-2 bg-black mr-2"></span>
                  PYTHON + FASTAPI
                </li>
                <li className="text-sm text-black geist-mono flex items-center">
                  <span className="w-2 h-2 bg-black mr-2"></span>
                  VECTOR DATABASES
                </li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="font-bold text-black geist-mono uppercase tracking-wider mb-2">
                BLOCKCHAIN
              </h3>
              <ul className="list-none space-y-1">
                <li className="text-sm text-black geist-mono flex items-center">
                  <span className="w-2 h-2 bg-black mr-2"></span>
                  MASSA AUTONOMOUS SC
                </li>
                <li className="text-sm text-black geist-mono flex items-center">
                  <span className="w-2 h-2 bg-black mr-2"></span>
                  ASSEMBLYSCRIPT
                </li>
                <li className="text-sm text-black geist-mono flex items-center">
                  <span className="w-2 h-2 bg-black mr-2"></span>
                  DEWEB DEPLOYMENT
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-black geist-mono uppercase tracking-wider mb-6 text-center">
          KEY FEATURES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card text-center">
            <div className="w-12 h-12 bg-black text-white border-2 border-black flex items-center justify-center mx-auto mb-4 rounded-lg">
              <Code className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-black geist-mono uppercase tracking-wider mb-2">
              AI CODE GEN
            </h3>
            <p className="text-sm text-black geist-mono">
              INTELLIGENT CONTRACT GENERATION BASED ON NATURAL LANGUAGE REQUIREMENTS
            </p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-black text-white border-2 border-black flex items-center justify-center mx-auto mb-4 rounded-lg">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-black geist-mono uppercase tracking-wider mb-2">
              AUTONOMOUS
            </h3>
            <p className="text-sm text-black geist-mono">
              SELF-EXECUTING SMART CONTRACTS WITHOUT EXTERNAL DEPENDENCIES
            </p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-black text-white border-2 border-black flex items-center justify-center mx-auto mb-4 rounded-lg">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-black geist-mono uppercase tracking-wider mb-2">
              REDEEMABLE
            </h3>
            <p className="text-sm text-black geist-mono">
              CONDITION-BASED NFT TRANSFORMATIONS AND UTILITY UNLOCKING
            </p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-black text-white border-2 border-black flex items-center justify-center mx-auto mb-4 rounded-lg">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-black geist-mono uppercase tracking-wider mb-2">
              DEFI READY
            </h3>
            <p className="text-sm text-black geist-mono">
              INTEGRATED YIELD GENERATION AND AUTOMATED TRADING CAPABILITIES
            </p>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-black geist-mono uppercase tracking-wider mb-6 text-center">
          USE CASES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-bold text-black geist-mono uppercase tracking-wider mb-3">
              TICKETING NFTS
            </h3>
            <p className="text-sm text-black geist-mono mb-3">
              EVENT TICKETS THAT TRANSFORM INTO COLLECTIBLES POST-EVENT, WITH AUTONOMOUS VERIFICATION AND RESALE RESTRICTIONS.
            </p>
            <ul className="list-none space-y-1">
              <li className="text-xs text-black geist-mono flex items-center">
                <span className="w-1.5 h-1.5 bg-black mr-2"></span>
                AUTOMATIC EXPIRY HANDLING
              </li>
              <li className="text-xs text-black geist-mono flex items-center">
                <span className="w-1.5 h-1.5 bg-black mr-2"></span>
                LOCATION-BASED VALIDATION
              </li>
              <li className="text-xs text-black geist-mono flex items-center">
                <span className="w-1.5 h-1.5 bg-black mr-2"></span>
                POST-EVENT COLLECTIBLE TRANSFORMATION
              </li>
            </ul>
          </div>
          
          <div className="card">
            <h3 className="font-bold text-black geist-mono uppercase tracking-wider mb-3">
              GAMING ASSETS
            </h3>
            <p className="text-sm text-black geist-mono mb-3">
              IN-GAME ITEMS THAT EVOLVE BASED ON PLAYER PERFORMANCE AND GAME EVENTS, WITH CROSS-GAME COMPATIBILITY.
            </p>
            <ul className="list-none space-y-1">
              <li className="text-xs text-black geist-mono flex items-center">
                <span className="w-1.5 h-1.5 bg-black mr-2"></span>
                PERFORMANCE-BASED UPGRADES
              </li>
              <li className="text-xs text-black geist-mono flex items-center">
                <span className="w-1.5 h-1.5 bg-black mr-2"></span>
                CROSS-PLATFORM TRADING
              </li>
              <li className="text-xs text-black geist-mono flex items-center">
                <span className="w-1.5 h-1.5 bg-black mr-2"></span>
                AUTONOMOUS RARITY ADJUSTMENTS
              </li>
            </ul>
          </div>
          
          <div className="card">
            <h3 className="font-bold text-black geist-mono uppercase tracking-wider mb-3">
              DOMAIN PORTFOLIOS
            </h3>
            <p className="text-sm text-black geist-mono mb-3">
              WEB3 DOMAINS WITH AUTONOMOUS TRADING ALGORITHMS AND MARKET-RESPONSIVE PRICING MECHANISMS.
            </p>
            <ul className="list-none space-y-1">
              <li className="text-xs text-black geist-mono flex items-center">
                <span className="w-1.5 h-1.5 bg-black mr-2"></span>
                AUTOMATED LISTING STRATEGIES
              </li>
              <li className="text-xs text-black geist-mono flex items-center">
                <span className="w-1.5 h-1.5 bg-black mr-2"></span>
                MARKET-DRIVEN PRICING
              </li>
              <li className="text-xs text-black geist-mono flex items-center">
                <span className="w-1.5 h-1.5 bg-black mr-2"></span>
                REVENUE OPTIMIZATION
              </li>
            </ul>
          </div>
          
          <div className="card">
            <h3 className="font-bold text-black geist-mono uppercase tracking-wider mb-3">
              FINANCIAL INSTRUMENTS
            </h3>
            <p className="text-sm text-black geist-mono mb-3">
              DEFI-INTEGRATED NFTS WITH YIELD GENERATION, AUTOMATED STAKING, AND CONDITION-BASED PAYOUTS.
            </p>
            <ul className="list-none space-y-1">
              <li className="text-xs text-black geist-mono flex items-center">
                <span className="w-1.5 h-1.5 bg-black mr-2"></span>
                AUTOMATED YIELD FARMING
              </li>
              <li className="text-xs text-black geist-mono flex items-center">
                <span className="w-1.5 h-1.5 bg-black mr-2"></span>
                CONDITION-BASED PAYOUTS
              </li>
              <li className="text-xs text-black geist-mono flex items-center">
                <span className="w-1.5 h-1.5 bg-black mr-2"></span>
                RISK MANAGEMENT PROTOCOLS
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-black geist-mono uppercase tracking-wider mb-4">
          READY TO BUILD?
        </h2>
        <p className="text-lg text-black geist-mono mb-6">
          CREATE YOUR FIRST AUTONOMOUS REDEEMABLE NFT IN MINUTES
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://github.com/adaptic-ai/adaptic-protocol"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary geist-mono flex items-center space-x-2"
          >
            <ExternalLink className="h-4 w-4" />
            <span>VIEW ON GITHUB</span>
          </a>
          <button 
            onClick={onLaunchChat}
            className="btn-primary geist-mono flex items-center space-x-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>LAUNCH AI ASSISTANT</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-black geist-mono uppercase tracking-wider mt-4">
          START WITH OUR AI-POWERED CHAT INTERFACE
        </p>
        
        <div className="mt-8 text-xs text-black geist-mono uppercase tracking-wider text-center">
          <p>POWERED BY MASSA BLOCKCHAIN • BUILT WITH LANGGRAPH AI</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
