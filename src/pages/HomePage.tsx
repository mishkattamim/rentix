import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Zap,
  Smartphone,
  ChevronRight,
  PlusCircle,
  SlidersHorizontal
} from 'lucide-react';
import { useRentix } from '../context/RentixContext';
import { mockCategories } from '../data/mockReviews';
import { LiveActivityTicker } from '../components/home/LiveActivityTicker';
import { HowItWorks } from '../components/home/HowItWorks';
import { EarningsCalculator } from '../components/home/EarningsCalculator';
import { ProductCard } from '../components/cards/ProductCard';
import { CategoryType } from '../types';

export const HomePage: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    selectedDistrict,
    setIsLocationModalOpen,
    requireAuth
  } = useRentix();

  const navigate = useNavigate();

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/feed');
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId as CategoryType);
    navigate('/feed');
  };

  const featuredTrending = products.filter(product => product.id !== 'prod-4').slice(0, 8);

  const heroTags = [
    { label: '📷 Cinema Cameras', query: 'cameras' },
    { label: '🚁 4K Drones', query: 'drones' },
    { label: '🏄 Action Cams', query: 'action-cams' },
    { label: '🎮 Handhelds & VR', query: 'gaming' },
    { label: '🎧 Studio Mics', query: 'audio' },
    { label: '🏕️ Trekking Tents', query: 'camping' },
    { label: '⚡ Power Stations', query: 'camping' }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-[var(--bg-primary)] border-b border-[var(--border-subtle)]">
        {/* Soft Ambient Radial Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[var(--accent-primary)]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm text-xs font-semibold text-[var(--text-secondary)]">
              <Sparkles className="w-3.5 h-3.5 text-[var(--text-primary)]" />
              <span>Bangladesh Peer-to-Peer Gadgets & Accessories Rental Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-[1.15]">
              Rent any gadget, <br />
              <span className="text-[var(--text-secondary)]">
                near you in minutes.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Access cinema cameras, DJI drones, VR headsets, lenses, and camping gear from verified creators in Dhaka, Chittagong, and Sylhet. Protected by 100% smart escrow deposits in Bangladeshi Taka (৳).
            </p>

            {/* Search Box Bar */}
            <div className="pt-3 max-w-2xl mx-auto">
              <form
                onSubmit={handleHeroSearch}
                className="p-2 bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] focus-within:border-[var(--border-muted)] rounded-2xl sm:rounded-full shadow-lg flex flex-col sm:flex-row items-center gap-2 transition-all"
              >
                {/* Search Input */}
                <div className="flex items-center gap-2.5 px-4 py-2 w-full flex-1">
                  <Search className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search Sony FX3, DJI Mini 4, Vision Pro, RØDE Mics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
                  />
                </div>

                {/* Location Node Selector */}
                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors w-full sm:w-auto justify-center"
                >
                  <MapPin className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                  <span className="truncate max-w-[120px] font-medium">{selectedDistrict}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">Edit ▾</span>
                </button>

                {/* Search CTA */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-full bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--bg-primary)] font-bold text-sm shadow-md flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02]"
                >
                  Find Gear <ArrowRight className="w-4 h-4 text-[var(--bg-primary)]" />
                </button>
              </form>

              {/* Quick Tags */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
                <span className="text-xs text-[var(--text-muted)] mr-1">Popular in Dhaka:</span>
                {heroTags.map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleCategoryClick(tag.query)}
                    className="text-xs px-3 py-1 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:border-[var(--border-muted)]"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Value Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>100% Escrow Security in BDT (৳)</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[var(--text-primary)]" />
                <span>Dual QR Handover Protocol</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Instant bKash / Card Payouts</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. LIVE MARQUEE TICKER */}
      <LiveActivityTicker />

      {/* 3. CATEGORIES SECTION */}
      <section className="py-16 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                Browse Hardware by Category
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                Explore pro cinematography, aerial drones, gaming, and creator essentials in Bangladesh
              </p>
            </div>

            <Link
              to="/feed"
              className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1"
            >
              View All 20 Gear <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {mockCategories.filter(c => c.id !== 'all').map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className="group p-4 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-muted)] text-left transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] flex flex-col justify-between"
              >
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div>
                  <span className="font-bold text-[var(--text-primary)] text-xs block transition-colors">
                    {cat.label}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] block mt-0.5 font-mono">
                    {cat.count} listings
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRENDING NEAR YOU CAROUSEL & GRID */}
      <section className="py-16 bg-[var(--bg-surface)] border-y border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] text-xs font-semibold mb-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--text-primary)]" /> VERIFIED GEAR IN DHAKA & BD NODES
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                Trending Near You
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                Highest rated gadgets ready for instant in-person pickup with QR escrow
              </p>
            </div>

            <Link
              to="/feed"
              className="px-4 py-2 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--text-primary)]" />
              Open Live Feed & Map
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTrending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. 5-STEP HOW RENTIX WORKS */}
      <HowItWorks />

      {/* 6. INCOME CALCULATOR */}
      <EarningsCalculator />

      {/* 7. BOTTOM PROMO BANNER */}
      <section className="py-16 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[var(--bg-card)] flex items-center justify-center mx-auto shadow-md border border-[var(--border-subtle)]">
            <Sparkles className="w-7 h-7 text-[var(--text-primary)]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)]">
            Have high-end hardware lying idle?
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
            Join hundreds of cinematographers, pilots, and creators in Dhaka earning passive BDT income securely on Rentix.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => requireAuth(() => navigate('/list-item'), 'Please log in to list your hardware')}
              className="px-6 py-3.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--bg-primary)] font-bold text-sm shadow-md transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-[var(--bg-primary)]" />
              List Gear in 2 Minutes
            </button>

            <Link
              to="/feed"
              className="px-6 py-3.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold text-sm transition-colors"
            >
              Explore Rentable Gear
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};