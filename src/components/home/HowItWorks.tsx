import React, { useState } from 'react';
import { 
  Search, 
  UserCheck, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: '1. Search Nearby',
    subtitle: 'Neighborhood Discovery',
    icon: Search,
    color: '#83B2A8',
    description: 'Browse cameras, drones, spatial headsets, audio gear, and tools within your desired radius (1-50 km) across Dhaka and Bangladesh city districts with transparent daily rates.',
    details: [
      'Filter by GPS distance and neighborhood hubs',
      'Real-time availability calendar',
      'Verified owner response times (< 15 mins)'
    ],
    highlight: 'Zero shipping delays • Same-day pickup'
  },
  {
    id: 2,
    title: '2. Identity Verification',
    subtitle: 'Verified Trust Protocol',
    icon: UserCheck,
    color: '#10B981',
    description: 'Renters and lenders verify their national NID or passport, creating a verified trust score that safeguards high-value gear up to ৳500,000.',
    details: [
      'Encrypted ID verification & phone validation',
      'Peer-reviewed trust scores and past rental history',
      'Direct in-app messaging to discuss accessories and lenses'
    ],
    highlight: '100% Verified Community Members'
  },
  {
    id: 3,
    title: '3. Secure Escrow Hold',
    subtitle: 'Smart Contract Protection',
    icon: ShieldCheck,
    color: '#3B82F6',
    description: 'Rental payment and the refundable security deposit are locked in Rentix Smart Escrow. The lender receives no funds until both parties verify handover.',
    details: [
      'Refundable security deposit held safely in escrow',
      'Automated hardware damage insurance included',
      'No hidden charges or non-refundable surprises'
    ],
    highlight: 'Zero Risk of Non-Payment or Fraud'
  },
  {
    id: 4,
    title: '4. Dual QR Handshake',
    subtitle: 'Physical Handover',
    icon: QrCode,
    color: '#F59E0B',
    description: 'Meet in person, complete the 2-minute condition checklist, and scan each other’s dynamic QR code to officially activate the rental clock.',
    details: [
      'One-time cryptographically hashed QR tokens',
      'Real-time condition checklist timestamping',
      'Instant SMS & email receipts generated'
    ],
    highlight: 'Instant Contract Activation'
  },
  {
    id: 5,
    title: '5. Return & Release',
    subtitle: 'Instant Deposit Refund',
    icon: CheckCircle2,
    color: '#83B2A8',
    description: 'At the end of the rental, a return QR scan instantly unlocks the lender’s earnings and automatically refunds 100% of the security deposit.',
    details: [
      'Immediate deposit release back to your payment card or bKash',
      'Lender earnings deposited within 60 seconds',
      'Mutual 5-star rating & review prompt'
    ],
    highlight: '100% Automated Disbursement'
  }
];

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const currentStep = steps[activeStep];
  const IconComponent = currentStep.icon;

  return (
    <section id="how-it-works" className="py-20 bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden transition-colors duration-200">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-primary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[var(--text-primary)]" /> VERIFIED P2P PROTOCOL
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
            How Rentix Works in 5 Simple Steps
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
            From discovering cinema cameras 2 km away to smart escrow deposits and instant QR handshakes—here is how Rentix makes peer-to-peer gear sharing seamless and 100% secure.
          </p>
        </div>

        {/* Interactive Step Buttons Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-[var(--bg-surface)] p-2 rounded-2xl border border-[var(--border-subtle)] mb-8">
          {steps.map((step, idx) => {
            const isSelected = activeStep === idx;
            const StepIcon = step.icon;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-xl flex flex-col items-center text-center transition-all ${
                  isSelected
                    ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)] shadow-md font-bold scale-[1.02]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'
                }`}
              >
                <StepIcon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-[var(--bg-primary)]' : 'text-[var(--text-primary)]'}`} />
                <span className="text-xs font-bold leading-tight">{step.title}</span>
                <span className={`text-[10px] mt-0.5 ${isSelected ? 'opacity-80' : 'text-[var(--text-muted)]'}`}>
                  {step.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Step Visualizer Card */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-6 sm:p-10 shadow-lg transition-colors duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Step Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)]">
                <span className="w-2 h-2 rounded-full bg-[var(--text-primary)] animate-pulse" />
                Step {activeStep + 1} of 5 • {currentStep.subtitle}
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                {currentStep.title}: {currentStep.subtitle}
              </h3>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {currentStep.description}
              </p>

              {/* Bullet points */}
              <div className="space-y-2.5 pt-2">
                {currentStep.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[var(--text-primary)]">
                    <div className="p-1 rounded bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-subtle)] mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* Highlight Badge */}
              <div className="p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--text-primary)]" />
                  {currentStep.highlight}
                </span>
                
                <div className="flex gap-2">
                  {activeStep > 0 && (
                    <button
                      onClick={() => setActiveStep(prev => prev - 1)}
                      className="px-3 py-1 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] transition-colors"
                    >
                      Prev
                    </button>
                  )}
                  {activeStep < steps.length - 1 && (
                    <button
                      onClick={() => setActiveStep(prev => prev + 1)}
                      className="px-3 py-1 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--bg-primary)] text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      Next Step <ArrowRight className="w-3 h-3 text-[var(--bg-primary)]" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Interactive Graphic Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-3xl p-6 shadow-md relative">
                
                {/* Glow badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#2D2D2D] dark:bg-[#F8F7F4] text-[#F8F7F4] dark:text-[#2D2D2D] font-black text-xs flex items-center justify-center transition-colors">
  {activeStep + 1}
</div>

                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] mx-auto mb-4 shadow-sm">
                  <IconComponent className="w-8 h-8" />
                </div>

                <h4 className="text-center text-base font-bold text-[var(--text-primary)] mb-2">
                  {currentStep.title}
                </h4>

                <div className="bg-[var(--bg-surface)] p-3.5 rounded-xl border border-[var(--border-subtle)] space-y-2 text-xs">
                  <div className="flex justify-between text-[11px] text-[var(--text-secondary)]">
                    <span>Protocol State:</span>
                    <span className="font-mono text-[var(--text-primary)] font-bold">STEP_0{activeStep + 1}_ACTIVE</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[var(--text-secondary)]">
                    <span>Escrow Status:</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">PROTECTED</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[var(--text-secondary)]">
                    <span>Handshake Node:</span>
                    <span className="font-mono text-[var(--text-primary)]">Dhaka-Dhanmondi-01</span>
                  </div>
                </div>

                <p className="text-[11px] text-center text-[var(--text-muted)] mt-4 italic">
                  "Safe peer-to-peer sharing powered by Rentix Smart Escrow."
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};