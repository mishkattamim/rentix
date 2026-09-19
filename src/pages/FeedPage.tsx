import React, { useMemo } from 'react';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Grid,
  List,
  Map as MapIcon,
  Zap,
  X,
  Compass,
  ArrowUpDown
} from 'lucide-react';
import { useRentix } from '../context/RentixContext';
import { mockCategories } from '../data/mockReviews';
import { ProductCard } from '../components/cards/ProductCard';
import { InteractiveMapSimulator } from '../components/feed/InteractiveMapSimulator';
import { CategoryType } from '../types';

export const FeedPage: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    distanceRadius,
    setDistanceRadius,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    selectedDistrict,
    setSelectedDistrict,
    setIsLocationModalOpen
  } = useRentix();

  const [instantOnly, setInstantOnly] = React.useState(false);

  // Reactive filtering
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Location / District Filter (ROBUST MATCHING)
      if (
        selectedDistrict &&
        selectedDistrict !== 'All Locations' &&
        selectedDistrict !== 'All Bangladesh'
      ) {
        const selDistRaw = selectedDistrict.toLowerCase().trim();
        const prodDist = (product.district || '').toLowerCase();
        const prodLoc = (product.location || '').toLowerCase();

        // Extract clean primary area name (e.g. "gulshan" from "Gulshan 1 & 2, Dhaka")
        const baseKeyword = selDistRaw
          .replace(/\s*\(.*?\)/g, '')
          .split(/,|\s+&|\s+1|\s+2/)[0]
          .trim();

        const matchesDistrict = prodDist.includes(baseKeyword);
        const matchesLocation = prodLoc.includes(baseKeyword);

        if (!matchesDistrict && !matchesLocation) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // 3. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesDistrict = product.district.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesDesc && !matchesDistrict) {
          return false;
        }
      }

      // 4. Price range filter (in BDT)
      if (product.dailyRate < priceRange[0] || product.dailyRate > priceRange[1]) {
        return false;
      }

      // 5. Instant book filter
      if (instantOnly && !product.isInstantBook) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.dailyRate - b.dailyRate;
        case 'price-high':
          return b.dailyRate - a.dailyRate;
        case 'distance':
          return a.distanceKm - b.distanceKm;
        case 'rating':
          return b.rating - a.rating;
        case 'recommended':
        default:
          return b.popularScore - a.popularScore;
      }
    });
  }, [products, selectedCategory, searchQuery, priceRange, instantOnly, sortBy, selectedDistrict]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange([0, 10000]);
    setInstantOnly(false);
    setSortBy('recommended');
    if (setSelectedDistrict) {
      setSelectedDistrict('All Locations');
    }
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    priceRange[1] < 10000 ||
    instantOnly ||
    (selectedDistrict && selectedDistrict !== 'All Locations' && selectedDistrict !== 'All Bangladesh');

  return (
    <div className="min-h-screen bg-[#09121D] text-[#CBD6D3] pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Title & View Modes */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-2.5">
              Live Gear Feed <span className="text-sm font-mono text-[#83B2A8] px-2.5 py-0.5 rounded-full bg-[#0C2B35] border border-[#83B2A8]/30">{filteredProducts.length} items</span>
            </h1>
            <p className="text-xs text-[#CBD6D3]/70 mt-1">
              Explore gadgets and accessories available for rent across Bangladesh
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-3 self-start md:self-auto">

            {/* Sorting Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#0C2B35] border border-[#4A7071] rounded-xl px-3 py-2 text-xs font-semibold text-[#CBD6D3] focus:border-[#83B2A8] focus:outline-none cursor-pointer"
              >
                <option value="recommended">Recommended & Popular</option>
                <option value="distance">Nearest Distance (km)</option>
                <option value="price-low">Price: Low to High (৳)</option>
                <option value="price-high">Price: High to Low (৳)</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Grid vs List vs Map buttons */}
            <div className="flex bg-[#0C2B35] p-1 rounded-xl border border-[#4A7071]/50">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs transition-colors ${viewMode === 'grid' ? 'bg-[#83B2A8] text-[#09121D]' : 'text-[#CBD6D3] hover:text-white'
                  }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg text-xs transition-colors ${viewMode === 'list' ? 'bg-[#83B2A8] text-[#09121D]' : 'text-[#CBD6D3] hover:text-white'
                  }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg text-xs transition-colors ${viewMode === 'map' ? 'bg-[#83B2A8] text-[#09121D]' : 'text-[#CBD6D3] hover:text-white'
                  }`}
                title="Interactive Map Simulator"
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Dynamic Category Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {mockCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CategoryType)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all border ${isSelected
                    ? 'bg-[#83B2A8] text-[#09121D] border-[#83B2A8] shadow-md shadow-[#83B2A8]/20 scale-105'
                    : 'bg-[#0C2B35] text-[#CBD6D3] border-[#4A7071]/50 hover:bg-[#103A47] hover:border-[#83B2A8]/60'
                  }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-[#09121D]/20 text-[#09121D]' : 'bg-[#09121D] text-[#83B2A8]'
                  }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Controls Bar */}
        <div className="bg-[#0C2B35] border border-[#4A7071]/50 rounded-2xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4 shadow-lg">

          <div className="flex flex-wrap items-center gap-4 text-xs">
            {/* Location Node Chip */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#09121D] hover:bg-[#071C23] border border-[#4A7071] text-[#CBD6D3] hover:text-white"
            >
              <MapPin className="w-3.5 h-3.5 text-[#83B2A8]" />
              <span>{selectedDistrict}</span>
              <span className="text-[#83B2A8]">({distanceRadius} km)</span>
            </button>

            {/* Price Slider */}
            <div className="flex items-center gap-2 bg-[#09121D] px-3 py-1.5 rounded-xl border border-[#4A7071]/60">
              <span className="text-[#CBD6D3]/60">Max Rate:</span>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-24 sm:w-32 h-1.5 bg-[#0C2B35] rounded-lg appearance-none cursor-pointer accent-[#83B2A8]"
              />
              <span className="font-mono font-bold text-white text-xs">
                ৳{priceRange[1].toLocaleString()}/day
              </span>
            </div>

            {/* Instant Book Toggle */}
            <button
              onClick={() => setInstantOnly(!instantOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${instantOnly
                  ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                  : 'bg-[#09121D] border-[#4A7071]/60 text-[#CBD6D3] hover:text-white'
                }`}
            >
              <Zap className={`w-3.5 h-3.5 ${instantOnly ? 'fill-current' : ''}`} />
              Instant Book Only
            </button>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#83B2A8] hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Reset all filters
            </button>
          )}

        </div>

        {/* FEED CONTENT VIEWS */}
        {viewMode === 'map' ? (
          /* Interactive Map View */
          <div>
            <InteractiveMapSimulator products={filteredProducts} />
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-[#0C2B35] rounded-3xl border border-[#4A7071] p-8">
            <div className="w-16 h-16 rounded-full bg-[#09121D] border border-[#4A7071] flex items-center justify-center mx-auto mb-4 text-[#83B2A8]">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">No gear matched your filters</h3>
            <p className="text-xs text-[#CBD6D3]/70 mt-1 max-w-sm mx-auto">
              Try adjusting your category selection, increasing the price range, or searching a different district in Bangladesh.
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 px-5 py-2.5 rounded-xl bg-[#83B2A8] text-[#09121D] text-xs font-bold shadow-md hover:scale-105 transition-transform"
            >
              Clear All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode="grid" />
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode="list" />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
