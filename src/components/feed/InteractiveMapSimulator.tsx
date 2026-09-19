import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, X, ArrowUpRight, Compass } from 'lucide-react';
import { Product } from '../../types';

interface InteractiveMapSimulatorProps {
  products: Product[];
}

// Coordinates mapping across Dhaka & Bangladesh districts
const districtCoords: Record<string, { top: number; left: number }> = {
  'Dhanmondi': { top: 52, left: 42 },
  'Gulshan': { top: 38, left: 62 },
  'Banani': { top: 35, left: 56 },
  'Uttara': { top: 20, left: 55 },
  'Bashundhara': { top: 32, left: 74 },
  'Mirpur': { top: 32, left: 35 },
  'Mohammadpur': { top: 48, left: 32 },
  'Shahbagh': { top: 58, left: 50 },
  'Motijheel': { top: 65, left: 58 },
  'Puran Dhaka': { top: 75, left: 50 },
  'Badda': { top: 45, left: 68 },
  'Khilgaon': { top: 55, left: 66 },
  'Chittagong': { top: 80, left: 82 },
  'Sylhet': { top: 15, left: 85 },
  'Cox\'s Bazar': { top: 88, left: 88 },
  'Rajshahi': { top: 30, left: 15 },
  'Khulna': { top: 78, left: 25 }
};

export const InteractiveMapSimulator: React.FC<InteractiveMapSimulatorProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(products[0] || null);

  return (
    <div className="relative w-full h-[600px] bg-[#071C23] rounded-3xl overflow-hidden border border-[#4A7071] shadow-2xl">
      
      {/* Stylized Dark Map Canvas with Buriganga & Hatirjheel River Curve */}
      <div className="absolute inset-0 bg-[#071C23] overflow-hidden">
        
        {/* Hatirjheel & Buriganga River Graphic Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="none">
          {/* Hatirjheel Lake Curve */}
          <path
            d="M 250 260 C 420 220, 580 310, 750 260"
            fill="none"
            stroke="#4A7071"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <path
            d="M 250 260 C 420 220, 580 310, 750 260"
            fill="none"
            stroke="#83B2A8"
            strokeWidth="4"
            strokeDasharray="10 6"
          />

          {/* Buriganga South Curve */}
          <path
            d="M -50 490 C 200 460, 450 540, 950 480"
            fill="none"
            stroke="#4A7071"
            strokeWidth="32"
            strokeLinecap="round"
          />
        </svg>

        {/* Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4A707115_1px,transparent_1px),linear-gradient(to_bottom,#4A707115_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Dhaka District Labels */}
        <span className="absolute top-[18%] left-[52%] text-[10px] uppercase font-mono font-bold tracking-widest text-[#4A7071]/60 pointer-events-none">
          Uttara Hub
        </span>
        <span className="absolute top-[34%] left-[60%] text-[10px] uppercase font-mono font-bold tracking-widest text-[#83B2A8]/60 pointer-events-none">
          Gulshan / Banani
        </span>
        <span className="absolute top-[50%] left-[38%] text-[10px] uppercase font-mono font-bold tracking-widest text-[#83B2A8]/60 pointer-events-none">
          Dhanmondi
        </span>
        <span className="absolute top-[68%] left-[54%] text-[10px] uppercase font-mono font-bold tracking-widest text-[#4A7071]/60 pointer-events-none">
          Motijheel / Old Dhaka
        </span>
        <span className="absolute top-[82%] left-[80%] text-[10px] uppercase font-mono font-bold tracking-widest text-[#4A7071]/60 pointer-events-none">
          Chittagong Node
        </span>
      </div>

      {/* Top Map Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-[#09121D]/90 backdrop-blur-md p-3 rounded-2xl border border-[#4A7071]/50">
        <div className="flex items-center gap-2 text-xs text-[#CBD6D3]">
          <span className="p-1.5 rounded-lg bg-[#83B2A8]/20 text-[#83B2A8]">
            <Compass className="w-4 h-4" />
          </span>
          <span className="font-bold text-white">Dhaka & Regional P2P Mesh Network</span>
          <span className="text-[11px] text-[#83B2A8] bg-[#0C2B35] px-2 py-0.5 rounded-full border border-[#4A7071]/50 font-mono">
            {products.length} Active Nodes (BDT)
          </span>
        </div>

        <div className="text-[11px] text-[#CBD6D3]/60 hidden sm:block">
          Click any pin on the map to inspect hardware in Dhaka
        </div>
      </div>

      {/* Product Map Pins */}
      {products.map((product, idx) => {
        const districtKey = Object.keys(districtCoords).find(k => product.district.includes(k)) || 'Dhanmondi';
        const baseCoord = districtCoords[districtKey] || { top: 50, left: 50 };
        
        const jitterTop = (idx % 3 - 1) * 3.5;
        const jitterLeft = ((idx * 7) % 5 - 2) * 2.5;
        const topPos = Math.min(88, Math.max(15, baseCoord.top + jitterTop));
        const leftPos = Math.min(88, Math.max(10, baseCoord.left + jitterLeft));

        const isSelected = selectedProduct?.id === product.id;

        return (
          <div
            key={product.id}
            style={{ top: `${topPos}%`, left: `${leftPos}%` }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <button
              onClick={() => setSelectedProduct(product)}
              className={`group flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xl ${
                isSelected
                  ? 'bg-[#83B2A8] text-[#09121D] ring-4 ring-[#83B2A8]/30 scale-125 z-30'
                  : 'bg-[#0C2B35] text-white border border-[#4A7071] hover:border-[#83B2A8] hover:scale-110'
              }`}
            >
              <span className="text-xs">{product.categoryLabel.includes('Drone') ? '🚁' : product.categoryLabel.includes('Cam') ? '📷' : '⚡'}</span>
              <span className="font-mono text-[11px]">৳{product.dailyRate.toLocaleString()}</span>
            </button>
          </div>
        );
      })}

      {/* Floating Selected Product Popup Card */}
      {selectedProduct && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-30 bg-[#0C2B35]/95 backdrop-blur-md border-2 border-[#83B2A8] rounded-3xl p-4 shadow-2xl animate-in slide-in-from-bottom-3 duration-200">
          
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-[#09121D] text-[#CBD6D3] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex gap-3.5">
            <img
              src={selectedProduct.images[0]}
              alt={selectedProduct.title}
              className="w-20 h-20 rounded-2xl object-cover border border-[#4A7071] flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="px-2 py-0.2 rounded bg-[#09121D] text-[#83B2A8] text-[10px] font-semibold">
                {selectedProduct.categoryLabel}
              </span>
              <h4 className="text-xs font-bold text-white truncate mt-1">
                {selectedProduct.title}
              </h4>
              
              <div className="flex items-center gap-2 text-[11px] text-[#CBD6D3]/70 mt-1">
                <span className="flex items-center gap-0.5 text-[#83B2A8] font-bold">
                  <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                  {selectedProduct.rating}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-[#83B2A8]" />
                  {selectedProduct.distanceKm} km ({selectedProduct.district.split('(')[0]})
                </span>
              </div>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#4A7071]/30">
                <div className="text-xs font-bold font-mono text-white">
                  ৳{selectedProduct.dailyRate.toLocaleString()} <span className="text-[10px] font-normal text-[#CBD6D3]/60">/ day</span>
                </div>

                <Link
                  to={`/product/${selectedProduct.id}`}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#83B2A8] to-[#6da197] text-[#09121D] font-bold text-xs flex items-center gap-1 shadow-md hover:scale-105 transition-all"
                >
                  View Details <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
