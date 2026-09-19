import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  Users, 
  Package, 
  DollarSign, 
  ShieldCheck, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Lock, 
  LogIn, 
  ArrowLeft,
  Sparkles,
  QrCode,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useRentix } from '../context/RentixContext';

export const AdminPage: React.FC = () => {
  const { 
    currentUser, 
    isAdmin, 
    users, 
    deleteUser, 
    toggleUserVerification, 
    products, 
    deleteProduct, 
    toggleProductAvailability,
    bookings,
    setIsAuthModalOpen,
    setAuthModalTab,
    setAuthModalReason
  } = useRentix();

  const navigate = useNavigate();
  const [activeAdminTab, setActiveAdminTab] = useState<'users' | 'products' | 'escrows'>('users');
  const [userSearch, setUserSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // ACCESS DENIED VIEW (If not admin)
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#09121D] text-[#CBD6D3] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0C2B35] border-2 border-rose-500/60 rounded-3xl p-8 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500 text-rose-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold font-mono border border-rose-500/30">
            HTTP 403: ACCESS FORBIDDEN
          </div>

          <h2 className="text-2xl font-black text-white">Admin Authorization Required</h2>
          <p className="text-xs text-[#CBD6D3]/70 leading-relaxed">
            The Rentix Management Portal is restricted to platform administrators. Please sign in with an administrator account to access user and listing purge controls.
          </p>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setAuthModalReason('Please sign in as Admin to access /admin');
                setAuthModalTab('login');
                setIsAuthModalOpen(true);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 transition-all"
            >
              <LogIn className="w-4 h-4" /> Sign In as Admin (Quick Fill: admin / admin123)
            </button>

            <Link
              to="/"
              className="block w-full py-2.5 rounded-xl bg-[#09121D] hover:bg-[#071C23] border border-[#4A7071] text-xs text-[#CBD6D3] hover:text-white transition-colors"
            >
              ← Return to Rentix Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Platform Statistics
  const totalVolume = bookings.reduce((acc, b) => acc + b.totalAmount, 0) + 1250000;
  const activeEscrowAmount = bookings
    .filter(b => b.status === 'escrow_secured' || b.status === 'active_rental')
    .reduce((acc, b) => acc + b.totalAmount, 0);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.district.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.district.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.categoryLabel.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleDeleteUserClick = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This will also permanently PURGE all their active listings from the platform!')) {
      deleteUser(userId);
    }
  };

  const handleDeleteProductClick = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product listing from the platform?')) {
      deleteProduct(productId);
    }
  };

  return (
    <div className="min-h-screen bg-[#09121D] text-[#CBD6D3] pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-bold font-mono mb-2">
              👑 ADMIN MANAGEMENT PORTAL
            </div>
            <h1 className="text-3xl font-black text-white">
              Rentix System Administration
            </h1>
            <p className="text-xs text-[#CBD6D3]/70 mt-1">
              Live moderation, user account purges, listing revocation, and escrow oversight in Bangladesh
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#CBD6D3]/70">
              Logged in: <strong className="text-white">{currentUser?.name}</strong> ({currentUser?.role})
            </span>
            <Link
              to="/feed"
              className="px-4 py-2 rounded-xl bg-[#0C2B35] hover:bg-[#103A47] border border-[#4A7071] text-xs font-semibold text-white transition-colors"
            >
              Public Feed View ↗
            </Link>
          </div>
        </div>

        {/* 4 PLATFORM OVERVIEW STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-[#0C2B35] border border-[#4A7071]/50 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#CBD6D3]/60">Total Registered Users</span>
              <div className="p-2 rounded-xl bg-[#83B2A8]/20 text-[#83B2A8]">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-white font-mono">{users.length}</div>
            <span className="text-[10px] text-[#83B2A8] block mt-1">20 Seeded + Custom Registrations</span>
          </div>

          <div className="bg-[#0C2B35] border border-[#4A7071]/50 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#CBD6D3]/60">Active Hardware Listings</span>
              <div className="p-2 rounded-xl bg-[#83B2A8]/20 text-[#83B2A8]">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-white font-mono">{products.length}</div>
            <span className="text-[10px] text-[#83B2A8] block mt-1">Across 11 Hardware Categories</span>
          </div>

          <div className="bg-[#0C2B35] border border-[#4A7071]/50 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#CBD6D3]/60">Total Rental Volume</span>
              <div className="p-2 rounded-xl bg-[#10B981]/20 text-[#10B981]">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#10B981] font-mono">৳{totalVolume.toLocaleString()}</div>
            <span className="text-[10px] text-[#CBD6D3]/60 block mt-1">Gross Platform Transactions (BDT)</span>
          </div>

          <div className="bg-[#0C2B35] border border-[#4A7071]/50 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#CBD6D3]/60">Locked in Smart Escrow</span>
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-amber-400 font-mono">৳{activeEscrowAmount.toLocaleString()}</div>
            <span className="text-[10px] text-[#CBD6D3]/60 block mt-1">Awaiting Return QR Handshakes</span>
          </div>

        </div>

        {/* ADMIN TABS NAVIGATION */}
        <div className="flex bg-[#0C2B35] p-1.5 rounded-2xl border border-[#4A7071]/50 mb-6 max-w-md">
          <button
            onClick={() => setActiveAdminTab('users')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeAdminTab === 'users'
                ? 'bg-[#83B2A8] text-[#09121D] shadow-md'
                : 'text-[#CBD6D3] hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> User Management ({users.length})
          </button>

          <button
            onClick={() => setActiveAdminTab('products')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeAdminTab === 'products'
                ? 'bg-[#83B2A8] text-[#09121D] shadow-md'
                : 'text-[#CBD6D3] hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" /> Listings ({products.length})
          </button>

          <button
            onClick={() => setActiveAdminTab('escrows')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeAdminTab === 'escrows'
                ? 'bg-[#83B2A8] text-[#09121D] shadow-md'
                : 'text-[#CBD6D3] hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" /> Escrows ({bookings.length})
          </button>
        </div>

        {/* TAB 1: USERS MANAGEMENT */}
        {activeAdminTab === 'users' && (
          <div className="bg-[#0C2B35] border border-[#4A7071] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white">Registered Users & Personas</h3>
                <p className="text-xs text-[#CBD6D3]/60">Manage accounts, toggle ISD verifications, or delete abusive users</p>
              </div>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search by name, username, phone..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-[#CBD6D3]/40 focus:border-[#83B2A8] focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-[#83B2A8] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#4A7071]/30">
              <table className="w-full text-left text-xs divide-y divide-[#4A7071]/30">
                <thead className="bg-[#09121D] text-[#CBD6D3]/70 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">User</th>
                    <th className="py-3.5 px-4">Username / Email</th>
                    <th className="py-3.5 px-4">Phone</th>
                    <th className="py-3.5 px-4">District</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">Verification</th>
                    <th className="py-3.5 px-4">Rentals</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4A7071]/20">
                  {filteredUsers.map((u) => {
                    const userListingsCount = products.filter(p => p.ownerId === u.id).length;

                    return (
                      <tr key={u.id} className="hover:bg-[#103A47]/60 transition-colors">
                        <td className="py-3 px-4 flex items-center gap-2.5">
                          <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-[#83B2A8]" />
                          <div>
                            <span className="font-bold text-white block">{u.name}</span>
                            <span className="text-[10px] text-[#83B2A8]">★ {u.rating} ({u.reviewCount})</span>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-mono text-[11px]">
                          <span className="text-white block font-semibold">{u.username}</span>
                          <span className="text-[#CBD6D3]/50 text-[10px]">{u.email}</span>
                        </td>

                        <td className="py-3 px-4 font-mono text-[11px] text-[#CBD6D3]">
                          {u.phone}
                        </td>

                        <td className="py-3 px-4 text-[#CBD6D3]/80">
                          {u.district}
                        </td>

                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                            u.role === 'admin'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : 'bg-[#83B2A8]/20 text-[#83B2A8] border border-[#83B2A8]/40'
                          }`}>
                            {u.role.toUpperCase()}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleUserVerification(u.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                              u.verified
                                ? 'bg-[#10B981]/20 text-[#10B981] hover:bg-[#10B981]/30'
                                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                            }`}
                          >
                            {u.verified ? '✓ Verified' : '○ Unverified'}
                          </button>
                        </td>

                        <td className="py-3 px-4 font-mono text-center">
                          <span className="text-white font-bold">{u.completedRentals}</span>
                          <span className="text-[10px] text-[#CBD6D3]/50 block">({userListingsCount} gears)</span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          {u.role !== 'admin' ? (
                            <button
                              onClick={() => handleDeleteUserClick(u.id)}
                              className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                              title="Delete user account and purge all their listings"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          ) : (
                            <span className="text-[10px] text-[#CBD6D3]/40 italic">Protected</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeAdminTab === 'products' && (
          <div className="bg-[#0C2B35] border border-[#4A7071] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white">Live Hardware Listings</h3>
                <p className="text-xs text-[#CBD6D3]/60">Revoke flagged gear, modify status, or inspect rental rates</p>
              </div>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search listings by title, brand, district..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-[#CBD6D3]/40 focus:border-[#83B2A8] focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-[#83B2A8] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#4A7071]/30">
              <table className="w-full text-left text-xs divide-y divide-[#4A7071]/30">
                <thead className="bg-[#09121D] text-[#CBD6D3]/70 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Hardware Item</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Owner / District</th>
                    <th className="py-3.5 px-4">Daily Rate</th>
                    <th className="py-3.5 px-4">Deposit</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4A7071]/20">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#103A47]/60 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img src={p.images[0]} alt={p.title} className="w-10 h-10 rounded-xl object-cover border border-[#4A7071]" />
                        <div className="max-w-[220px]">
                          <span className="font-bold text-white truncate block">{p.title}</span>
                          <span className="text-[10px] text-[#CBD6D3]/60">{p.brand} • {p.condition}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#09121D] text-[#83B2A8] text-[10px] font-semibold">
                          {p.categoryLabel}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-white font-medium block">{p.owner?.name || 'Owner'}</span>
                        <span className="text-[10px] text-[#CBD6D3]/60">{p.district}</span>
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-white">
                        ৳{p.dailyRate.toLocaleString()}
                      </td>

                      <td className="py-3 px-4 font-mono text-[#83B2A8]">
                        ৳{p.securityDeposit.toLocaleString()}
                      </td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleProductAvailability(p.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            p.isAvailable
                              ? 'bg-[#10B981]/20 text-[#10B981]'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {p.isAvailable ? '● Active' : '○ Paused'}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteProductClick(p.id)}
                          className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                          title="Revoke and delete this listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ESCROW & TRANSACTIONS AUDITS */}
        {activeAdminTab === 'escrows' && (
          <div className="bg-[#0C2B35] border border-[#4A7071] rounded-3xl p-6 shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">Smart Escrow Audit Ledger</h3>
              <p className="text-xs text-[#CBD6D3]/60">Cryptographic QR handshake verification records across Dhaka nodes</p>
            </div>

            <div className="space-y-3">
              {bookings.map((b) => (
                <div key={b.id} className="bg-[#09121D] p-4 rounded-2xl border border-[#4A7071]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={b.productImage} alt="gear" className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#83B2A8] font-bold">{b.id}</span>
                        <span className="px-2 py-0.2 rounded bg-[#0C2B35] text-[10px] font-semibold uppercase text-white">
                          {b.status.replace('_', ' ')}
                        </span>
                      </div>
                      <h4 className="text-white font-bold mt-0.5">{b.productTitle}</h4>
                      <p className="text-[10px] text-[#CBD6D3]/60 font-mono">QR: {b.qrCode}</p>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-base font-black text-white block">৳{b.totalAmount.toLocaleString()}</span>
                    <span className="text-[10px] text-[#83B2A8]">Deposit: ৳{b.securityDeposit.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
