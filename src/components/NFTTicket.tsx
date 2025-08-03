import React from 'react';

interface NFTTicketProps {
  ticket: {
    id: string;
    name: string;
    description: string;
    image: string;
    attributes: Array<{ trait_type: string; value: string }>;
  };
}

const NFTTicket: React.FC<NFTTicketProps> = ({ ticket }) => {
  return (
    <div className="mt-4 p-6 border border-purple-200 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🎫</span>
        <h4 className="font-bold text-purple-800 text-lg">NFT Ticket Created</h4>
        <div className="flex-1"></div>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
          ✓ Minted
        </span>
      </div>
      
      <div className="flex gap-6">
        {ticket.image && (
          <div className="flex-shrink-0">
            <img 
              src={ticket.image} 
              alt={ticket.name}
              className="w-24 h-24 object-cover rounded-xl border-2 border-purple-200 shadow-md"
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h5 className="font-bold text-gray-900 text-lg mb-2 truncate">
            {ticket.name}
          </h5>
          
          <p className="text-sm text-gray-700 mb-4 leading-relaxed">
            {ticket.description}
          </p>
          
          {ticket.attributes && ticket.attributes.length > 0 && (
            <div>
              <h6 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                Attributes
              </h6>
              <div className="flex flex-wrap gap-2">
                {ticket.attributes.map((attr, index) => (
                  <div 
                    key={index}
                    className="bg-white border border-purple-200 rounded-lg px-3 py-2 shadow-sm"
                  >
                    <div className="text-xs font-medium text-purple-700">
                      {attr.trait_type}
                    </div>
                    <div className="text-sm font-semibold text-gray-800">
                      {attr.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-purple-200">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Ticket ID: {ticket.id}</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Live on Massa Network
          </span>
        </div>
      </div>
    </div>
  );
};

export default NFTTicket;