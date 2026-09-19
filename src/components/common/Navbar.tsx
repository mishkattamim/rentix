import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  MapPin,
  PlusCircle,
  Bell,
  UserCheck,
  MessageSquare,
  X,
  Sparkles,
  ShieldCheck,
  SlidersHorizontal,
  ChevronDown,
  ShieldAlert,
  LogOut,
  User as UserIcon,
  Sun,
  Moon
} from 'lucide-react';
import { useRentix } from '../../context/RentixContext';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    isAuthenticated,
    isAdmin,
    logoutUser,
    searchQuery,
    setSearchQuery,
    notifications,
    markAllNotificationsRead,
    setIsAuthModalOpen,
    setAuthModalTab,
    setAuthModalReason,
    setIsLocationModalOpen,
    selectedDistrict,
    conversations,
    requireAuth
  } = useRentix();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs to handle auto-closing when clicking outside
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Auto-close dropdown popups on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Theme state persisted in localStorage
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rentix_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('rentix_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navigate = useNavigate();
  const location = useLocation();

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const unreadChats = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.pathname !== '/feed') {
      navigate('/feed');
    }
  };

  const handleListGearClick = () => {
    requireAuth(() => navigate('/list-item'), 'Please log in to list your hardware for rent');
  };

  const handleOpenLogin = () => {
    setAuthModalReason('Welcome back to Rentix Bangladesh');
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const handleOpenRegister = () => {
    setAuthModalReason('Create an account to rent and list hardware');
    setAuthModalTab('register');
    setIsAuthModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors">
      {/* Top Production Banner */}
      <div className="bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] py-1.5 px-3 sm:px-4 text-center text-xs text-[var(--text-secondary)] flex items-center justify-center gap-2 overflow-hidden">
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[var(--border-subtle)] text-[var(--text-primary)] border border-[var(--border-muted)] shrink-0">
          🇧🇩 BANGLADESH
        </span>
        <span className="font-medium truncate text-[11px] sm:text-xs">Rentix Network • Peer-to-Peer Gadgets & Accessories Rental Platform • Escrow Protected</span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">

          {/* Logo & Branding */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--accent-primary)] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-[var(--border-muted)] shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--bg-primary)] stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-[var(--text-primary)] transition-colors">
                    Rentix
                  </span>
                  <span className="text-[9px] sm:text-[10px] px-1 py-0.2 rounded bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] font-mono font-bold">
                    BD
                  </span>
                </div>
                <span className="hidden xs:inline text-[9px] sm:text-[10px] text-[var(--text-muted)] -mt-1 font-medium tracking-wide">
                  P2P Rental Platform
                </span>
              </div>
            </Link>

            {/* Location Selector Button (Desktop Only) */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:border-[var(--border-muted)] group"
              title="Change search location & radius"
            >
              <MapPin className="w-3.5 h-3.5 text-[var(--text-primary)] group-hover:animate-bounce" />
              <span className="font-medium max-w-[120px] truncate">{selectedDistrict}</span>
              <ChevronDown className="w-3 h-3 text-[var(--text-muted)]" />
            </button>
          </div>

          {/* Search Bar (Tablet/Desktop Only) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md relative mx-2"
          >
            <div className="relative w-full">
              <input
                type="text"
                autoComplete="off"
                placeholder="Search cameras, drones, lenses in Dhaka..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-full py-2 pl-10 pr-10 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--border-muted)] transition-all"
              />
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  ✕
                </button>
              )}
            </div>
          </form>

          {/* Right Action Icons & Auth Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

            {/* Explore Feed Link - Icon button on mobile, full label on desktop */}
            <Link
              to="/feed"
              className={`flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-xl border border-[var(--border-subtle)] transition-colors ${location.pathname === '/feed'
                ? 'text-[var(--text-primary)] bg-[var(--bg-surface)] border-[var(--border-muted)]'
                : 'text-[var(--text-secondary)] bg-[var(--bg-surface)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                }`}
              title="Explore Feed"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden lg:inline">Explore Feed</span>
            </Link>

            {/* List an Item CTA (Desktop Only) */}
            <button
              onClick={handleListGearClick}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--bg-primary)] font-semibold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>List Gear</span>
            </button>

            {/* Messages Icon (Desktop Only) */}
            {isAuthenticated && (
              <button
                onClick={() => {
                  setIsNotifOpen(false);
                  setIsUserMenuOpen(false);
                  navigate('/messages');
                }}
                className="hidden sm:flex relative p-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                title="Messages & Escrow Status"
              >
                <MessageSquare className="w-5 h-5" />
                {unreadChats > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1A1A1A] text-[#F8F7F4] dark:bg-[#F8F7F4] dark:text-[#1A1A1A] text-[10px] font-bold flex items-center justify-center leading-none shadow-sm">
                    {unreadChats}
                  </span>
                )}
              </button>
            )}

            {/* Notifications Dropdown (When Logged In) */}
            {isAuthenticated && (
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    setIsNotifOpen(!isNotifOpen);
                  }}
                  className="relative p-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  {unreadNotifs > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none animate-pulse">
                      {unreadNotifs}
                    </span>
                  )}
                </button>

                {/* Notification Popover */}
                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-sm rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl p-3 sm:p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-[var(--border-subtle)]">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[var(--text-primary)] text-xs sm:text-sm">Notifications</span>
                        {unreadNotifs > 0 && (
                          <span className="px-2 py-0.5 text-[10px] rounded-full bg-[var(--bg-surface)] text-[var(--text-primary)] font-mono border border-[var(--border-subtle)]">
                            {unreadNotifs} new
                          </span>
                        )}
                      </div>
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline"
                      >
                        Mark all as read
                      </button>
                    </div>

                    <div className="divide-y divide-[var(--border-subtle)] max-h-64 sm:max-h-72 overflow-y-auto mt-2">
                      {notifications.length === 0 ? (
                        <div className="py-6 text-center text-xs text-[var(--text-muted)]">
                          No notifications yet
                        </div>
                      ) : (
                        notifications.map(notif => (
                          <div
                            key={notif.id}
                            className={`py-2.5 px-2 rounded-lg transition-colors flex items-start gap-2.5 ${notif.read ? 'opacity-70 hover:bg-[var(--bg-surface)]' : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface)]/80'
                              }`}
                          >
                            <div className="p-1.5 rounded-lg bg-[var(--border-subtle)] text-[var(--text-primary)] mt-0.5 shrink-0">
                              <ShieldCheck className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{notif.title}</p>
                              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-relaxed line-clamp-2">{notif.message}</p>
                              <span className="text-[9px] text-[var(--text-muted)] mt-1 inline-block">{notif.timestamp}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Sun/Moon Theme Toggle Switch */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center justify-center"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 transition-colors" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-primary)] transition-colors" />
              )}
            </button>

            {/* DYNAMIC AUTH CONTROLS */}
            <div className="flex items-center pl-1 sm:pl-2 border-l border-[var(--border-subtle)]">

              {!isAuthenticated ? (
                /* GUEST BUTTONS */
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleOpenLogin}
                    className="px-2.5 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    Log In
                  </button>
                  <button
                    onClick={handleOpenRegister}
                    className="px-3 py-1.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--bg-primary)] text-xs font-bold shadow-md transition-all"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                /* LOGGED IN USER / ADMIN CHIP */
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => {
                      setIsNotifOpen(false);
                      setIsUserMenuOpen(!isUserMenuOpen);
                    }}
                    className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1.5 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] transition-all text-left"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={currentUser?.avatar}
                        alt={currentUser?.name}
                        className="w-7 h-7 sm:w-7 sm:h-7 rounded-full object-cover border border-[var(--border-muted)]"
                      />
                      {currentUser?.verified && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10B981] rounded-full border border-[var(--bg-primary)] flex items-center justify-center">
                          <UserCheck className="w-2 h-2 text-white stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="hidden md:flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold text-[var(--text-primary)] truncate max-w-[80px]">
                          {currentUser?.name.split(' ')[0]}
                        </span>
                        {isAdmin && (
                          <span className="px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[9px] font-bold font-mono">
                            ADMIN
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] text-[var(--text-muted)] truncate max-w-[80px]">
                        {currentUser?.district.split('(')[0]}
                      </span>
                    </div>

                    <ChevronDown className="w-3 h-3 text-[var(--text-muted)] shrink-0" />
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 sm:w-56 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-3 py-2 border-b border-[var(--border-subtle)] mb-1">
                        <p className="text-xs font-bold text-[var(--text-primary)] truncate">{currentUser?.name}</p>
                        <p className="text-[10px] text-[var(--text-muted)] font-mono truncate">{currentUser?.email}</p>
                      </div>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-colors mb-1"
                        >
                          <ShieldAlert className="w-4 h-4" />
                          Admin Portal
                        </Link>
                      )}

                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-[var(--text-muted)]" />
                        My Dashboard & Gear
                      </Link>

                      <Link
                        to="/messages"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-[var(--text-muted)]" />
                        Messages & Escrows
                      </Link>

                      <div className="pt-1 mt-1 border-t border-[var(--border-subtle)]">
                        <button
                          onClick={() => {
                            logoutUser();
                            setIsUserMenuOpen(false);
                            navigate('/');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Mobile Search/Menu Expand Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)]"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Expanded Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 px-1 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)] animate-in fade-in duration-200">
            <div className="mb-3">
              <button
                onClick={() => {
                  setIsLocationModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[var(--bg-surface)] text-xs text-[var(--text-secondary)] border border-[var(--border-subtle)] mb-2"
              >
                <span className="flex items-center gap-2 truncate">
                  <MapPin className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                  <span className="truncate">Location: {selectedDistrict}</span>
                </span>
                <span className="text-[var(--text-primary)] shrink-0 ml-1">Change ▾</span>
              </button>

              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search cameras, drones, tools in Dhaka..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl py-2 pl-9 pr-4 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
                />
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};