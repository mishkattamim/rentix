import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  CheckCircle2, 
  QrCode, 
  Sparkles, 
  RefreshCw,
  Info,
  MapPin,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, Booking } from '../../types';
import { useRentix } from '../../context/RentixContext';

interface CheckoutModalProps {
  product: Product;
  startDate: string;
  endDate: string;
  days: number;
  handoverMethod: 'pickup' | 'delivery';
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  product,
  startDate,
  endDate,
  days,
  handoverMethod,
  onClose
}) => {
  const { currentUser, createBooking, setQrModalBooking } = useRentix();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card'>('bkash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  const subtotal = product.dailyRate * days;
  const deliveryFee = handoverMethod === 'delivery' ? 150 : 0; // ৳150 BDT delivery fee
  const platformFee = Math.round(subtotal * 0.08);
  const insuranceFee = Math.round(subtotal * 0.05);
  const securityDeposit = product.securityDeposit;
  const totalAmount = subtotal + deliveryFee + securityDeposit + platformFee + insuranceFee;

  const handlePayAndEscrow = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      
      const newBooking = createBooking({
        productId: product.id,
        productTitle: product.title,
        productImage: product.images[0],
        productCategory: product.category,
        ownerId: product.ownerId,
        renterId: currentUser?.id || 'guest-user',
        startDate,
        endDate,
        days,
        dailyRate: product.dailyRate,
        subtotal,
        securityDeposit,
        platformFee,
        insuranceFee,
        totalAmount,
        handoverMethod,
        pickupLocation: `${product.district} (${product.location})`
      });

      setCreatedBooking(newBooking);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0C2B35] border border-[#4A7071] rounded-3xl shadow-2xl overflow-hidden p-6 text-[#CBD6D3]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#09121D]/60 hover:bg-[#09121D] text-[#CBD6D3] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {createdBooking ? (
          /* SUCCESS STATE */
          <div className="text-center py-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#10B981]/20 border-2 border-[#10B981] flex items-center justify-center mx-auto mb-3 text-[#10B981]">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#83B2A8]/10 text-[#83B2A8] text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Escrow Deposit Secured (BDT)
            </div>

            <h3 className="text-2xl font-black text-white">Booking Confirmed!</h3>
            <p className="text-xs text-[#CBD6D3]/80 mt-1 max-w-sm mx-auto leading-relaxed">
              Your payment of <strong className="text-[#83B2A8]">৳{createdBooking.totalAmount.toLocaleString()}</strong> is locked in Rentix Smart Escrow. The refundable deposit (৳{createdBooking.securityDeposit.toLocaleString()}) will be returned immediately upon return handshake.
            </p>

            {/* Handshake QR Summary Card */}
            <div className="mt-5 p-4 rounded-2xl bg-[#09121D] border border-[#4A7071]/50 text-left space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#CBD6D3]/70">Handover Protocol:</span>
                <span className="font-mono text-[#83B2A8] font-semibold">{createdBooking.qrCode}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#CBD6D3]/70">Pickup Location:</span>
                <span className="text-white font-medium truncate max-w-[200px]">{createdBooking.pickupLocation}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#CBD6D3]/70">Rental Period:</span>
                <span className="text-white font-medium">{createdBooking.startDate} to {createdBooking.endDate}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2.5 mt-6">
              <button
                onClick={() => {
                  onClose();
                  setQrModalBooking(createdBooking);
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#83B2A8] to-[#6da197] text-[#09121D] font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#83B2A8]/20 hover:scale-[1.02] transition-transform"
              >
                <QrCode className="w-4 h-4" />
                View Handover QR
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate('/messages');
                }}
                className="flex-1 py-3 rounded-xl bg-[#09121D] hover:bg-[#071C23] border border-[#4A7071] text-white font-semibold text-xs transition-colors"
              >
                Open Chat with Owner
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM */
          <div>
            {/* Modal Header */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#83B2A8]/10 text-[#83B2A8] text-xs font-semibold mb-2">
                <Lock className="w-3.5 h-3.5" /> ISD 100% Escrow Checkout (Bangladesh)
              </div>
              <h3 className="text-xl font-bold text-white">Confirm Rental Booking</h3>
            </div>

            {/* Product Mini Preview */}
            <div className="flex items-center gap-3 p-3 bg-[#09121D] rounded-2xl border border-[#4A7071]/40 mb-4">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-14 h-14 rounded-xl object-cover border border-[#4A7071]/50"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{product.title}</h4>
                <div className="flex items-center gap-2 text-[11px] text-[#CBD6D3]/70 mt-0.5">
                  <span>৳{product.dailyRate.toLocaleString()}/day</span>
                  <span>•</span>
                  <span>{days} days</span>
                  <span>•</span>
                  <span className="text-[#83B2A8] font-semibold">৳{subtotal.toLocaleString()} rental</span>
                </div>
                <span className="text-[10px] text-[#83B2A8] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" /> {product.district}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-white mb-2">
                Select Escrow Payment Method (Bangladesh):
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bkash')}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    paymentMethod === 'bkash'
                      ? 'bg-[#83B2A8]/20 border-[#83B2A8] text-white font-semibold'
                      : 'bg-[#09121D]/60 border-[#4A7071]/40 text-[#CBD6D3] hover:bg-[#09121D]'
                  }`}
                >
                  <Smartphone className="w-4 h-4 mx-auto mb-1 text-pink-400" />
                  <span className="text-pink-400 font-bold block">bKash</span>
                  Escrow Lock
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('nagad')}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    paymentMethod === 'nagad'
                      ? 'bg-[#83B2A8]/20 border-[#83B2A8] text-white font-semibold'
                      : 'bg-[#09121D]/60 border-[#4A7071]/40 text-[#CBD6D3] hover:bg-[#09121D]'
                  }`}
                >
                  <Smartphone className="w-4 h-4 mx-auto mb-1 text-orange-400" />
                  <span className="text-orange-400 font-bold block">Nagad</span>
                  Direct Escrow
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-[#83B2A8]/20 border-[#83B2A8] text-white font-semibold'
                      : 'bg-[#09121D]/60 border-[#4A7071]/40 text-[#CBD6D3] hover:bg-[#09121D]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-[#83B2A8]" />
                  <span className="font-bold block">Card</span>
                  Visa / Master
                </button>
              </div>
            </div>

            {/* Escrow Breakdown */}
            <div className="bg-[#09121D] p-3.5 rounded-2xl border border-[#4A7071]/40 space-y-2 text-xs mb-4">
              <div className="flex justify-between text-[#CBD6D3]/80">
                <span>Rental Duration ({days} days × ৳{product.dailyRate.toLocaleString()}):</span>
                <span className="font-mono text-white">৳{subtotal.toLocaleString()}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between text-[#CBD6D3]/80">
                  <span>Express Courier in Dhaka:</span>
                  <span className="font-mono text-white">৳{deliveryFee}</span>
                </div>
              )}
              <div className="flex justify-between text-[#CBD6D3]/80">
                <span className="flex items-center gap-1">
                  Refundable Security Deposit:
                  <span title="Released back upon return QR handshake"><Info className="w-3 h-3 text-[#83B2A8]" /></span>
                </span>
                <span className="font-mono text-[#83B2A8] font-semibold">৳{securityDeposit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#CBD6D3]/70 text-[11px]">
                <span>ISD Platform Fee (8%):</span>
                <span className="font-mono">৳{platformFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#CBD6D3]/70 text-[11px]">
                <span>Hardware Damage Insurance (5%):</span>
                <span className="font-mono">৳{insuranceFee.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-[#4A7071]/30 flex justify-between items-center text-sm font-bold text-white">
                <span>Total Amount in Escrow:</span>
                <span className="text-[#83B2A8] font-mono text-base">৳{totalAmount.toLocaleString()} BDT</span>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-[#CBD6D3]/60 mb-4 flex items-center gap-1.5 leading-tight">
              <ShieldCheck className="w-4 h-4 text-[#10B981] flex-shrink-0" />
              Funds are never sent directly to owner until QR handshake is completed in person.
            </p>

            {/* CTA Button */}
            <button
              onClick={handlePayAndEscrow}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#83B2A8] to-[#6da197] hover:from-[#97c7bd] hover:to-[#83B2A8] text-[#09121D] font-bold text-sm shadow-lg shadow-[#83B2A8]/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Locking Funds in Smart Escrow...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Hold Escrow & Generate QR (৳{totalAmount.toLocaleString()})
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
