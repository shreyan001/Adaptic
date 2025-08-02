import React from 'react';
import { Ticket, Gamepad2, Globe, DollarSign, Zap, Code } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (prompt: string) => void;
  isDisabled?: boolean;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick, isDisabled = false }) => {
  const quickActions = [
    {
      icon: Ticket,
      title: 'EVENT TICKETS',
      description: 'Transform into collectibles',
      prompt: 'Create an event ticket NFT that becomes a rare collectible after the event ends, with autonomous attendance verification'
    },
    {
      icon: Gamepad2,
      title: 'GAMING ASSETS',
      description: 'Level up through gameplay',
      prompt: 'Design a gaming weapon NFT that evolves and gets stronger based on player performance and battle victories'
    },
    {
      icon: Globe,
      title: 'DOMAIN TRADING',
      description: 'Autonomous market optimization',
      prompt: 'Build a Web3 domain NFT with autonomous trading logic that automatically lists for sale when market conditions are profitable'
    },
    {
      icon: DollarSign,
      title: 'DEFI INSTRUMENTS',
      description: 'Yield generation & staking',
      prompt: 'Create a DeFi-integrated NFT that automatically generates yield through staking and farming protocols'
    },
    {
      icon: Zap,
      title: 'MEMBERSHIP NFTS',
      description: 'Time-based utility unlocks',
      prompt: 'Design a membership NFT that unlocks new features and benefits over time based on holding duration'
    },
    {
      icon: Code,
      title: 'CUSTOM CONTRACT',
      description: 'Tailored autonomous logic',
      prompt: 'I want to create a custom autonomous NFT with specific redeemable conditions and smart contract features'
    }
  ];

  return (
    <div className="bg-white border-2 border-black p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold geist-mono uppercase tracking-wider mb-2">
          QUICK START TEMPLATES
        </h2>
        <p className="text-sm geist-mono">
          CLICK ANY TEMPLATE TO BEGIN BUILDING YOUR AUTONOMOUS NFT
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <button
              key={index}
              onClick={() => onActionClick(action.prompt)}
              disabled={isDisabled}
              className="card hover:bg-black hover:text-white transition-all duration-200 text-left p-4 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-black text-white group-hover:bg-white group-hover:text-black border-2 border-black flex items-center justify-center flex-shrink-0 transition-all duration-200">
                  <IconComponent className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold geist-mono text-sm uppercase tracking-wider mb-1">
                    {action.title}
                  </h3>
                  <p className="text-xs geist-mono leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs geist-mono uppercase tracking-wider text-gray-600">
          OR TYPE YOUR CUSTOM NFT CONCEPT IN THE CHAT BELOW
        </p>
      </div>
    </div>
  );
};

export default QuickActions;