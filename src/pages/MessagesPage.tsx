import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Send,
  Search,
  ShieldCheck,
  ChevronLeft,
  Sparkles,
  Lock,
  QrCode,
  ExternalLink,
  LogIn,
  UserPlus
} from 'lucide-react';
import { useRentix } from '../context/RentixContext';

export const MessagesPage: React.FC = () => {
  const {
    isAuthenticated,
    conversations,
    activeConversationId,
    setActiveConversationId,
    messages,
    sendMessage,
    setQrModalBooking,
    bookings,
    setIsAuthModalOpen,
    setAuthModalTab,
    setAuthModalReason
  } = useRentix();

  const [inputMessage, setInputMessage] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  // Auto-select first conversation on desktop ONLY (screen width > 768px)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      if (!activeConversationId && conversations.length > 0) {
        setActiveConversationId(conversations[0].id);
      }
    }
  }, [conversations, activeConversationId, setActiveConversationId]);

  // Auth Guard for Logged-Out State
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] bg-[var(--bg-primary)] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto text-[var(--accent-primary)]">
            <MessageSquare className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-[var(--text-primary)]">Rental Messages & Escrows</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Please log in or create an account to view your encrypted messages, coordinate handshakes, and track escrow deposits.
          </p>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setAuthModalReason('Sign in to access your messages and active rentals');
                setAuthModalTab('login');
                setIsAuthModalOpen(true);
              }}
              className="w-full py-3 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--bg-primary)] font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <LogIn className="w-4 h-4" /> Log In
            </button>

            <button
              onClick={() => {
                setAuthModalReason('Create an account to message gear owners');
                setAuthModalTab('register');
                setIsAuthModalOpen(true);
              }}
              className="w-full py-3 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] flex items-center justify-center gap-2 transition-colors"
            >
              <UserPlus className="w-4 h-4" /> Create New Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredConversations = conversations.filter(c =>
    c.productTitle.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.otherUser.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const activeConv = conversations.find(c => c.id === activeConversationId);
  const activeMsgs = activeConversationId ? (messages[activeConversationId] || []) : [];
  const associatedBooking = activeConv?.bookingId ? bookings.find(b => b.id === activeConv.bookingId) : null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeConversationId && inputMessage.trim()) {
      sendMessage(activeConversationId, inputMessage.trim());
      setInputMessage('');
    }
  };

  return (
    <div className="min-h-[85vh] bg-[var(--bg-primary)] text-[var(--text-primary)] py-4 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[10px] font-semibold text-[var(--text-secondary)] mb-1">
              <Lock className="w-3 h-3 text-emerald-500" /> ENCRYPTED P2P MESSAGING
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">Rental Messages & Escrow Logs</h1>
          </div>
        </div>

        {/* Messaging Layout Container */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-xl overflow-hidden min-h-[600px] flex flex-col md:flex-row">

          {/* LEFT COLUMN: Conversation List */}
          <div className={`w-full md:w-80 lg:w-96 border-r border-[var(--border-subtle)] flex flex-col bg-[var(--bg-surface)]/50 ${activeConversationId ? 'hidden md:flex' : 'flex'
            }`}>

            {/* Search Filter */}
            <div className="p-3 border-b border-[var(--border-subtle)]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter chats by user or gear..."
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl py-2 pl-9 pr-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
                />
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* List Items */}
            <div className="flex-1 overflow-y-auto divide-y divide-[var(--border-subtle)]">
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center text-xs text-[var(--text-muted)]">
                  No active conversations match your query.
                </div>
              ) : (
                filteredConversations.map(conv => {
                  const isActive = conv.id === activeConversationId;
                  return (
                    <button
                      key={conv.id}
                      onClick={() => setActiveConversationId(conv.id)}
                      className={`w-full text-left p-3 flex items-start gap-3 transition-colors ${isActive ? 'bg-[var(--bg-card)] border-l-4 border-l-[var(--accent-primary)]' : 'hover:bg-[var(--bg-surface)]'
                        }`}
                    >
                      <div className="relative shrink-0">
                        <img
                          src={conv.productImage}
                          alt={conv.productTitle}
                          className="w-12 h-12 rounded-xl object-cover border border-[var(--border-subtle)]"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--bg-card)]" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-xs font-bold text-[var(--text-primary)] truncate max-w-[140px] sm:max-w-[180px]">
                            {conv.productTitle}
                          </h4>
                          <span className="text-[9px] text-[var(--text-muted)] shrink-0">{conv.lastMessageTimestamp}</span>
                        </div>

                        <p className="text-[11px] text-[var(--text-secondary)] font-medium truncate mb-1">
                          📦 {conv.otherUser.name}
                        </p>

                        <p className="text-[10px] text-[var(--text-muted)] truncate">
                          {conv.lastMessage}
                        </p>

                        {conv.bookingStatus && (
                          <span className={`inline-block mt-1 px-1.5 py-0.2 rounded text-[8px] font-bold uppercase tracking-wider ${conv.bookingStatus === 'escrow_secured'
                              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                            }`}>
                            {conv.bookingStatus.replace('_', ' ')}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Active Chat & Thread Details */}
          <div className={`flex-1 flex flex-col bg-[var(--bg-card)] ${!activeConversationId ? 'hidden md:flex items-center justify-center' : 'flex'
            }`}>
            {activeConv ? (
              <>
                {/* Active Chat Top Header */}
                <div className="p-3 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-surface)]/30">
                  <div className="flex items-center gap-3">
                    {/* Back Button for Mobile Viewport */}
                    <button
                      onClick={() => setActiveConversationId(null)}
                      className="md:hidden p-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <img
                      src={activeConv.otherUser.avatar}
                      alt={activeConv.otherUser.name}
                      className="w-9 h-9 rounded-full object-cover border border-[var(--border-subtle)]"
                    />

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                          {activeConv.otherUser.name}
                        </h3>
                        {activeConv.otherUser.isSuperhost && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-500 border border-amber-500/30 text-[8px] font-bold">
                            SUPERHOST
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)]">
                        {activeConv.otherUser.district} • Trust Score: {activeConv.otherUser.trustScore}/100
                      </p>
                    </div>
                  </div>

                  {associatedBooking && (
                    <button
                      onClick={() => setQrModalBooking(associatedBooking)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--bg-primary)] font-bold text-xs shadow-sm transition-all shrink-0"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Handover QR</span>
                    </button>
                  )}
                </div>

                {/* Sub-Banner Gear Card */}
                <div className="px-4 py-2 bg-[var(--bg-surface)]/60 border-b border-[var(--border-subtle)] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <img src={activeConv.productImage} alt="gear" className="w-6 h-6 rounded object-cover shrink-0" />
                    <span className="font-semibold text-[var(--text-primary)] truncate">{activeConv.productTitle}</span>
                    <span className="font-mono text-[var(--accent-primary)] font-bold shrink-0">৳{activeConv.productPrice}/day</span>
                  </div>
                  <Link
                    to={`/product/${activeConv.productId}`}
                    className="text-[10px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-0.5 shrink-0"
                  >
                    View Gear <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                {/* Messages Body */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-[350px] max-h-[480px]">
                  {activeMsgs.map((msg) => {
                    if (msg.isSystemEvent) {
                      return (
                        <div key={msg.id} className="p-3 my-2 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-start gap-3 text-xs">
                          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <span className="font-bold text-[var(--text-primary)] block text-xs">
                              {msg.senderName}
                            </span>
                            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                              {msg.text}
                            </p>
                            {msg.metadata?.qrCode && associatedBooking && (
                              <button
                                onClick={() => setQrModalBooking(associatedBooking)}
                                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold text-[10px]"
                              >
                                <QrCode className="w-3 h-3" /> Show Handover QR
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    }

                    const isMe = msg.senderId !== activeConv.otherUser.id;

                    return (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        <img
                          src={msg.senderAvatar || activeConv.otherUser.avatar}
                          alt={msg.senderName}
                          className="w-7 h-7 rounded-full object-cover shrink-0 mt-1 border border-[var(--border-subtle)]"
                        />
                        <div className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${isMe
                            ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)] font-medium rounded-tr-none'
                            : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-tl-none'
                          }`}>
                          <p>{msg.text}</p>
                          <span className={`text-[9px] block mt-1 ${isMe ? 'text-[var(--bg-primary)]/70 text-right' : 'text-[var(--text-muted)]'}`}>
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Send Input Bar */}
                <form onSubmit={handleSend} className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/30 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Message ${activeConv.otherUser.name.split(' ')[0]}...`}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl py-2.5 px-3.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--bg-primary)] font-bold transition-transform active:scale-95 shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto text-[var(--text-muted)]">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Select a Thread</h3>
                <p className="text-xs text-[var(--text-muted)] max-w-xs">
                  Choose a conversation from the left menu to view your chat log and escrow status.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
