import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Lock, QrCode, Heart, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] text-[var(--text-secondary)] pt-14 pb-20 md:pb-12 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[var(--border-subtle)]">
          
          {/* Col 1: Brand & Commercial Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent-primary)] flex items-center justify-center border border-[var(--border-muted)]">
                <Sparkles className="w-4 h-4 text-[var(--bg-primary)] stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-[var(--text-primary)]">Rentix</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-primary)] border border-[var(--border-muted)] font-mono font-bold">
                BD
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Rentix is Bangladesh's premier Peer-to-Peer (P2P) gear and gadget rental marketplace. Built to eliminate idle hardware waste through instant neighborhood discovery, verified escrows, and QR handovers.
            </p>
            
            <div className="flex items-center gap-4 text-xs text-[var(--text-primary)]">
              <span className="flex items-center gap-1.5 font-medium">
                <Shield className="w-3.5 h-3.5 text-[#10B981]" /> 100% Escrow Guarantee
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <QrCode className="w-3.5 h-3.5 text-[var(--text-muted)]" /> QR Handshake Protocol
              </span>
            </div>
          </div>

          {/* Col 2: Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4">Explore Gear</h4>
            <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
              <li><Link to="/feed" className="hover:text-[var(--text-primary)] transition-colors">Cinema & Mirrorless</Link></li>
              <li><Link to="/feed" className="hover:text-[var(--text-primary)] transition-colors">Drones & FPV Aerial</Link></li>
              <li><Link to="/feed" className="hover:text-[var(--text-primary)] transition-colors">Spatial VR & Consoles</Link></li>
              <li><Link to="/feed" className="hover:text-[var(--text-primary)] transition-colors">Studio & Audio Gear</Link></li>
              <li><Link to="/feed" className="hover:text-[var(--text-primary)] transition-colors">Bikes & Urban Scooters</Link></li>
            </ul>
          </div>

          {/* Col 3: Community & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4">P2P Trust & Safety</h4>
            <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
              <li><a href="#how-it-works" className="hover:text-[var(--text-primary)] transition-colors">How Rentix Works</a></li>
              <li><Link to="/feed" className="hover:text-[var(--text-primary)] transition-colors">Verified Member Matrix</Link></li>
              <li><Link to="/list-item" className="hover:text-[var(--text-primary)] transition-colors">Lender Protection Policy</Link></li>
              <li><Link to="/messages" className="hover:text-[var(--text-primary)] transition-colors">Escrow Deposit Protocol</Link></li>
              <li><Link to="/profile" className="hover:text-[var(--text-primary)] transition-colors">Community Trust Score</Link></li>
            </ul>
          </div>

          {/* Col 4: Platform & Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4">Platform & Resources</h4>
            <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
              <li><Link to="/feed" className="hover:text-[var(--text-primary)] transition-colors">About Rentix</Link></li>
              <li><Link to="/feed" className="hover:text-[var(--text-primary)] transition-colors">Dhaka Hub Locations</Link></li>
              <li><Link to="/feed" className="hover:text-[var(--text-primary)] transition-colors">Verified Escrow Policy</Link></li>
              <li><Link to="/feed" className="hover:text-[var(--text-primary)] transition-colors">Trust & Safety Rules</Link></li>
              <li><Link to="/feed" className="hover:text-[var(--text-primary)] transition-colors">Community Guidelines</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>© 2026 Rentix Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Terms of Rental</span>
            <span className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Security Audits</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
