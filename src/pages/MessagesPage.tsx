import React, { useState } from 'react';
import {
  Search,
  Send,
  ShieldCheck,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  UserCheck,
  QrCode,
  Calendar
} from 'lucide-react';
import { useRentix } from '../context/RentixContext';

export const MessagesPage: React.FC = () => {
  const { bookings, currentUser, users, products, setQrModalBooking } = useRentix();

  // Track selected conversation for mobile navigation
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    bookings.length > 0 ? bookings[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const activeBooking = bookings.find(b => b.id === selectedBookingId) || bookings[0];

  const filteredBookings = bookings.filter(b => {
    const titleMatch = b.productTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    // Handle message sending logic here
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-[#09121D] text-[#CBD6D3] pb-24 pt-4 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0C2B35] border border-[#83B2A8]/30 text-[10px] font-mono text-[#83B2A8] uppercase tracking-wider mb-1">
            <Lock className="w-3 h-3 text-[#10B981]" /> Encrypted P2P Messaging
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">Rental Messages & Escrow Logs</h1>
        </div>
      </div>

      {/* MESSAGING CONTAINER */}
      <div className="bg-[#0C2B35] border border-[#4A7071] rounded-3xl overflow-hidden shadow-2xl h-[calc(100vh-180px)] min-h-[550px] flex">

        {/* SIDEBAR: CONVERSATION LIST */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-[#4A7071] flex flex-col bg-[#0C2B35] ${selectedBookingId ? 'hidden md:flex' : 'flex'
          }`}>

          {/* Search Bar */}
          <div className="p-4 border-b border-[#4A7071] bg-[#09121D]">
            <div className="relative">
              <Search className="w-4 h-4 text-[#83B2A8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter chats by user or gear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0C2B35] border border-[#4A7071] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#CBD6D3]/50 focus:outline-none focus:border-[#83B2A8]"
              />
            </div>
          </div>

          {/* Chat List Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#4A7071]/50 no-scrollbar">
            {filteredBookings.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#CBD6D3]/60">
                No active conversations found.
              </div>
            ) : (
              filteredBookings.map((b) => {
                const isSelected = b.id === selectedBookingId;
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBookingId(b.id)}
                    className={`w-full p-4 text-left transition-colors flex items-start gap-3 ${isSelected ? 'bg-[#09121D] border-l-4 border-l-[#83B2A8]' : 'hover:bg-[#09121D]/50'
                      }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={b.productImage}
                        alt={b.productTitle}
                        className="w-12 h-12 rounded-xl object-cover border border-[#4A7071]"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#10B981] rounded-full border-2 border-[#0C2B35]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h4 className="text-xs font-bold text-white truncate">{b.productTitle}</h4>
                        <span className="text-[10px] text-[#CBD6D3]/60 font-mono flex-shrink-0">Just now</span>
                      </div>
                      <p className="text-[11px] text-[#83B2A8] truncate font-medium">📦 {b.productTitle}</p>
                      <p className="text-[11px] text-[#CBD6D3]/70 truncate mt-0.5">
                        Conversation started for escrow rental contract.
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* MAIN PANEL: ACTIVE CONVERSATION THREAD */}
        {activeBooking ? (
          <div className={`flex-1 flex-col bg-[#09121D] ${selectedBookingId ? 'flex' : 'hidden md:flex'
            }`}>

            {/* THREAD HEADER (WITH MOBILE BACK BUTTON) */}
            <div className="p-3 sm:p-4 bg-[#0C2B35] border-b border-[#4A7071] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {/* Mobile Back Button */}
                <button
                  onClick={() => setSelectedBookingId(null)}
                  className="md:hidden p-2 rounded-xl bg-[#09121D] text-[#83B2A8] border border-[#4A7071] hover:text-white"
                  aria-label="Back to messages"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <img
                  src={activeBooking.productImage}
                  alt={activeBooking.productTitle}
                  className="w-10 h-10 rounded-xl object-cover border border-[#83B2A8] flex-shrink-0"
                />

                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                    {activeBooking.productTitle}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-[#CBD6D3]/80">
                    <span className="flex items-center gap-1 text-[#10B981] font-semibold">
                      <ShieldCheck className="w-3 h-3" /> Escrow Protected
                    </span>
                    <span>•</span>
                    <span className="font-mono text-[#83B2A8]">৳{activeBooking.totalAmount} Total</span>
                  </div>
                </div>
              </div>

              {/* Handshake QR Button */}
              <button
                onClick={() => setQrModalBooking(activeBooking)}
                className="px-3 py-1.5 rounded-xl bg-[#83B2A8] text-[#09121D] text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform flex-shrink-0"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Handshake QR</span>
              </button>
            </div>

            {/* CONTRACT SUMMARY BANNER */}
            <div className="bg-[#0C2B35] px-4 py-2 border-b border-[#4A7071] flex items-center justify-between text-[11px] text-[#CBD6D3]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#83B2A8]" />
                {activeBooking.startDate} → {activeBooking.endDate} ({activeBooking.days} days)
              </span>
              <span className="px-2 py-0.5 rounded bg-[#09121D] text-[#10B981] font-mono font-bold text-[10px] border border-[#10B981]/40">
                STATUS: {activeBooking.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            {/* MESSAGE CHAT STREAM */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar">

              {/* System Security Notice */}
              <div className="max-w-md mx-auto my-2 p-3 rounded-2xl bg-[#0C2B35] border border-[#4A7071] text-center text-[11px] text-[#CBD6D3]">
                <ShieldCheck className="w-4 h-4 text-[#83B2A8] mx-auto mb-1" />
                <p>Security Note: Payments, handover verification, and deposit returns are fully automated via Rentix Smart Escrow. Do not share external payment links.</p>
              </div>

              {/* Sample Received Message */}
              <div className="flex items-start gap-2 max-w-[85%] sm:max-w-[70%]">
                <div className="bg-[#0C2B35] border border-[#4A7071] p-3 rounded-2xl rounded-tl-none text-xs text-[#CBD6D3]">
                  <p className="font-semibold text-[#83B2A8] text-[10px] mb-1">Owner / Renter</p>
                  Hello! I've confirmed your booking request for {activeBooking.productTitle}. Everything is ready for handover!
                  <span className="block text-[9px] text-[#CBD6D3]/50 text-right mt-1 font-mono">10:42 AM</span>
                </div>
              </div>

              {/* Sample Sent Message */}
              <div className="flex items-start justify-end gap-2 max-w-[85%] sm:max-w-[70%] ml-auto">
                <div className="bg-[#83B2A8] text-[#09121D] p-3 rounded-2xl rounded-tr-none text-xs font-medium">
                  Great, thanks! I will meet you at the designated location and scan the QR code to release escrow.
                  <span className="block text-[9px] text-[#09121D]/60 text-right mt-1 font-mono">10:45 AM</span>
                </div>
              </div>

            </div>

            {/* INPUT FORM */}
            <form onSubmit={handleSendMessage} className="p-3 bg-[#0C2B35] border-t border-[#4A7071] flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-[#09121D] border border-[#4A7071] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#CBD6D3]/50 focus:outline-none focus:border-[#83B2A8]"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-[#83B2A8] text-[#09121D] font-bold hover:bg-[#97c7bd] transition-colors"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center text-xs text-[#CBD6D3]/60">
            Select a conversation to view messages.
          </div>
        )}

      </div>
    </div>
  );
};