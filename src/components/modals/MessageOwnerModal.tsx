import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Send, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { useRentix } from '../../context/RentixContext';

interface MessageOwnerModalProps {
  product: Product;
  onClose: () => void;
}

export const MessageOwnerModal: React.FC<MessageOwnerModalProps> = ({ product, onClose }) => {
  const { startChatWithUser, requireAuth } = useRentix();
  const navigate = useNavigate();
  const [message, setMessage] = useState(
    `Hi! I'm interested in renting your ${product.title} in ${product.district.split('(')[0].trim()}. Is it available this week?`
  );

  const cannedQuestions = [
    'Is this available this weekend in Dhaka?',
    'Where is the exact meetup point in ' + product.district.split('(')[0].trim() + '?',
    'Does this include all batteries and charger?'
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    requireAuth(() => {
      startChatWithUser(product.id, product.ownerId, message.trim());
      onClose();
      navigate('/messages');
    }, 'Please log in to chat with the hardware owner');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0C2B35] border border-[#4A7071] rounded-3xl shadow-2xl overflow-hidden p-6 text-[#CBD6D3]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#09121D]/60 hover:bg-[#09121D] text-[#CBD6D3] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={product.owner?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
            alt={product.owner?.name || 'Owner'}
            className="w-12 h-12 rounded-full object-cover border border-[#83B2A8]"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-white">Message {product.owner?.name}</h3>
              {product.owner?.verified && (
                <span className="px-1.5 py-0.2 bg-[#10B981]/20 text-[#10B981] text-[10px] rounded font-semibold">
                  Verified
                </span>
              )}
            </div>
            <p className="text-xs text-[#CBD6D3]/60">
              Regarding: <span className="text-[#83B2A8]">{product.title}</span> (৳{product.dailyRate.toLocaleString()}/day)
            </p>
          </div>
        </div>

        {/* Quick Canned Questions */}
        <div className="mb-4">
          <span className="text-[11px] text-[#CBD6D3]/60 block mb-1.5">Quick questions:</span>
          <div className="flex flex-wrap gap-1.5">
            {cannedQuestions.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setMessage(q)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-[#09121D] hover:bg-[#103A47] border border-[#4A7071]/50 text-[#CBD6D3] hover:text-white transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSend} className="space-y-4">
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message or questions about rental dates, accessories, or pickup location..."
            className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-2xl p-3.5 text-xs text-white placeholder-[#CBD6D3]/40 focus:border-[#83B2A8] focus:outline-none"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#CBD6D3]/50 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#83B2A8]" />
              Response rate: {product.owner?.responseRate || 98}% ({product.owner?.responseTime || '< 15m'})
            </span>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#83B2A8] to-[#6da197] hover:from-[#97c7bd] hover:to-[#83B2A8] text-[#09121D] font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#83B2A8]/20 transition-all hover:scale-105"
            >
              <Send className="w-3.5 h-3.5" />
              Send Message
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
