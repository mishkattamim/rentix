import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, PlusCircle, MessageSquare, User } from 'lucide-react';
import { useRentix } from '../../context/RentixContext';

export const BottomNav: React.FC = () => {
  const { conversations } = useRentix();
  const unreadChats = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-surface)]/95 backdrop-blur-lg border-t border-[var(--border-subtle)] px-3 py-2 transition-colors">
      <div className="flex items-center justify-around">
        
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/feed"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`
          }
        >
          <Compass className="w-5 h-5" />
          <span>Explore</span>
        </NavLink>

        <NavLink
          to="/list-item"
          className="flex flex-col items-center -mt-5 group"
        >
          <div className="w-12 h-12 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-[var(--bg-primary)] shadow-lg border-2 border-[var(--border-muted)] group-hover:scale-105 transition-transform">
            <PlusCircle className="w-6 h-6 text-[var(--bg-primary)] stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-semibold text-[var(--text-primary)] mt-1">List</span>
        </NavLink>

        <NavLink
          to="/messages"
          className={({ isActive }) =>
            `relative flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`
          }
        >
          <MessageSquare className="w-5 h-5" />
          {unreadChats > 0 && (
            <span className="absolute -top-1 right-2 w-4 h-4 bg-[var(--accent-primary)] text-[var(--bg-primary)] text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadChats}
            </span>
          )}
          <span>Inbox</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`
          }
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </NavLink>

      </div>
    </nav>
  );
};
