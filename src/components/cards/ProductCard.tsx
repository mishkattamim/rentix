import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Star, 
  MapPin, 
  Zap, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { Product } from '../../types';
import { useRentix } from '../../context/RentixContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const { wishlist, toggleWishlist, requireAuth } = useRentix();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const navigate = useNavigate();

  const isLiked = wishlist.includes(product.id);

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    requireAuth(() => toggleWishlist(product.id), 'Please log in to save gear to your wishlist');
  };

  if (viewMode === 'list') {
    return (
      <div className="group bg-[#0C2B35] hover:bg-[#103A47] border border-[#4A7071]/50 hover:border-[#83B2A8] rounded-2xl p-4 transition-all duration-200 flex flex-col sm:flex-row items-center gap-4 shadow-lg hover:shadow-xl hover:shadow-[#83B2A8]/5">
        {/* Image Container */}
        <div className="relative w-full sm:w-56 h-44 rounded-xl overflow-hidden flex-shrink-0 bg-[#09121D]">
          <img
            src={product.images[currentImgIndex]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Category Tag */}
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#09121D]/80 backdrop-blur-md border border-[#4A7071]/60 text-[10px] font-semibold text-[#83B2A8]">
            {product.categoryLabel}
          </span>

          {/* Wishlist Button */}
          <button
            onClick={handleLike}
            className="absolute top-2.5 right-2.5 p-2 rounded-full bg-[#09121D]/70 hover:bg-[#09121D] backdrop-blur-sm text-white transition-transform active:scale-90"
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#F43F5E] text-[#F43F5E]' : 'text-white'}`} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full w-full">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 text-xs text-[#CBD6D3]/70">
                <span className="flex items-center gap-1 font-semibold text-[#83B2A8]">
                  <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  {product.rating} ({product.reviewCount})
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#83B2A8]" />
                  {product.distanceKm} km away • {product.district.split('(')[0]}
                </span>
              </div>

              {product.isInstantBook && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[10px] font-medium">
                  <Zap className="w-2.5 h-2.5 fill-current" /> Instant Book
                </span>
              )}
            </div>

            <Link to={`/product/${product.id}`} className="block">
              <h3 className="text-base font-bold text-white group-hover:text-[#83B2A8] transition-colors truncate">
                {product.title}
              </h3>
            </Link>
            <p className="text-xs text-[#CBD6D3]/70 mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specs pills */}
          <div className="flex flex-wrap gap-1.5 my-3">
            {product.specs.slice(0, 3).map((spec, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#09121D]/60 text-[#CBD6D3]/80 border border-[#4A7071]/30">
                {spec.label}: {spec.value}
              </span>
            ))}
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between pt-3 border-t border-[#4A7071]/30 mt-auto">
            {/* Owner Chip */}
            <div className="flex items-center gap-2">
              <img
                src={product.owner?.avatar}
                alt={product.owner?.name}
                className="w-6 h-6 rounded-full object-cover border border-[#83B2A8]"
              />
              <span className="text-xs text-[#CBD6D3] font-medium truncate max-w-[120px]">
                {product.owner?.name}
              </span>
            </div>

            {/* Price & Book */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-base font-bold text-white font-mono">৳{product.dailyRate.toLocaleString()}</span>
                <span className="text-[11px] text-[#CBD6D3]/60"> / day</span>
              </div>

              <Link
                to={`/product/${product.id}`}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#83B2A8] to-[#6da197] hover:from-[#97c7bd] hover:to-[#83B2A8] text-[#09121D] font-bold text-xs shadow-md shadow-[#83B2A8]/10 transition-all"
              >
                Rent Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // GRID VIEW (Default)
  return (
    <div className="group bg-[#0C2B35] hover:bg-[#103A47] border border-[#4A7071]/40 hover:border-[#83B2A8] rounded-2xl overflow-hidden transition-all duration-200 flex flex-col shadow-lg hover:shadow-2xl hover:shadow-[#83B2A8]/10">
      
      {/* Image Gallery Header */}
      <div className="relative aspect-[4/3] w-full bg-[#09121D] overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[currentImgIndex]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#09121D]/70 hover:bg-[#09121D] text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#09121D]/70 hover:bg-[#09121D] text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        {/* Category Tag */}
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#09121D]/85 backdrop-blur-md border border-[#4A7071]/60 text-[10px] font-semibold text-[#83B2A8]">
          {product.categoryLabel}
        </span>

        {/* Condition Badge */}
        <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-[#0C2B35]/90 backdrop-blur-md border border-[#83B2A8]/40 text-[9px] font-medium text-white">
          {product.condition}
        </span>

        {/* Wishlist Button */}
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 p-2 rounded-full bg-[#09121D]/70 hover:bg-[#09121D] backdrop-blur-sm text-white transition-transform active:scale-90"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#F43F5E] text-[#F43F5E]' : 'text-white'}`} />
        </button>

        {/* Image Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-[#09121D]/60 px-1.5 py-0.5 rounded-full backdrop-blur-xs">
            {product.images.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === currentImgIndex ? 'bg-[#83B2A8] w-3' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Distance */}
          <div className="flex items-center justify-between text-xs text-[#CBD6D3]/70 mb-1.5">
            <span className="flex items-center gap-1 font-semibold text-[#83B2A8]">
              <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
              {product.rating} <span className="text-[#CBD6D3]/50">({product.reviewCount})</span>
            </span>

            <span className="flex items-center gap-1 text-[11px]">
              <MapPin className="w-3 h-3 text-[#83B2A8]" />
              {product.distanceKm} km • {product.district.split('(')[0].trim()}
            </span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-[#83B2A8] transition-colors">
            <h3 className="font-bold text-white text-sm line-clamp-1">
              {product.title}
            </h3>
          </Link>

          {/* Tagline / Specs preview */}
          <p className="text-[11px] text-[#CBD6D3]/70 mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Owner Info & Instant Book */}
        <div className="pt-3 mt-3 border-t border-[#4A7071]/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img
                src={product.owner?.avatar}
                alt={product.owner?.name}
                className="w-6 h-6 rounded-full object-cover border border-[#83B2A8]"
              />
              <div className="flex flex-col">
                <span className="text-xs text-white font-medium truncate max-w-[110px]">
                  {product.owner?.name}
                </span>
                <span className="text-[9px] text-[#CBD6D3]/50">
                  {product.owner?.isSuperhost ? '★ Superhost' : 'Verified Owner'}
                </span>
              </div>
            </div>

            {product.isInstantBook && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[10px] font-medium">
                <Zap className="w-2.5 h-2.5 fill-current" /> Instant
              </span>
            )}
          </div>

          {/* Pricing & CTA Button */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-white font-mono">৳{product.dailyRate.toLocaleString()}</span>
                <span className="text-[11px] text-[#CBD6D3]/60">/ day</span>
              </div>
              <span className="text-[9px] text-[#CBD6D3]/50 block">
                +৳{product.securityDeposit.toLocaleString()} deposit (escrow)
              </span>
            </div>

            <Link
              to={`/product/${product.id}`}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#83B2A8] to-[#6da197] hover:from-[#97c7bd] hover:to-[#83B2A8] text-[#09121D] font-bold text-xs shadow-md shadow-[#83B2A8]/10 hover:scale-105 transition-all"
            >
              Rent Now
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
