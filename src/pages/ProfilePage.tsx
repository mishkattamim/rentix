import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  UserCheck,
  Star,
  MapPin,
  PlusCircle,
  ShieldCheck,
  QrCode,
  Calendar,
  Trash2,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Wallet,
  ArrowUpRight,
  Lock,
  LogIn
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRentix } from '../context/RentixContext';
import { ProductCard } from '../components/cards/ProductCard';

export const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    currentUser,
    users,
    products,
    bookings,
    wishlist,
    toggleProductAvailability,
    deleteProduct,
    setQrModalBooking,
    setIsAuthModalOpen,
    setAuthModalTab,
    setAuthModalReason
  } = useRentix();

  // If viewing another profile or default current user
  const profileUser = id ? (users.find(u => u.id === id) || currentUser) : currentUser;

  const [activeTab, setActiveTab] = useState<'gear' | 'active_rentals' | 'history' | 'wishlist' | 'wallet'>('gear');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawnSuccess, setWithdrawnSuccess] = useState(false);

  // Guest Lock Screen if user is not signed in and not viewing a specific user ID
  if (!profileUser) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 w-full overflow-x-hidden bg-[#09121D]">
        <div className="max-w-md w-full bg-[#0C2B35] border border-[#4A7071] rounded-3xl p-8 text-center shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#09121D] border border-[#83B2A8] text-[#83B2A8] flex items-center justify-center mx-auto shadow-lg">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#09121D] border border-[#83B2A8]/30 text-xs font-semibold text-[#83B2A8]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" /> Verified Member Profiles
            </div>
            <h2 className="text-2xl font-black text-white">Sign In to Access Profile</h2>
            <p className="text-xs text-[#CBD6D3]/70 leading-relaxed max-w-sm mx-auto">
              Please sign in to view your profile dashboard, track active rentals, manage listed gear, and inspect escrow wallet earnings.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setAuthModalReason('Sign in to access your Rentix profile & wallet');
                setAuthModalTab('login');
                setIsAuthModalOpen(true);
              }}
              className="flex-1 py-3 rounded-xl bg-[#83B2A8] hover:bg-[#97c7bd] text-[#09121D] font-bold text-xs shadow-md transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Sign In
            </button>
            <button
              onClick={() => {
                setAuthModalReason('Create an account to start renting and listing gear');
                setAuthModalTab('register');
                setIsAuthModalOpen(true);
              }}
              className="flex-1 py-3 rounded-xl bg-[#09121D] hover:bg-[#103A47] border border-[#4A7071] text-[#CBD6D3] hover:text-white font-semibold text-xs transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter user's listed gear
  const userProducts = products.filter(p => p.ownerId === profileUser.id);

  // Filter user's active bookings (as renter or owner)
  const userActiveBookings = bookings.filter(b =>
    (b.renterId === profileUser.id || b.ownerId === profileUser.id) &&
    (b.status === 'escrow_secured' || b.status === 'active_rental')
  );

  // Filter completed bookings
  const userPastBookings = bookings.filter(b =>
    (b.renterId === profileUser.id || b.ownerId === profileUser.id) &&
    b.status === 'completed'
  );

  // Wishlist products
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleWithdraw = () => {
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      setWithdrawnSuccess(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      setTimeout(() => setWithdrawnSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#09121D] text-[#CBD6D3] pb-24 pt-6 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* PROFILE HERO HEADER - STATIC SOLID BACKGROUND */}
        <div className="bg-[#0C2B35] border border-[#4A7071] rounded-3xl p-6 sm:p-8 shadow-2xl relative mb-8">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">

            {/* Avatar & Main Info */}
            <div className="flex items-start sm:items-center gap-5">
              <div className="relative flex-shrink-0">
                <img
                  src={profileUser.avatar}
                  alt={profileUser.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-[#83B2A8] shadow-xl"
                />
                {profileUser.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#10B981] rounded-full border-2 border-[#09121D] flex items-center justify-center shadow-md">
                    <UserCheck className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">{profileUser.name}</h1>
                  {profileUser.isSuperhost && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#09121D] text-[#83B2A8] border border-[#83B2A8]/50 text-xs font-bold font-mono">
                      ★ SUPERHOST
                    </span>
                  )}
                  {profileUser.verified && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#09121D] text-[#10B981] border border-[#10B981]/50 text-xs font-semibold">
                      Verified Member
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#CBD6D3] mt-1.5">
                  <span className="flex items-center gap-1 text-[#83B2A8] font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    {profileUser.rating} ({profileUser.reviewCount} reviews)
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#CBD6D3]">
                    <MapPin className="w-3.5 h-3.5 text-[#83B2A8]" />
                    {profileUser.district}
                  </span>
                  <span>•</span>
                  <span className="text-[#CBD6D3]">Member since {profileUser.memberSince}</span>
                </div>

                <p className="text-xs text-[#CBD6D3] mt-2 max-w-xl line-clamp-2">
                  {profileUser.bio}
                </p>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2 flex-shrink-0">
              <Link
                to="/feed"
                className="px-4 py-2.5 rounded-xl bg-[#09121D] hover:bg-[#103A47] border border-[#83B2A8] text-xs text-[#83B2A8] font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Browse Gear Feed
              </Link>

              <Link
                to="/list-item"
                className="px-4 py-2.5 rounded-xl bg-[#83B2A8] hover:bg-[#97c7bd] text-[#09121D] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-105"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                List New Gear
              </Link>
            </div>

          </div>

          {/* STATS BAR - SOLID STATIC CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#4A7071]">
            <div className="bg-[#09121D] p-4 rounded-2xl border border-[#4A7071] text-center shadow-md">
              <span className="text-[10px] uppercase font-bold text-[#CBD6D3] tracking-wider block mb-1">
                Completed Rentals
              </span>
              <span className="text-xl font-black text-white font-mono">{profileUser.completedRentals}</span>
            </div>

            <div className="bg-[#09121D] p-4 rounded-2xl border border-[#4A7071] text-center shadow-md">
              <span className="text-[10px] uppercase font-bold text-[#CBD6D3] tracking-wider block mb-1">
                Trust Score
              </span>
              <span className="text-xl font-black text-[#10B981] font-mono">{profileUser.trustScore}/100</span>
            </div>

            <div className="bg-[#09121D] p-4 rounded-2xl border border-[#4A7071] text-center shadow-md">
              <span className="text-[10px] uppercase font-bold text-[#CBD6D3] tracking-wider block mb-1">
                Response Time
              </span>
              <span className="text-xl font-black text-[#83B2A8] font-mono">{profileUser.responseTime}</span>
            </div>

            <div className="bg-[#09121D] p-4 rounded-2xl border border-[#4A7071] text-center shadow-md">
              <span className="text-[10px] uppercase font-bold text-[#CBD6D3] tracking-wider block mb-1">
                Total Earnings
              </span>
              <span className="text-xl font-black text-white font-mono">৳{profileUser.earnings.toLocaleString()}</span>
            </div>
          </div>

        </div>

        {/* DASHBOARD TABS NAVIGATION */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-[#4A7071] no-scrollbar">
          {[
            { id: 'gear', label: 'Listed Gear', icon: '📦', count: userProducts.length },
            { id: 'active_rentals', label: 'Active Rentals & Escrows', icon: '🔄', count: userActiveBookings.length },
            { id: 'history', label: 'Rental History', icon: '📜', count: userPastBookings.length },
            { id: 'wishlist', label: 'Saved Wishlist', icon: '❤️', count: wishlistProducts.length },
            { id: 'wallet', label: 'Earnings & Wallet', icon: '💳', count: null }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === tab.id
                ? 'bg-[#83B2A8] text-[#09121D] shadow-md scale-[1.02]'
                : 'bg-[#0C2B35] text-[#CBD6D3] hover:text-white border border-[#4A7071] hover:border-[#83B2A8]'
                }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${activeTab === tab.id ? 'bg-[#09121D] text-[#83B2A8]' : 'bg-[#09121D] text-[#83B2A8]'
                  }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: LISTED GEAR */}
        {activeTab === 'gear' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Hardware Listed for Rent</h3>
                <p className="text-xs text-[#CBD6D3]">Manage your items, toggle availability, or add new gear</p>
              </div>
              <Link
                to="/list-item"
                className="px-4 py-2 rounded-xl bg-[#83B2A8] text-[#09121D] font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <PlusCircle className="w-4 h-4" /> Add Gear
              </Link>
            </div>

            {userProducts.length === 0 ? (
              <div className="bg-[#0C2B35] border border-[#4A7071] rounded-3xl p-12 text-center">
                <p className="text-xs text-[#CBD6D3] mb-4">No gear listed yet by this user.</p>
                <Link to="/list-item" className="px-5 py-2.5 rounded-xl bg-[#83B2A8] text-[#09121D] font-bold text-xs">
                  Create First Listing
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProducts.map((p) => (
                  <div key={p.id} className="relative">
                    <ProductCard product={p} viewMode="grid" />

                    {/* Owner Management Bar */}
                    <div className="mt-2 bg-[#0C2B35] p-2.5 rounded-xl border border-[#4A7071] flex items-center justify-between text-xs">
                      <button
                        onClick={() => toggleProductAvailability(p.id)}
                        className={`px-2.5 py-1 rounded-lg font-bold text-[10px] transition-colors ${p.isAvailable
                          ? 'bg-[#09121D] text-[#10B981] border border-[#10B981]'
                          : 'bg-[#09121D] text-rose-400 border border-rose-500'
                          }`}
                      >
                        {p.isAvailable ? '● Available' : '○ Paused'}
                      </button>

                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-[#09121D] transition-colors"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ACTIVE RENTALS & ESCROWS */}
        {activeTab === 'active_rentals' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Active Rental Contracts & Escrows</h3>
              <p className="text-xs text-[#CBD6D3]">Items currently locked in Smart Escrow or actively in field use</p>
            </div>

            {userActiveBookings.length === 0 ? (
              <div className="bg-[#0C2B35] border border-[#4A7071] rounded-3xl p-12 text-center">
                <p className="text-xs text-[#CBD6D3] mb-4">No active rentals at the moment.</p>
                <Link to="/feed" className="px-5 py-2.5 rounded-xl bg-[#83B2A8] text-[#09121D] font-bold text-xs">
                  Browse Feed & Rent Gear
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userActiveBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-[#0C2B35] border border-[#83B2A8] rounded-3xl p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <img
                        src={b.productImage}
                        alt={b.productTitle}
                        className="w-16 h-16 rounded-2xl object-cover border border-[#4A7071]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.2 rounded bg-[#09121D] text-[#83B2A8] text-[10px] font-bold font-mono">
                            {b.status.toUpperCase().replace('_', ' ')}
                          </span>
                          <span className="text-xs text-[#CBD6D3]">ID: {b.id}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-0.5">{b.productTitle}</h4>
                        <div className="flex items-center gap-3 text-xs text-[#CBD6D3] mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#83B2A8]" />
                            {b.startDate} to {b.endDate} ({b.days} days)
                          </span>
                          <span>•</span>
                          <span className="font-mono text-[#83B2A8] font-bold">৳{b.totalAmount.toFixed(2)} in Escrow</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                      <button
                        onClick={() => setQrModalBooking(b)}
                        className="px-4 py-2.5 rounded-xl bg-[#83B2A8] text-[#09121D] font-bold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                      >
                        <QrCode className="w-4 h-4" />
                        Show / Scan QR Handshake
                      </button>

                      <Link
                        to="/messages"
                        className="px-3.5 py-2.5 rounded-xl bg-[#09121D] hover:bg-[#103A47] border border-[#4A7071] text-xs text-white transition-colors"
                      >
                        Chat
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PAST RENTAL HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Past Completed Rentals</h3>
              <p className="text-xs text-[#CBD6D3]">History of verified return handovers and released security deposits</p>
            </div>

            {userPastBookings.length === 0 ? (
              <div className="bg-[#0C2B35] border border-[#4A7071] rounded-3xl p-12 text-center">
                <p className="text-xs text-[#CBD6D3]">No completed rentals yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {userPastBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-[#0C2B35] border border-[#4A7071] rounded-2xl p-4 flex items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img src={b.productImage} alt="gear" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-white">{b.productTitle}</h4>
                        <span className="text-[11px] text-[#CBD6D3]">
                          {b.startDate} → {b.endDate} • Completed & Verified
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded bg-[#09121D] text-[#10B981] border border-[#10B981]/50 font-semibold text-[10px] block">
                        ✓ Deposit ৳{b.securityDeposit} Refunded
                      </span>
                      <span className="font-mono text-white font-bold mt-1 block">
                        Paid ৳{b.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SAVED WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Saved Gear Wishlist</h3>
              <p className="text-xs text-[#CBD6D3]">Items bookmarked for future projects and productions</p>
            </div>

            {wishlistProducts.length === 0 ? (
              <div className="bg-[#0C2B35] border border-[#4A7071] rounded-3xl p-12 text-center">
                <p className="text-xs text-[#CBD6D3] mb-4">Your wishlist is currently empty.</p>
                <Link to="/feed" className="px-5 py-2.5 rounded-xl bg-[#83B2A8] text-[#09121D] font-bold text-xs">
                  Explore Gear to Bookmark
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map((p) => (
                  <ProductCard key={p.id} product={p} viewMode="grid" />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: WALLET & EARNINGS */}
        {activeTab === 'wallet' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Rentix Smart Escrow Wallet</h3>
              <p className="text-xs text-[#CBD6D3]">Earnings balance, escrow holdings, and instant automated payouts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Card 1: Available Balance */}
              <div className="bg-[#0C2B35] border-2 border-[#83B2A8] rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#CBD6D3]">Available for Payout</span>
                  <Wallet className="w-5 h-5 text-[#83B2A8]" />
                </div>
                <div className="text-4xl font-black text-white font-mono">
                  ৳{profileUser.earnings.toLocaleString()}.00
                </div>
                <p className="text-[11px] text-[#83B2A8]">
                  Zero withdrawal fees via bKash / Nagad / Local Bank Transfer
                </p>

                <button
                  onClick={handleWithdraw}
                  disabled={isWithdrawing}
                  className="w-full py-3 rounded-xl bg-[#83B2A8] hover:bg-[#97c7bd] text-[#09121D] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
                >
                  {isWithdrawing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Initiating Wire Transfer...
                    </>
                  ) : withdrawnSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#09121D]" />
                      Payout Sent to Bank/bKash!
                    </>
                  ) : (
                    <>
                      <ArrowUpRight className="w-4 h-4" />
                      Withdraw Available Balance
                    </>
                  )}
                </button>
              </div>

              {/* Card 2: Escrow Holdings */}
              <div className="bg-[#0C2B35] border border-[#4A7071] rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#CBD6D3]">Active Escrow Locked</span>
                  <ShieldCheck className="w-5 h-5 text-[#10B981]" />
                </div>
                <div className="text-4xl font-black text-[#10B981] font-mono">
                  ৳38,500
                </div>
                <p className="text-[11px] text-[#CBD6D3] leading-relaxed">
                  Held safely in Rentix Smart Escrow contract until active rentals are returned and scanned.
                </p>
                <div className="pt-2 text-xs text-[#83B2A8] font-semibold">
                  1 Active Handshake Escrow
                </div>
              </div>

              {/* Card 3: Security & Insurance */}
              <div className="bg-[#0C2B35] border border-[#4A7071] rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#CBD6D3]">Lender Protection Guarantee</span>
                  <Sparkles className="w-5 h-5 text-[#83B2A8]" />
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  ৳500,000 Cap
                </div>
                <p className="text-[11px] text-[#CBD6D3] leading-relaxed">
                  Rentix Hardware Protection coverage covers verified physical damage, water ingress, and theft during rental periods.
                </p>
                <div className="text-[11px] text-[#10B981] flex items-center gap-1 font-semibold">
                  <UserCheck className="w-3.5 h-3.5" /> ID Verified Handover Active
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};