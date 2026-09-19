import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ShieldCheck, TrendingUp } from 'lucide-react';
import { useRentix } from '../../context/RentixContext';

const gearOptions = [
  { id: 'cinema', name: 'Cinema Camera (Sony FX3 / Canon R5C)', avgRate: 3800, icon: '🎥' },
  { id: 'drone', name: 'Pro Drone (DJI Mini 4 Pro / Mavic 3)', avgRate: 1800, icon: '🚁' },
  { id: 'vr', name: 'Spatial VR Headset (Vision Pro / Quest 3)', avgRate: 3500, icon: '🥽' },
  { id: 'audio', name: 'Studio Audio & Wireless Mics (RØDE/Fender)', avgRate: 1100, icon: '🎙️' },
  { id: 'leica', name: 'Luxury Optics / Leica Q3', avgRate: 5800, icon: '📷' },
  { id: 'outdoor', name: 'Outdoor Power / Ultralight Tents', avgRate: 1000, icon: '🏕️' }
];

export const EarningsCalculator: React.FC = () => {
  const { requireAuth } = useRentix();
  const navigate = useNavigate();
  const [selectedGear, setSelectedGear] = useState(gearOptions[0]);
  const [daysPerMonth, setDaysPerMonth] = useState(8);

  const monthlyGross = selectedGear.avgRate * daysPerMonth;
  const yearlyGross = monthlyGross * 12;
  const platformFee = monthlyGross * 0.10;
  const netEarnings = monthlyGross - platformFee;

  const handleListGearClick = () => {
    requireAuth(() => navigate('/list-item'), 'Please log in to list your gear for rent');
  };

  return (
    <section className="py-20 bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden transition-colors duration-200 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-6 sm:p-12 shadow-lg relative overflow-hidden transition-colors duration-200">
          
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[var(--accent-primary)]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-[var(--text-primary)]" /> LENDER INCOME ESTIMATOR (BANGLADESH)
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                  How much could your idle gear earn in Dhaka?
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                  Turn dust-collecting cameras, drones, and audio rigs into consistent monthly BDT income. Every rental is protected with verified NID ID and escrow security deposits.
                </p>
              </div>

              {/* Gear Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2.5">
                  1. Select your hardware type:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {gearOptions.map((gear) => {
                    const isSelected = selectedGear.id === gear.id;
                    return (
                      <button
                        key={gear.id}
                        type="button"
                        onClick={() => setSelectedGear(gear)}
                        className={`p-3 rounded-xl border text-left transition-all text-xs ${
                          isSelected
                            ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold border-[var(--accent-primary)] shadow-md scale-[1.02]'
                            : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--border-muted)]'
                        }`}
                      >
                        <span className="text-base block mb-1">{gear.icon}</span>
                        <span className="line-clamp-1 font-semibold">{gear.name.split('(')[0]}</span>
                        <span className={`text-[10px] block mt-0.5 ${isSelected ? 'opacity-80' : 'text-[var(--text-secondary)]'}`}>
                          ~৳{gear.avgRate.toLocaleString()}/day
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Days Slider */}
              <div className="bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-subtle)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[var(--text-primary)]">
                    2. Estimated rental days per month:
                  </span>
                  <span className="text-sm font-bold text-[var(--text-primary)] font-mono bg-[var(--bg-surface)] px-3 py-1 rounded-full border border-[var(--border-subtle)]">
                    {daysPerMonth} Days / Month
                  </span>
                </div>

                <input
                  type="range"
                  min="2"
                  max="24"
                  step="1"
                  value={daysPerMonth}
                  onChange={(e) => setDaysPerMonth(Number(e.target.value))}
                  className="w-full h-2 bg-[var(--bg-surface)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
                />

                <div className="flex justify-between text-[10px] text-[var(--text-muted)] mt-1.5">
                  <span>2 days (1 weekend)</span>
                  <span>8 days (4 weekends)</span>
                  <span>16 days</span>
                  <span>24 days (High Demand)</span>
                </div>
              </div>

            </div>

            {/* Right Column: Earnings Summary Box */}
            <div className="lg:col-span-5">
              <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-3xl p-6 sm:p-8 text-center relative shadow-md">
                
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] flex items-center justify-center mx-auto mb-3 font-bold text-xl shadow-sm">
                  ৳
                </div>

                <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-semibold">
                  Estimated Monthly Net Payout
                </span>

                <div className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] font-mono my-2">
                  ৳{Math.round(netEarnings).toLocaleString()}
                </div>

                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  ~৳{Math.round(yearlyGross * 0.9).toLocaleString()} BDT per year
                </p>

                {/* Breakdown details */}
                <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] space-y-2 text-xs text-left">
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Gross Rental Value:</span>
                    <span className="font-mono text-[var(--text-primary)] font-semibold">৳{monthlyGross.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Security Deposit Protection:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Guaranteed</span>
                  </div>
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Disbursement Speed:</span>
                    <span className="text-[var(--text-primary)]">Instant on Return QR (bKash / Bank)</span>
                  </div>
                </div>

                <button
                  onClick={handleListGearClick}
                  className="mt-6 w-full py-3.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--bg-primary)] font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02]"
                >
                  <PlusCircle className="w-4 h-4 text-[var(--bg-primary)]" />
                  List Your Gear & Start Earning
                </button>

                <p className="text-[10px] text-[var(--text-muted)] mt-3 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Zero listing fees • Cancel or pause anytime
                </p>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};