import React from 'react';
import { Star, ShieldCheck, UserCheck, Quote, Sparkles } from 'lucide-react';
import { mockTestimonials } from '../../data/mockActivities';

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#09121D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#83B2A8]/10 border border-[#83B2A8]/30 text-xs font-semibold text-[#83B2A8] mb-3">
            <Sparkles className="w-3.5 h-3.5" /> VERIFIED COMMUNITY VOICES
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Loved by Creators & Builders in Seoul
          </h2>
          <p className="text-xs sm:text-sm text-[#CBD6D3]/70 mt-3 leading-relaxed">
            Real experiences from student researchers, commercial filmmakers, and outdoor enthusiasts sharing hardware on Rentix.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#0C2B35] border border-[#4A7071]/50 hover:border-[#83B2A8] rounded-3xl p-6 shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Top: Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#83B2A8]/30" />
                </div>

                <p className="text-xs text-[#CBD6D3]/90 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div>
                {/* Highlight Badge */}
                <div className="mb-4 py-1.5 px-3 rounded-xl bg-[#09121D] border border-[#83B2A8]/30 text-[11px] font-semibold text-[#83B2A8] text-center font-mono">
                  ⚡ {t.earnedOrSaved}
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 pt-3 border-t border-[#4A7071]/30">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#83B2A8]"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="text-xs font-bold text-white">{t.name}</h4>
                      <div className="w-3.5 h-3.5 bg-[#10B981] rounded-full flex items-center justify-center">
                        <UserCheck className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>
                    <p className="text-[10px] text-[#CBD6D3]/60">{t.role}</p>
                    <p className="text-[9px] text-[#83B2A8]">{t.district}</p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
