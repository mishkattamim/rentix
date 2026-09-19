import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  Camera, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  RefreshCw, 
  Sparkles, 
  Lock 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRentix } from '../../context/RentixContext';

export const QRHandoverModal: React.FC = () => {
  const { qrModalBooking, setQrModalBooking, updateBookingStatus } = useRentix();
  const [activeTab, setActiveTab] = useState<'show' | 'scan'>('show');
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!qrModalBooking) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScanSuccess(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      if (qrModalBooking.status === 'escrow_secured') {
        updateBookingStatus(qrModalBooking.id, 'active_rental');
        setSuccessMessage('Handover verified! Gear condition accepted & rental activated in Bangladesh Node.');
      } else if (qrModalBooking.status === 'active_rental') {
        updateBookingStatus(qrModalBooking.id, 'completed');
        setSuccessMessage('Return inspection verified! Escrow deposit refunded to renter via bKash/Card.');
      } else {
        setSuccessMessage('QR Handshake verified successfully.');
      }
    }, 1500);
  };

  const getStatusLabel = () => {
    switch (qrModalBooking.status) {
      case 'escrow_secured':
        return { label: 'Ready for Pickup Handover', color: 'text-[#83B2A8] bg-[#83B2A8]/10 border-[#83B2A8]/40' };
      case 'active_rental':
        return { label: 'Active Rental - Awaiting Return Handover', color: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/40' };
      case 'completed':
        return { label: 'Rental Completed & Deposit Released', color: 'text-[#CBD6D3] bg-[#0C2B35] border-[#4A7071]' };
      default:
        return { label: 'Escrow Protected', color: 'text-[#83B2A8] bg-[#0C2B35]' };
    }
  };

  const statusInfo = getStatusLabel();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0C2B35] border border-[#4A7071] rounded-3xl shadow-2xl overflow-hidden p-6 text-[#CBD6D3]">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setQrModalBooking(null);
            setScanSuccess(false);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#09121D]/60 hover:bg-[#09121D] text-[#CBD6D3] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#83B2A8]/10 border border-[#83B2A8]/30 text-xs font-semibold text-[#83B2A8] mb-2">
            <Lock className="w-3.5 h-3.5" /> ISD 2-Way Handshake Protocol (Bangladesh)
          </div>
          <h3 className="text-xl font-bold text-white">QR Code Handover</h3>
          <p className="text-xs text-[#CBD6D3]/70 mt-1 max-w-xs mx-auto">
            Scan together during physical pickup & return in Dhaka to activate rental or release escrow deposit.
          </p>
        </div>

        {/* Tabs: Show QR vs Scan QR */}
        <div className="flex bg-[#09121D] p-1 rounded-xl mb-5 border border-[#4A7071]/40">
          <button
            onClick={() => setActiveTab('show')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'show'
                ? 'bg-[#83B2A8] text-[#09121D] shadow-md'
                : 'text-[#CBD6D3] hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" />
            Show My QR
          </button>
          <button
            onClick={() => setActiveTab('scan')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'scan'
                ? 'bg-[#83B2A8] text-[#09121D] shadow-md'
                : 'text-[#CBD6D3] hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            Scan Lender/Renter
          </button>
        </div>

        {/* Status Chip */}
        <div className="mb-4 text-center">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
        </div>

        {/* TAB 1: SHOW QR */}
        {activeTab === 'show' && (
          <div className="flex flex-col items-center">
            <div className="p-4 bg-white rounded-2xl shadow-inner relative group">
              <div className="w-48 h-48 bg-white flex flex-col items-center justify-center relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect width="100" height="100" fill="white" />
                  <rect x="5" y="5" width="30" height="30" fill="#0C2B35" />
                  <rect x="9" y="9" width="22" height="22" fill="white" />
                  <rect x="13" y="13" width="14" height="14" fill="#0C2B35" />

                  <rect x="65" y="5" width="30" height="30" fill="#0C2B35" />
                  <rect x="69" y="9" width="22" height="22" fill="white" />
                  <rect x="73" y="13" width="14" height="14" fill="#0C2B35" />

                  <rect x="5" y="65" width="30" height="30" fill="#0C2B35" />
                  <rect x="9" y="69" width="22" height="22" fill="white" />
                  <rect x="13" y="73" width="14" height="14" fill="#0C2B35" />

                  <circle cx="50" cy="20" r="4" fill="#0C2B35" />
                  <circle cx="45" cy="50" r="4" fill="#0C2B35" />
                  <circle cx="55" cy="50" r="4" fill="#0C2B35" />
                  <circle cx="50" cy="80" r="4" fill="#0C2B35" />
                  <rect x="40" y="32" width="6" height="6" fill="#0C2B35" />
                  <rect x="52" y="32" width="8" height="8" fill="#0C2B35" />
                  <rect x="40" y="62" width="6" height="6" fill="#0C2B35" />
                  <rect x="55" y="65" width="8" height="8" fill="#0C2B35" />
                  <rect x="70" y="45" width="8" height="8" fill="#0C2B35" />
                  <rect x="85" y="55" width="6" height="6" fill="#0C2B35" />
                  <rect x="25" y="45" width="6" height="6" fill="#0C2B35" />
                  <rect x="75" y="75" width="12" height="12" fill="#0C2B35" />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-lg bg-[#0C2B35] border-2 border-[#83B2A8] flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-[#83B2A8]" />
                  </div>
                </div>
              </div>
            </div>

            <p className="font-mono text-[11px] text-[#83B2A8] mt-3 tracking-wider bg-[#09121D] px-3 py-1 rounded-full border border-[#4A7071]/40">
              {qrModalBooking.qrCode}
            </p>
          </div>
        )}

        {/* TAB 2: SCAN QR SIMULATOR */}
        {activeTab === 'scan' && (
          <div className="flex flex-col items-center">
            {scanSuccess ? (
              <div className="w-full bg-[#09121D] border border-[#10B981]/50 rounded-2xl p-6 text-center animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center mx-auto mb-3 text-[#10B981]">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Handshake Verified!</h4>
                <p className="text-xs text-[#CBD6D3]/90 leading-relaxed mb-4">
                  {successMessage}
                </p>
                <div className="text-xs text-[#83B2A8] bg-[#0C2B35] p-2.5 rounded-xl border border-[#4A7071]/50 font-mono">
                  TxID: ISD-BD-{Date.now().toString().slice(-8)} • Escrow: Confirmed
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div className="relative w-full h-56 bg-black rounded-2xl overflow-hidden border-2 border-[#83B2A8]/50 flex items-center justify-center">
                  <div className="absolute inset-4 border border-dashed border-[#83B2A8]/40 rounded-xl pointer-events-none flex items-center justify-center">
                    <span className="text-[11px] text-[#83B2A8]/60 uppercase tracking-widest font-mono">
                      Align QR Code Inside Box
                    </span>
                  </div>

                  <div className="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-[#83B2A8]" />
                  <div className="absolute top-6 right-6 w-5 h-5 border-t-2 border-r-2 border-[#83B2A8]" />
                  <div className="absolute bottom-6 left-6 w-5 h-5 border-b-2 border-l-2 border-[#83B2A8]" />
                  <div className="absolute bottom-6 right-6 w-5 h-5 border-b-2 border-r-2 border-[#83B2A8]" />

                  {isScanning && (
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#83B2A8] to-transparent shadow-[0_0_15px_#83B2A8] animate-bounce" />
                  )}

                  <Camera className="w-12 h-12 text-[#4A7071]/50 animate-pulse" />
                </div>

                <button
                  onClick={handleSimulateScan}
                  disabled={isScanning}
                  className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[#83B2A8] to-[#6da197] hover:from-[#97c7bd] hover:to-[#83B2A8] text-[#09121D] font-bold text-sm shadow-lg shadow-[#83B2A8]/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Scanning Handshake QR in Dhaka Node...
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4" />
                      Simulate Scanner Handshake
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Booking Details Summary */}
        <div className="mt-5 pt-4 border-t border-[#4A7071]/30 text-xs space-y-2">
          <div className="flex justify-between items-center text-[#CBD6D3]/80">
            <span className="truncate max-w-[200px] font-semibold text-white">
              {qrModalBooking.productTitle}
            </span>
            <span className="font-mono text-[#83B2A8] font-bold">
              ৳{qrModalBooking.totalAmount.toLocaleString()} BDT
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#CBD6D3]/60">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#83B2A8]" />
              {qrModalBooking.startDate} → {qrModalBooking.endDate} ({qrModalBooking.days} days)
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#83B2A8]" />
              {qrModalBooking.pickupLocation.split('(')[0]}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
