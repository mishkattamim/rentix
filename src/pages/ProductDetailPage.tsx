import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Check, 
  Heart, 
  Share2, 
  MessageSquare, 
  Lock, 
  Info,
  ChevronRight,
  Sparkles,
  QrCode,
  Truck,
  Building
} from 'lucide-react';
import { useRentix } from '../context/RentixContext';
import { CheckoutModal } from '../components/modals/CheckoutModal';
import { MessageOwnerModal } from '../components/modals/MessageOwnerModal';
import { ProductCard } from '../components/cards/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, wishlist, toggleWishlist, requireAuth } = useRentix();

  const product = products.find(p => p.id === id) || products[0];
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  // Booking Card State
  const [startDate, setStartDate] = useState('2025-03-10');
  const [endDate, setEndDate] = useState('2025-03-12');
  const [handoverMethod, setHandoverMethod] = useState<'pickup' | 'delivery'>('pickup');

  // Modals state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const isLiked = wishlist.includes(product.id);

  // Calculate rental duration in days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const calculatedDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Pricing calculations (BDT)
  const subtotal = product.dailyRate * calculatedDays;
  const deliveryFee = handoverMethod === 'delivery' ? 150 : 0; // ৳150 BDT
  const platformFee = Math.round(subtotal * 0.08);
  const insuranceFee = Math.round(subtotal * 0.05);
  const securityDeposit = product.securityDeposit;
  const totalPayable = subtotal + deliveryFee + securityDeposit + platformFee + insuranceFee;

  const similarProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleBookClick = () => {
    requireAuth(() => setIsCheckoutOpen(true), 'Please log in to book this gear and lock escrow');
  };

  const handleMessageClick = () => {
    requireAuth(() => setIsMessageOpen(true), 'Please log in to message the gear owner');
  };

  return (
    <div className="min-h-screen bg-[#09121D] text-[#CBD6D3] pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Bar */}
        <nav className="flex items-center gap-2 text-xs text-[#CBD6D3]/60 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/feed" className="hover:text-white">Feed</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#83B2A8]">{product.categoryLabel}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white truncate max-w-[200px]">{product.title}</span>
        </nav>

        {/* Product Title Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#0C2B35] text-[#83B2A8] border border-[#83B2A8]/30 text-xs font-semibold">
                {product.categoryLabel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#0C2B35] text-white border border-[#4A7071]/50 text-xs font-medium">
                {product.condition} Condition
              </span>
              {product.isInstantBook && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 text-xs font-semibold">
                  ⚡ Instant Book
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 text-xs text-[#CBD6D3]/70 mt-2">
              <span className="flex items-center gap-1 font-bold text-[#83B2A8]">
                <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                {product.rating} ({product.reviewCount} verified reviews)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#83B2A8]" />
                {product.district}, {product.location} ({product.distanceKm} km away)
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => requireAuth(() => toggleWishlist(product.id), 'Please log in to save items')}
              className={`p-3 rounded-2xl border transition-all flex items-center gap-2 text-xs font-semibold ${
                isLiked
                  ? 'bg-[#F43F5E]/20 border-[#F43F5E] text-[#F43F5E]'
                  : 'bg-[#0C2B35] border-[#4A7071] text-[#CBD6D3] hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#F43F5E]' : ''}`} />
              <span>{isLiked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Listing link copied to clipboard!');
              }}
              className="p-3 rounded-2xl bg-[#0C2B35] hover:bg-[#103A47] border border-[#4A7071] text-[#CBD6D3] hover:text-white transition-colors"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MAIN 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Gallery & Details (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Gallery Viewer */}
            <div className="space-y-3">
              <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-[#0C2B35] border border-[#4A7071] shadow-2xl">
                <img
                  src={product.images[selectedImgIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-[#09121D]/80 backdrop-blur-md border border-[#4A7071] text-xs font-semibold text-white">
                  Photo {selectedImgIndex + 1} of {product.images.length}
                </span>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                        selectedImgIndex === idx
                          ? 'border-[#83B2A8] scale-105 shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Lender Profile Superhost Card */}
            <div className="bg-[#0C2B35] border border-[#4A7071] rounded-3xl p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={product.owner?.avatar}
                    alt={product.owner?.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#83B2A8] shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{product.owner?.name}</h3>
                      {product.owner?.isSuperhost && (
                        <span className="px-2 py-0.5 rounded-full bg-[#83B2A8]/20 text-[#83B2A8] border border-[#83B2A8]/40 text-[10px] font-bold">
                          ★ Superhost
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#CBD6D3]/70 mt-0.5">
                      Member since {product.owner?.memberSince} • {product.owner?.completedRentals} completed rentals in Dhaka
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-[#83B2A8] mt-1.5 font-medium">
                      <span>✓ Response rate: {product.owner?.responseRate}%</span>
                      <span>•</span>
                      <span>Replies {product.owner?.responseTime}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleMessageClick}
                  className="px-4 py-2.5 rounded-xl bg-[#09121D] hover:bg-[#071C23] border border-[#4A7071] text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors self-start sm:self-auto"
                >
                  <MessageSquare className="w-4 h-4 text-[#83B2A8]" />
                  Message Owner
                </button>
              </div>

              <p className="text-xs text-[#CBD6D3]/80 mt-4 pt-4 border-t border-[#4A7071]/30 leading-relaxed italic">
                "{product.owner?.bio}"
              </p>
            </div>

            {/* Description */}
            <div className="bg-[#0C2B35] border border-[#4A7071]/60 rounded-3xl p-6 shadow-xl space-y-3">
              <h3 className="text-lg font-bold text-white">About this Hardware</h3>
              <p className="text-xs text-[#CBD6D3]/90 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Technical Specifications Table */}
            <div className="bg-[#0C2B35] border border-[#4A7071]/60 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white">Technical Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.specs.map((spec, i) => (
                  <div key={i} className="bg-[#09121D] p-3 rounded-2xl border border-[#4A7071]/30 text-xs">
                    <span className="text-[#CBD6D3]/60 block text-[11px]">{spec.label}</span>
                    <span className="font-semibold text-white mt-0.5 block">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included Accessories */}
            <div className="bg-[#0C2B35] border border-[#4A7071]/60 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white">Included in Handover Box</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.includedAccessories.map((acc, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs bg-[#09121D] p-2.5 rounded-xl border border-[#4A7071]/30">
                    <Check className="w-4 h-4 text-[#83B2A8] flex-shrink-0" />
                    <span className="text-[#CBD6D3]">{acc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rental Terms & Security Rules */}
            <div className="bg-[#0C2B35] border border-[#4A7071]/60 rounded-3xl p-6 shadow-xl space-y-3">
              <h3 className="text-lg font-bold text-white">Rental Terms & Handover Policy</h3>
              <ul className="space-y-2 text-xs text-[#CBD6D3]/80">
                {product.rentalTerms.map((term, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#83B2A8] mt-0.5">•</span>
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Booking & Escrow Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-[#0C2B35] border-2 border-[#4A7071] rounded-3xl p-6 shadow-2xl space-y-5">
              
              {/* Daily Price & Escrow Tag */}
              <div className="flex items-baseline justify-between pb-4 border-b border-[#4A7071]/40">
                <div>
                  <span className="text-3xl font-black text-white font-mono">৳{product.dailyRate.toLocaleString()}</span>
                  <span className="text-xs text-[#CBD6D3]/60"> / day</span>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-[#83B2A8]/10 text-[#83B2A8] text-xs font-semibold border border-[#83B2A8]/30">
                    100% Escrow Protected
                  </span>
                </div>
              </div>

              {/* Date Range Picker */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-white">
                  Rental Dates ({calculatedDays} days):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#09121D] p-2.5 rounded-2xl border border-[#4A7071]/50">
                    <span className="text-[10px] text-[#CBD6D3]/50 block">Start Date:</span>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-transparent text-xs text-white font-semibold focus:outline-none w-full cursor-pointer mt-0.5"
                    />
                  </div>

                  <div className="bg-[#09121D] p-2.5 rounded-2xl border border-[#4A7071]/50">
                    <span className="text-[10px] text-[#CBD6D3]/50 block">End Date:</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-transparent text-xs text-white font-semibold focus:outline-none w-full cursor-pointer mt-0.5"
                    />
                  </div>
                </div>
              </div>

              {/* Handover Method Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-white">
                  Handover Method (Dhaka):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setHandoverMethod('pickup')}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                      handoverMethod === 'pickup'
                        ? 'bg-[#83B2A8]/20 border-[#83B2A8] text-white font-semibold'
                        : 'bg-[#09121D] border-[#4A7071]/50 text-[#CBD6D3]'
                    }`}
                  >
                    <Building className="w-4 h-4 text-[#83B2A8] mb-1" />
                    <span className="font-bold block">Local Pickup</span>
                    <span className="text-[10px] text-[#CBD6D3]/60">Free in {product.district.split('(')[0]}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHandoverMethod('delivery')}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                      handoverMethod === 'delivery'
                        ? 'bg-[#83B2A8]/20 border-[#83B2A8] text-white font-semibold'
                        : 'bg-[#09121D] border-[#4A7071]/50 text-[#CBD6D3]'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-[#83B2A8] mb-1" />
                    <span className="font-bold block">Express Courier</span>
                    <span className="text-[10px] text-[#CBD6D3]/60">+৳150 (Dhaka City)</span>
                  </button>
                </div>
              </div>

              {/* Real-time Escrow Calculation Breakdown */}
              <div className="bg-[#09121D] p-4 rounded-2xl border border-[#4A7071]/40 space-y-2 text-xs">
                <div className="flex justify-between text-[#CBD6D3]/80">
                  <span>৳{product.dailyRate.toLocaleString()} × {calculatedDays} days</span>
                  <span className="font-mono text-white">৳{subtotal.toLocaleString()}</span>
                </div>

                {deliveryFee > 0 && (
                  <div className="flex justify-between text-[#CBD6D3]/80">
                    <span>Express Delivery:</span>
                    <span className="font-mono text-white">৳{deliveryFee}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#CBD6D3]/80">
                  <span className="flex items-center gap-1">
                    Refundable Deposit:
                    <span title="Refunded immediately on return"><Info className="w-3 h-3 text-[#83B2A8]" /></span>
                  </span>
                  <span className="font-mono text-[#83B2A8] font-semibold">৳{securityDeposit.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-[#CBD6D3]/60 text-[11px]">
                  <span>ISD Platform Fee (8%):</span>
                  <span className="font-mono">৳{platformFee.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-[#CBD6D3]/60 text-[11px]">
                  <span>Damage Insurance (5%):</span>
                  <span className="font-mono">৳{insuranceFee.toLocaleString()}</span>
                </div>

                <div className="pt-3 border-t border-[#4A7071]/30 flex justify-between items-center text-sm font-bold text-white">
                  <span>Total Payable in Escrow:</span>
                  <span className="text-base font-black text-[#83B2A8] font-mono">৳{totalPayable.toLocaleString()} BDT</span>
                </div>
              </div>

              {/* Book CTA Button */}
              <button
                onClick={handleBookClick}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#83B2A8] to-[#6da197] hover:from-[#97c7bd] hover:to-[#83B2A8] text-[#09121D] font-black text-sm shadow-xl shadow-[#83B2A8]/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Lock className="w-4 h-4" />
                Request to Book & Lock Escrow (৳{totalPayable.toLocaleString()})
              </button>

              <p className="text-[10px] text-[#CBD6D3]/60 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                You won't be charged until the lender accepts your request.
              </p>

            </div>
          </div>

        </div>

        {/* SIMILAR GEAR RECOMMENDATIONS */}
        {similarProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#4A7071]/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              Similar Gear in Bangladesh
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProducts.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <CheckoutModal
          product={product}
          startDate={startDate}
          endDate={endDate}
          days={calculatedDays}
          handoverMethod={handoverMethod}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}

      {/* MESSAGE MODAL */}
      {isMessageOpen && (
        <MessageOwnerModal
          product={product}
          onClose={() => setIsMessageOpen(false)}
        />
      )}

    </div>
  );
};
