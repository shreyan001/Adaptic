import React from 'react';
import { ExternalLink, GitBranch, Sparkles } from 'lucide-react';

export const ProjectShowcase: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-surface border border-gray-700 mb-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="h-5 w-5 icon-container-accent" />
          <h2 className="text-xl font-bold text-white">Project Architecture</h2>
          <Sparkles className="h-5 w-5 icon-container-accent" />
        </div>
        <p className="text-gray-300 max-w-2xl mx-auto text-sm">
          Discover how Adaptic Protocol transforms static NFTs into dynamic, self-managing assets
          through AI-powered autonomous contracts on the Massa blockchain.
        </p>
      </div>
      
      <div className="bg-surface border border-gray-700 p-4 mb-6">
        <img 
          src="/project-flow.png" 
          alt="Adaptic Protocol Architecture Flow" 
          className="w-full h-auto"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="icon-container p-4 border border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <GitBranch className="h-4 w-4 icon-container-accent" />
            <span className="font-semibold icon-container-accent">AI Processing</span>
          </div>
          <p className="text-gray-300">
            LangGraph agents analyze user requirements and select optimal smart contract templates
          </p>
        </div>
        
        <div className="status-connected p-4">
          <div className="flex items-center space-x-2 mb-2">
            <GitBranch className="h-4 w-4 text-green-400" />
            <span className="font-semibold text-green-400">Autonomous Execution</span>
          </div>
          <p className="text-gray-300">
            Massa's autonomous smart contracts self-execute based on real-world conditions
          </p>
        </div>
        
        <div className="bg-surface border border-gray-700 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <GitBranch className="h-4 w-4 text-blue-400" />
            <span className="font-semibold text-blue-400">DeFi Integration</span>
          </div>
          <p className="text-gray-300">
            Assets become liquid through lending, auctions, and automated trading mechanisms
          </p>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <a 
          href="https://github.com/your-username/adaptic-protocol" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 btn-primary"
        >
          <ExternalLink className="h-4 w-4" />
          <span>View on GitHub</span>
        </a>
      </div>
    </div>
  );
};
