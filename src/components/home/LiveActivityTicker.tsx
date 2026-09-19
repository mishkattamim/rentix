import React from 'react';
import { Zap, ShieldCheck, QrCode, Sparkles } from 'lucide-react';
import { mockActivities } from '../../data/mockActivities';

export const LiveActivityTicker: React.FC = () => {
  // Duplicate array to enable seamless infinite horizontal marquee loop
  const tickerItems = [...mockActivities, ...mockActivities];

  return (
    <div className="w-full bg-[var(--bg-surface)] border-y border-[var(--border-subtle)] py-2.5 overflow-hidden relative shadow-inner text-[var(--text-primary)] transition-colors duration-200">
      
      {/* Gradient fade masks on left and right */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[var(--bg-surface)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[var(--bg-surface)] to-transparent z-10 pointer-events-none" />

      {/* Live Badge */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[10px] font-bold text-[var(--text-primary)] shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>LIVE FEED</span>
      </div>

      {/* Marquee Track */}
      <div className="flex animate-ticker pl-0 sm:pl-28">
        {tickerItems.map((act, index) => (
          <div
            key={`${act.id}-${index}`}
            className="flex items-center gap-2.5 mx-4 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] whitespace-nowrap hover:border-[var(--border-muted)] transition-colors shadow-sm"
          >
            <img
              src={act.userAvatar}
              alt={act.user}
              className="w-5 h-5 rounded-full object-cover border border-[var(--border-subtle)]"
            />
            <span className="font-semibold text-[var(--text-primary)]">{act.user}</span>
            <span className="text-[var(--text-secondary)]">{act.action}</span>
            <span className="text-[var(--text-primary)] font-medium">{act.item}</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="font-mono text-[var(--text-primary)] text-[11px] bg-[var(--bg-surface)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)] font-bold">
              {act.price}
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">({act.location}, {act.timeAgo})</span>
          </div>
        ))}
      </div>
    </div>
  );
};