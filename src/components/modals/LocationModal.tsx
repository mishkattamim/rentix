import React from 'react';
import { X, MapPin, Compass, Check } from 'lucide-react';
import { useRentix } from '../../context/RentixContext';

const bangladeshDistricts = [
  'Dhanmondi, Dhaka',
  'Gulshan 1 & 2, Dhaka',
  'Banani, Dhaka',
  'Uttara (Sector 7), Dhaka',
  'Bashundhara R/A, Dhaka',
  'Mirpur 10, Dhaka',
  'Mohammadpur, Dhaka',
  'Shahbagh, Dhaka',
  'Motijheel, Dhaka',
  'Puran Dhaka (Lalbagh)',
  'GEC Circle, Chittagong',
  'Agrabad C/A, Chittagong',
  'Zindabazar, Sylhet',
  'Cox\'s Bazar (Laboni)',
  'Rajshahi City Center',
  'Khulna Sadar'
];

export const LocationModal: React.FC = () => {
  const { 
    isLocationModalOpen, 
    setIsLocationModalOpen, 
    selectedDistrict, 
    setSelectedDistrict,
    distanceRadius,
    setDistanceRadius 
  } = useRentix();

  if (!isLocationModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0C2B35] border border-[#4A7071] rounded-3xl shadow-2xl overflow-hidden p-6 text-[#CBD6D3]">
        
        {/* Close Button */}
        <button
          onClick={() => setIsLocationModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#09121D]/60 hover:bg-[#09121D] text-[#CBD6D3] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1 text-[#83B2A8]">
            <MapPin className="w-5 h-5" />
            <h3 className="text-xl font-bold text-white">Rental Location & Radius (Bangladesh)</h3>
          </div>
          <p className="text-xs text-[#CBD6D3]/70">
            Select your primary neighborhood in Dhaka, Chittagong, Sylhet, or Cox's Bazar and adjust your travel radius for gear pickup.
          </p>
        </div>

        {/* Radius Slider */}
        <div className="bg-[#09121D] p-4 rounded-2xl border border-[#4A7071]/40 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#83B2A8]" />
              Search Radius:
            </span>
            <span className="text-xs font-bold text-[#83B2A8] bg-[#0C2B35] px-2.5 py-1 rounded-full border border-[#83B2A8]/30 font-mono">
              Within {distanceRadius} km ({Math.round(distanceRadius * 0.621)} miles)
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={distanceRadius}
            onChange={(e) => setDistanceRadius(Number(e.target.value))}
            className="w-full h-2 bg-[#0C2B35] rounded-lg appearance-none cursor-pointer accent-[#83B2A8]"
          />

          <div className="flex justify-between text-[10px] text-[#CBD6D3]/50 mt-1">
            <span>1 km (Walk)</span>
            <span>10 km (Rickshaw/Metro)</span>
            <span>25 km (Greater Dhaka)</span>
            <span>50 km (Inter-city)</span>
          </div>
        </div>

        {/* District Selection */}
        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
          Choose Neighborhood Node:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
          {bangladeshDistricts.map((district) => {
            const isSelected = selectedDistrict === district;
            return (
              <button
                key={district}
                type="button"
                onClick={() => {
                  setSelectedDistrict(district);
                }}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition-all ${
                  isSelected
                    ? 'bg-[#83B2A8]/20 border-[#83B2A8] text-white font-semibold'
                    : 'bg-[#09121D]/60 border-[#4A7071]/40 text-[#CBD6D3] hover:bg-[#09121D]'
                }`}
              >
                <span className="truncate pr-2">{district}</span>
                {isSelected && <Check className="w-4 h-4 text-[#83B2A8] flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => setIsLocationModalOpen(false)}
          className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-[#83B2A8] to-[#6da197] hover:from-[#97c7bd] hover:to-[#83B2A8] text-[#09121D] font-bold text-sm shadow-lg shadow-[#83B2A8]/20 transition-all"
        >
          Apply Location Filter
        </button>

      </div>
    </div>
  );
};
