import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Plus,
  Trash2,
  ShieldCheck,
  LogIn,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRentix } from '../context/RentixContext';
import { CategoryType, ProductSpec } from '../types';

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

export const ListItemPage: React.FC = () => {
  const { currentUser, isAuthenticated, createProduct, setIsAuthModalOpen, setAuthModalTab, setAuthModalReason } = useRentix();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Form State in BDT (৳)
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [category, setCategory] = useState<CategoryType>('cameras');
  const [condition, setCondition] = useState<'Brand New' | 'Like New' | 'Excellent' | 'Good'>('Like New');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');

  // Specs & Accessories
  const [specs, setSpecs] = useState<ProductSpec[]>([]);
  const [newSpecLabel, setNewSpecLabel] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const [includedAccessories, setIncludedAccessories] = useState<string[]>([]);
  const [newAccessory, setNewAccessory] = useState('');

  // Photos (URLs or Local base64)
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Pricing & Location (BDT)
  const [dailyRate, setDailyRate] = useState<number | ''>(2500);
  const [securityDeposit, setSecurityDeposit] = useState<number | ''>(12000);
  const [replacementValue, setReplacementValue] = useState<number | ''>(240000);
  const [district, setDistrict] = useState<string>(currentUser?.district || bangladeshDistricts[0]);
  const [isInstantBook, setIsInstantBook] = useState(true);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09121D] text-[#CBD6D3] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0C2B35] border border-[#4A7071] rounded-3xl p-8 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#83B2A8]/20 border-2 border-[#83B2A8] text-[#83B2A8] flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-white">List Your Gear on Rentix</h2>
          <p className="text-xs text-[#CBD6D3]/70 leading-relaxed">
            Please log in or create a verified account to list your camera, drone, or gadgets for rent in Bangladesh.
          </p>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setAuthModalReason('Sign in to list your hardware on Rentix');
                setAuthModalTab('login');
                setIsAuthModalOpen(true);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#83B2A8] to-[#6da197] text-[#09121D] font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <LogIn className="w-4 h-4" /> Sign In to Continue
            </button>

            <Link
              to="/"
              className="block w-full py-2.5 rounded-xl bg-[#09121D] hover:bg-[#071C23] border border-[#4A7071] text-xs text-[#CBD6D3] hover:text-white transition-colors"
            >
              ← Back to Rentix Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Format raw numeric value to comma-separated string for display
  const formatDisplayNumber = (val: number | ''): string => {
    if (val === '') return '';
    return val.toLocaleString('en-US');
  };

  // Strip non-digits, enforce max 7 digits limit
  const handleNumericInput = (rawVal: string, setter: (v: number | '') => void) => {
    const cleanVal = rawVal.replace(/,/g, '').trim();
    if (cleanVal === '') {
      setter('');
      return;
    }
    if (/^\d*$/.test(cleanVal)) {
      const cappedVal = cleanVal.slice(0, 7);
      setter(Number(cappedVal));
    }
  };

  const handleAddSpec = () => {
    if (newSpecLabel.trim() && newSpecValue.trim()) {
      setSpecs([...specs, { label: newSpecLabel.trim(), value: newSpecValue.trim() }]);
      setNewSpecLabel('');
      setNewSpecValue('');
    }
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleAddAccessory = () => {
    if (newAccessory.trim()) {
      setIncludedAccessories([...includedAccessories, newAccessory.trim()]);
      setNewAccessory('');
    }
  };

  const handleRemoveAccessory = (index: number) => {
    setIncludedAccessories(includedAccessories.filter((_, i) => i !== index));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleQuickFill = (type: 'camera' | 'drone' | 'console') => {
    if (type === 'camera') {
      setTitle('Sony A7 IV Hybrid Full-Frame Mirrorless');
      setBrand('Sony');
      setModel('ILCE-7M4');
      setCategory('cameras');
      setCondition('Like New');
      setTagline('33MP Exmor R CMOS, 4K 60p, 10-bit 4:2:2, 5-axis IBIS');
      setDescription('Pristine full-frame mirrorless camera for commercial video and portrait photography in Dhaka. Includes 2x NP-FZ100 batteries and 128GB V90 SD card.');
      setSpecs([
        { label: 'Sensor / Type', value: 'Full-Frame 33MP Exmor R CMOS' },
        { label: 'Max Video', value: '4K 60p 10-bit 4:2:2' },
        { label: 'Battery Health', value: '100% Original Capacity' }
      ]);
      setIncludedAccessories([
        'Original Power Charger',
        'Padded Hard Carry Bag',
        'Spare Battery'
      ]);
      setDailyRate(2500);
      setSecurityDeposit(12000);
      setReplacementValue(240000);
      setImages([
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&auto=format&fit=crop&q=80'
      ]);
    } else if (type === 'drone') {
      setTitle('DJI Mavic 3 Pro Cine Combo');
      setBrand('DJI');
      setModel('Mavic 3 Pro Cine');
      setCategory('drones');
      setCondition('Brand New');
      setTagline('Triple Camera System, Hasselblad 4/3 CMOS, Apple ProRes 422 HQ');
      setDescription('Flagship aerial cinematography drone in Gulshan. 3-camera system with 43-minute flight time and 1TB built-in SSD.');
      setSpecs([
        { label: 'Camera System', value: 'Hasselblad 4/3 CMOS + Dual Tele' },
        { label: 'Flight Time', value: '43 Mins' },
        { label: 'Internal Storage', value: '1TB Cine SSD' }
      ]);
      setIncludedAccessories([
        'DJI RC Pro Controller',
        '3x Intelligent Flight Batteries',
        'ND Filter Set (ND4/8/16/32)'
      ]);
      setDailyRate(3200);
      setSecurityDeposit(18000);
      setReplacementValue(380000);
      setImages([
        'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80'
      ]);
    } else {
      setTitle('Nintendo Switch OLED White Edition + 4 Games');
      setBrand('Nintendo');
      setModel('Switch OLED');
      setCategory('gaming');
      setCondition('Like New');
      setTagline('7.0" vibrant OLED screen, 64GB storage, wired LAN dock');
      setDescription('Complete handheld and TV dock setup. Preloaded with Mario Kart 8 Deluxe, Zelda Tears of the Kingdom, and Super Smash Bros.');
      setSpecs([
        { label: 'Display', value: '7.0" OLED Screen' },
        { label: 'Storage', value: '64GB Internal + 256GB MicroSD' }
      ]);
      setIncludedAccessories([
        'Official TV Docking Station',
        '2x Joy-Con Controllers',
        'Hardshell Carrying Case'
      ]);
      setDailyRate(650);
      setSecurityDeposit(3500);
      setReplacementValue(42000);
      setImages([
        'https://images.unsplash.com/photo-1612287232230-0eb25c5675e4?w=800&auto=format&fit=crop&q=80'
      ]);
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    const fallbackCover = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80';

    const newProd = createProduct({
      title: title || 'Custom Gadget',
      brand: brand || 'Pro Hardware',
      model: model || 'Edition',
      category,
      categoryLabel: category.toUpperCase(),
      tagline: tagline || 'High-performance hardware available for rent',
      description: description || 'Clean, tested gear available in Dhaka with verified QR escrow.',
      images: images.length > 0 ? images : [fallbackCover],
      dailyRate: dailyRate === '' ? 0 : dailyRate,
      securityDeposit: securityDeposit === '' ? 0 : securityDeposit,
      replacementValue: replacementValue === '' ? 0 : replacementValue,
      condition,
      specs,
      includedAccessories,
      location: 'Dhaka, Bangladesh',
      district,
      isInstantBook
    });

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });

    setTimeout(() => {
      navigate(`/product/${newProd.id}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#09121D] text-[#CBD6D3] pb-24 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Wizard Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#83B2A8]/10 text-[#83B2A8] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> ISD LENDER WIZARD (BANGLADESH)
          </div>
          <h1 className="text-3xl font-black text-white">List Your Gear for Rent</h1>
          <p className="text-xs text-[#CBD6D3]/70 mt-1 max-w-md mx-auto">
            Set your daily BDT rate, choose deposit requirements, and earn securely with local peer-to-peer handshakes.
          </p>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-xs text-[#CBD6D3]/60">Quick fill sample:</span>
            <button
              type="button"
              onClick={() => handleQuickFill('camera')}
              className="text-xs px-3 py-1 rounded-full bg-[#0C2B35] hover:bg-[#103A47] border border-[#4A7071] text-white transition-colors"
            >
              📷 Sony A7 IV
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('drone')}
              className="text-xs px-3 py-1 rounded-full bg-[#0C2B35] hover:bg-[#103A47] border border-[#4A7071] text-white transition-colors"
            >
              🚁 DJI Mavic 3
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('console')}
              className="text-xs px-3 py-1 rounded-full bg-[#0C2B35] hover:bg-[#103A47] border border-[#4A7071] text-white transition-colors"
            >
              🎮 Switch OLED
            </button>
          </div>
        </div>

        {/* Stepper Indicator */}
        <div className="flex items-center justify-between mb-8 bg-[#0C2B35] p-3 rounded-2xl border border-[#4A7071]/50">
          {[
            { num: 1, title: 'Basics' },
            { num: 2, title: 'Specs & Box' },
            { num: 3, title: 'Photos' },
            { num: 4, title: 'Pricing & Node' },
            { num: 5, title: 'Review' }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${step === s.num
                ? 'bg-[#83B2A8] text-[#09121D] shadow-md'
                : step > s.num
                  ? 'text-[#83B2A8]'
                  : 'text-[#CBD6D3]/50'
                }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step === s.num ? 'bg-[#09121D] text-[#83B2A8]' : 'border border-current'
                }`}>
                {s.num}
              </span>
              <span className="hidden sm:inline">{s.title}</span>
            </button>
          ))}
        </div>

        {/* WIZARD FORM CONTAINER */}
        <div className="bg-[#0C2B35] border border-[#4A7071] rounded-3xl p-6 sm:p-8 shadow-2xl">

          {/* STEP 1: BASICS */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-white mb-2">1. Basic Hardware Details</h3>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Listing Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sony A7 IV Full-Frame Mirrorless Camera"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-3 text-xs text-white placeholder-[#CBD6D3]/40 focus:border-[#83B2A8] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-3 text-xs text-white focus:border-[#83B2A8] focus:outline-none cursor-pointer"
                  >
                    <option value="cameras">Cameras & Optics</option>
                    <option value="drones">Drones & Aerial</option>
                    <option value="action-cams">Action Cameras</option>
                    <option value="gaming">Gaming & Handhelds</option>
                    <option value="vr">VR & Spatial</option>
                    <option value="audio">Audio & Music</option>
                    <option value="tools">Tools & Workshop</option>
                    <option value="camping">Camping & Power</option>
                    <option value="mobility">Mobility & Scooters</option>
                    <option value="tech">Tech & Satellite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sony, DJI, Apple"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-3 text-xs text-white placeholder-[#CBD6D3]/40 focus:border-[#83B2A8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Condition *
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as any)}
                    className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-3 text-xs text-white focus:border-[#83B2A8] focus:outline-none cursor-pointer"
                  >
                    <option value="Brand New">Brand New (Mint in Box)</option>
                    <option value="Like New">Like New (Flawless)</option>
                    <option value="Excellent">Excellent (Minor signs)</option>
                    <option value="Good">Good (Fully functional)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  One-Line Highlight / Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. 33MP Full-Frame, 4K 60p, includes 2x batteries and high-speed SD card"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-3 text-xs text-white placeholder-[#CBD6D3]/40 focus:border-[#83B2A8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Full Description & Care Instructions
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe sensor condition, included filters, ideal use cases, and any special pickup notes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-3 text-xs text-white placeholder-[#CBD6D3]/40 focus:border-[#83B2A8] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2: SPECS & ACCESSORIES */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">2. Technical Specifications</h3>
                <p className="text-xs text-[#CBD6D3]/70 mb-4">
                  Add key technical specifications for renters to review.
                </p>

                {/* Specs List */}
                {specs.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {specs.map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-[#09121D] p-3 rounded-xl border border-[#4A7071]/40 text-xs">
                        <div>
                          <span className="text-[#CBD6D3]/60">{s.label}: </span>
                          <span className="font-semibold text-white">{s.value}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSpec(idx)}
                          className="text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Spec Row */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Label (e.g. Lens Mount)"
                    value={newSpecLabel}
                    onChange={(e) => setNewSpecLabel(e.target.value)}
                    className="flex-1 bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-2.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. Sony E-Mount)"
                    value={newSpecValue}
                    onChange={(e) => setNewSpecValue(e.target.value)}
                    className="flex-1 bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-2.5 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="px-4 py-2.5 bg-[#83B2A8] text-[#09121D] rounded-xl font-bold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>

              {/* Handover Box Accessories */}
              <div className="pt-4 border-t border-[#4A7071]/30">
                <h4 className="text-sm font-bold text-white mb-2">Included Handover Accessories</h4>

                {includedAccessories.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {includedAccessories.map((acc, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-[#09121D] p-3 rounded-xl border border-[#4A7071]/40 text-xs">
                        <span className="text-white font-medium">✓ {acc}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAccessory(idx)}
                          className="text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add accessory (e.g. 2x CFexpress Type A Cards)"
                    value={newAccessory}
                    onChange={(e) => setNewAccessory(e.target.value)}
                    className="flex-1 bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-2.5 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddAccessory}
                    className="px-4 py-2.5 bg-[#83B2A8] text-[#09121D] rounded-xl font-bold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Item
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PHOTOS */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-white mb-1">3. Hardware Photos</h3>
              <p className="text-xs text-[#CBD6D3]/70 mb-4">
                Upload local photos directly from your device or paste image web URLs.
              </p>

              {/* Upload Box for Local Device Photos */}
              <label className="border-2 border-dashed border-[#4A7071] hover:border-[#83B2A8] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-[#09121D]/50 transition-colors mb-4">
                <Upload className="w-8 h-8 text-[#83B2A8] mb-2" />
                <span className="text-xs font-bold text-white">Click to upload photos from device</span>
                <span className="text-[10px] text-[#CBD6D3]/60 mt-0.5">Supports PNG, JPG, WEBP</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Photo Previews */}
              {images && images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden bg-[#09121D] border border-[#4A7071] group">
                      <img src={img} alt="gear" className="w-full h-full object-cover" />
                      {idx === 0 && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#83B2A8] text-[#09121D] font-bold text-[10px]">
                          Cover Photo
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-xs text-[#CBD6D3]/50 border border-[#4A7071]/30 rounded-2xl mb-4">
                  No photos uploaded yet. Upload a local file above or enter a web URL below.
                </div>
              )}

              {/* Add Web Image URL */}
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste web image URL (Unsplash or direct image link)..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1 bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-2.5 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-4 py-2.5 bg-[#83B2A8] text-[#09121D] rounded-xl font-bold text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Photo
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PRICING & LOCATION (BDT) */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-white mb-2">4. Pricing, Escrow Deposit & Location</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#09121D] p-4 rounded-2xl border border-[#4A7071]/50">
                  <label className="block text-xs font-semibold text-[#83B2A8] mb-1">
                    Daily Rate (৳ BDT) *
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={formatDisplayNumber(dailyRate)}
                    onChange={(e) => handleNumericInput(e.target.value, setDailyRate)}
                    className="w-full bg-transparent text-xl font-black text-white font-mono focus:outline-none"
                  />
                  <span className="text-[10px] text-[#CBD6D3]/50 mt-1 block">Paid to you per rental day</span>
                </div>

                <div className="bg-[#09121D] p-4 rounded-2xl border border-[#4A7071]/50">
                  <label className="block text-xs font-semibold text-[#83B2A8] mb-1">
                    Security Deposit (৳ BDT) *
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={formatDisplayNumber(securityDeposit)}
                    onChange={(e) => handleNumericInput(e.target.value, setSecurityDeposit)}
                    className="w-full bg-transparent text-xl font-black text-white font-mono focus:outline-none"
                  />
                  <span className="text-[10px] text-[#CBD6D3]/50 mt-1 block">Held safely in Smart Escrow</span>
                </div>

                <div className="bg-[#09121D] p-4 rounded-2xl border border-[#4A7071]/50">
                  <label className="block text-xs font-semibold text-[#83B2A8] mb-1">
                    Replacement Value (৳ BDT)
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={formatDisplayNumber(replacementValue)}
                    onChange={(e) => handleNumericInput(e.target.value, setReplacementValue)}
                    className="w-full bg-transparent text-xl font-black text-white font-mono focus:outline-none"
                  />
                  <span className="text-[10px] text-[#CBD6D3]/50 mt-1 block">Hardware market valuation</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Neighborhood Node (Bangladesh) *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-3 text-xs text-white focus:border-[#83B2A8] focus:outline-none cursor-pointer"
                >
                  {bangladeshDistricts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Instant Book Toggle */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#09121D] border border-[#4A7071]/40">
                <div>
                  <span className="text-xs font-bold text-white block">Enable Instant Booking</span>
                  <span className="text-[11px] text-[#CBD6D3]/60">Allow verified renters with trust score &gt;90 to book immediately</span>
                </div>
                <input
                  type="checkbox"
                  checked={isInstantBook}
                  onChange={(e) => setIsInstantBook(e.target.checked)}
                  className="w-5 h-5 accent-[#83B2A8] cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & PUBLISH */}
          {step === 5 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-white mb-2">5. Review Your Listing</h3>

              <div className="p-4 rounded-2xl bg-[#09121D] border border-[#4A7071]/50 flex gap-4">
                {images && images.length > 0 ? (
                  <img
                    src={images[0]}
                    alt="cover"
                    className="w-24 h-24 rounded-xl object-cover border border-[#4A7071]"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-[#0C2B35] border border-[#4A7071] flex items-center justify-center text-[#CBD6D3]/40">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
                <div className="flex-1">
                  <span className="px-2 py-0.2 rounded bg-[#0C2B35] text-[#83B2A8] text-[10px] font-semibold">
                    {category.toUpperCase()} • {condition}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">{title || 'Untitled Hardware'}</h4>
                  <p className="text-xs text-[#CBD6D3]/70">{tagline}</p>

                  <div className="flex items-center gap-4 mt-2 pt-2 border-t border-[#4A7071]/30 text-xs">
                    <span className="font-mono font-bold text-white">৳{(dailyRate || 0).toLocaleString()}/day</span>
                    <span className="text-[#83B2A8] font-mono">Deposit: ৳{(securityDeposit || 0).toLocaleString()}</span>
                    <span className="text-[#CBD6D3]/60">Location: {district}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#83B2A8]/10 border border-[#83B2A8]/30 text-xs text-[#CBD6D3] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#83B2A8] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Rentix Escrow Protection Agreement</span>
                  <p className="text-[11px] text-[#CBD6D3]/80 mt-0.5">
                    By publishing, your gear will be live across Bangladesh. Every booking requires identity verification and escrow hold before in-person QR handshake.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#4A7071]/30">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl bg-[#09121D] hover:bg-[#071C23] border border-[#4A7071] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl bg-[#83B2A8] hover:bg-[#97c7bd] text-[#09121D] font-bold text-xs flex items-center gap-1.5 shadow-md transition-transform hover:scale-105"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#83B2A8] to-[#6da197] hover:from-[#97c7bd] hover:to-[#83B2A8] text-[#09121D] font-black text-sm shadow-xl shadow-[#83B2A8]/20 flex items-center gap-2 transition-transform hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                Publish Listing to Live Feed
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};