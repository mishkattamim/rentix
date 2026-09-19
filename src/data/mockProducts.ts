import { Product } from '../types';
import { mockUsers } from './mockUsers';

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    title: 'Sony FX3 Full-Frame Cinema Camera (ILME-FX3)',
    brand: 'Sony',
    model: 'FX3 Cinema Line',
    category: 'cameras',
    categoryLabel: 'Cinema Cameras',
    tagline: '12.1MP Full-Frame Exmor R CMOS, 4K 120p, S-Cinetone, Active Cooling',
    description: 'Cinema-line performance in a compact body. Perfect for TV commercials, dramas, and high-framerate documentary work in Dhaka. Includes XLR top handle audio unit, two CFexpress Type A 160GB cards, and 3x NP-FZ100 batteries.',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80'
    ],
    dailyRate: 3800, // ৳3,800 BDT
    weeklyRateDiscount: 20,
    securityDeposit: 18000, // ৳18,000 BDT
    replacementValue: 420000, // ৳420,000 BDT
    rating: 4.98,
    reviewCount: 34,
    distanceKm: 1.8,
    location: 'Dhaka, Bangladesh',
    district: 'Dhanmondi (Road 27)',
    ownerId: 'user-1',
    owner: mockUsers[0],
    isInstantBook: true,
    condition: 'Like New',
    specs: [
      { label: 'Sensor', value: '12.1MP Full-Frame Back-Illuminated CMOS' },
      { label: 'Max Video', value: '4K UHD up to 120fps 10-bit 4:2:2' },
      { label: 'Audio Unit', value: 'XLR Top Handle with 2x XLR/TRS Inputs' },
      { label: 'Dynamic Range', value: '15+ Stops with S-Log3' },
      { label: 'ISO Range', value: '80 - 102,400 (Expandable to 409,600)' },
      { label: 'Mount', value: 'Sony E-Mount' }
    ],
    includedAccessories: [
      'XLR Top Handle Unit',
      '3x Sony NP-FZ100 Batteries + Dual Charger',
      '2x Sony Tough CFexpress Type A 160GB',
      'CFexpress USB-C Card Reader',
      'Pelican 1450 Weatherproof Hard Case'
    ],
    rentalTerms: [
      'ISD ID Verification / NID required before pickup',
      'Sensor must be inspected during QR handover',
      'No sub-leasing to third parties'
    ],
    isAvailable: true,
    featured: true,
    popularScore: 99,
    createdAt: '2025-01-15'
  },
  {
    id: 'prod-2',
    title: 'DJI Mini 4 Pro Fly More Combo + DJI RC 2',
    brand: 'DJI',
    model: 'Mini 4 Pro',
    category: 'drones',
    categoryLabel: 'Drones & Aerial',
    tagline: 'Under 249g, 4K/60fps HDR True Vertical Shooting, Omnidirectional Sensing',
    description: 'The ultimate portable travel drone. Captures breathtaking 4K 60fps HDR and D-Log M color. Comes with the brilliant DJI RC 2 built-in screen controller, 3 Intelligent Flight Plus batteries (up to 45 min each), and ND filter set.',
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&auto=format&fit=crop&q=80'
    ],
    dailyRate: 1800, // ৳1,800 BDT
    weeklyRateDiscount: 15,
    securityDeposit: 9000, // ৳9,000 BDT
    replacementValue: 125000, // ৳125,000 BDT
    rating: 5.0,
    reviewCount: 48,
    distanceKm: 3.2,
    location: 'Dhaka, Bangladesh',
    district: 'Gulshan 2 (Near Circle)',
    ownerId: 'user-2',
    owner: mockUsers[1],
    isInstantBook: true,
    condition: 'Brand New',
    specs: [
      { label: 'Weight', value: '< 249 g' },
      { label: 'Video Res', value: '4K/60fps HDR & 4K/100fps Slow Motion' },
      { label: 'Obstacle Sensing', value: 'Omnidirectional Optical' },
      { label: 'Max Flight Time', value: '34 to 45 Mins per Battery' },
      { label: 'Transmission', value: 'DJI O4 up to 20km FHD' },
      { label: 'Controller', value: 'DJI RC 2 with 5.5" 700-nit screen' }
    ],
    includedAccessories: [
      'DJI RC 2 Remote Controller',
      '3x Intelligent Flight Batteries',
      'Two-Way Charging Hub',
      'ND Filter Set (ND16/64/256)',
      'Shoulder Bag + Propeller Guard'
    ],
    rentalTerms: [
      'User is responsible for adhering to CAAB flight safety zones',
      'Full battery handover upon pickup in Gulshan'
    ],
    isAvailable: true,
    featured: true,
    popularScore: 98,
    createdAt: '2025-02-01'
  },
  {
    id: 'prod-3',
    title: 'GoPro HERO 12 Black Creator Edition Bundle',
    brand: 'GoPro',
    model: 'HERO 12 Black',
    category: 'action-cams',
    categoryLabel: 'Action Cameras',
    tagline: '5.3K60 Video, HyperSmooth 6.0, Volta Battery Grip, Media Mod & Light',
    description: 'All-in-one content creation powerhouse. Featuring 5.3K HDR recording, Bluetooth audio support for wireless mics, and over 5 hours of total 4K recording with Volta battery grip. Ideal for tours across Sajek, Cox\'s Bazar, and Sylhet.',
    images: [
      'https://images.unsplash.com/photo-1477160814815-7f4479b86c97?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    ],
    dailyRate: 1100, // ৳1,100 BDT
    weeklyRateDiscount: 10,
    securityDeposit: 5000, // ৳5,000 BDT
    replacementValue: 65000,
    rating: 4.85,
    reviewCount: 29,
    distanceKm: 4.5,
    location: 'Dhaka, Bangladesh',
    district: 'Motijheel C/A',
    ownerId: 'user-13',
    owner: mockUsers[12],
    isInstantBook: true,
    condition: 'Excellent',
    specs: [
      { label: 'Max Resolution', value: '5.3K 60fps / 4K 120fps HDR' },
      { label: 'Stabilization', value: 'HyperSmooth 6.0 + 360° Horizon Lock' },
      { label: 'Waterproof', value: '33ft (10m) without housing' },
      { label: 'Photo Res', value: '27MP RAW' },
      { label: 'Wireless Audio', value: 'AirPods & Bluetooth Mic Support' }
    ],
    includedAccessories: [
      'Volta Battery Grip & Tripod',
      'Media Mod with directional mic',
      'Light Mod (200 Lumens)',
      '2x Enduro Cold-Weather Batteries',
      'SanDisk Extreme Pro 256GB MicroSD',
      'Chest Mount & Handlebar Mount'
    ],
    rentalTerms: [
      'Waterproof seal must be confirmed closed before sea/water immersion'
    ],
    isAvailable: true,
    featured: false,
    popularScore: 88,
    createdAt: '2025-01-20'
  },
  {
    id: 'prod-4',
    title: 'Valve Steam Deck OLED 1TB Limited Edition',
    brand: 'Valve',
    model: 'Steam Deck OLED',
    category: 'gaming',
    categoryLabel: 'Gaming & VR',
    tagline: '7.4" 90Hz HDR OLED, 50Wh Battery, Wi-Fi 6E, Official Docking Station',
    description: 'Experience your PC game library on the go with gorgeous HDR true blacks, 90Hz refresh rate, and upgraded thermals. Comes pre-configured with official Steam Deck Dock, 2 wireless controllers, and HDMI 2.1 cable.',
    images: [
      'https://images.unsplash.com/photo-1718966324515-3591157516d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3RlYW0lMjBkZWNrfGVufDB8fDB8fHww'
    ],
    dailyRate: 850, // ৳850 BDT
    weeklyRateDiscount: 15,
    securityDeposit: 5000,
    replacementValue: 85000,
    rating: 4.92,
    reviewCount: 21,
    distanceKm: 2.1,
    location: 'Dhaka, Bangladesh',
    district: 'Banani (Block D)',
    ownerId: 'user-3',
    owner: mockUsers[2],
    isInstantBook: true,
    condition: 'Like New',
    specs: [
      { label: 'Screen', value: '7.4" 1280x800 HDR OLED (1000 nits peak)' },
      { label: 'Refresh Rate', value: 'Up to 90Hz' },
      { label: 'APU', value: '6nm AMD APU (Zen 2 + RDNA 2)' },
      { label: 'Storage', value: '1TB NVMe SSD + 512GB MicroSD' },
      { label: 'Battery', value: '50Wh (3-12 hours of gameplay)' }
    ],
    includedAccessories: [
      'Official Valve Steam Deck Dock',
      '45W GaN Fast Charger',
      'Slim Hardshell Carrying Case',
      '2x 8BitDo Ultimate Wireless Gamepads',
      'HDMI 2.1 4K Cable'
    ],
    rentalTerms: [
      'Device wiped cleanly before handover; login with your Steam ID'
    ],
    isAvailable: true,
    featured: true,
    popularScore: 92,
    createdAt: '2025-02-10'
  },
  {
    id: 'prod-5',
    title: 'Fender Player Stratocaster + Boss Katana-50 MkII',
    brand: 'Fender',
    model: 'Player Stratocaster Polar White',
    category: 'audio',
    categoryLabel: 'Audio & Instruments',
    tagline: 'Alder body, Maple neck, 3 Player Series Alnico 5 Pickups, 50W Modeling Amp',
    description: 'Classic iconic Strat tone ready for recording or stage shows in Dhaka. Freshly setup with low action and 10-46 strings. Paired with Boss Katana-50 MkII amp featuring 60 built-in Boss effects, headphone practice out, and USB recording out.',
    images: [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800&auto=format&fit=crop&q=80'
    ],
    dailyRate: 1400, // ৳1,400 BDT
    weeklyRateDiscount: 20,
    securityDeposit: 7500,
    replacementValue: 120000,
    rating: 4.95,
    reviewCount: 31,
    distanceKm: 2.8,
    location: 'Dhaka, Bangladesh',
    district: 'Bashundhara R/A (Block C)',
    ownerId: 'user-5',
    owner: mockUsers[4],
    isInstantBook: false,
    condition: 'Excellent',
    specs: [
      { label: 'Body & Finish', value: 'Alder in Polar White Gloss' },
      { label: 'Pickups', value: '3x Player Series Alnico 5 Strat Single-Coil' },
      { label: 'Neck', value: 'Modern "C" Maple with 9.5" Radius' },
      { label: 'Amplifier', value: 'Boss Katana-50 MkII 50W 1x12"' },
      { label: 'Effects', value: '60+ Built-in Boss DSP FX' }
    ],
    includedAccessories: [
      'Boss Katana-50 MkII Amplifier',
      'Fender Padded Gig Bag',
      '2x Mogami Gold 10ft Guitar Cables',
      'Hercules Auto-Grip Guitar Stand',
      'Snark Clip-on Tuner & Picks'
    ],
    rentalTerms: [
      'Please keep in AC temperature controlled environment',
      'Tremolo arm included in case'
    ],
    isAvailable: true,
    featured: false,
    popularScore: 84,
    createdAt: '2025-01-05'
  },
  {
    id: 'prod-6',
    title: 'DeWalt 20V MAX Brushless Hammer Drill & Impact Driver Combo',
    brand: 'DeWalt',
    model: 'DCK299P2 Combo Kit',
    category: 'tools',
    categoryLabel: 'Tools & Workshop',
    tagline: 'Heavy-duty 3-speed Hammer Drill + 1/4" Impact Driver with 2x 5.0Ah XR Batteries',
    description: 'Pro contractor-grade tool set for apartment renovation, interior setups, and concrete drilling in Dhaka. High-torque brushless motors provide maximum power and run time. Includes 40-piece masonry and titanium drill bit set.',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=800&auto=format&fit=crop&q=80'
    ],
    dailyRate: 750, // ৳750 BDT
    weeklyRateDiscount: 25,
    securityDeposit: 3500,
    replacementValue: 48000,
    rating: 4.8,
    reviewCount: 19,
    distanceKm: 5.6,
    location: 'Dhaka, Bangladesh',
    district: 'Mohammadpur (Ring Road)',
    ownerId: 'user-7',
    owner: mockUsers[6],
    isInstantBook: true,
    condition: 'Excellent',
    specs: [
      { label: 'Voltage', value: '20V MAX Lithium Ion' },
      { label: 'Drill Max RPM', value: '2,000 RPM & 38,250 BPM Hammer' },
      { label: 'Impact Max Torque', value: '1,825 in-lbs' },
      { label: 'Batteries', value: '2x 5.0Ah XR High Capacity' }
    ],
    includedAccessories: [
      'DCD996 3-Speed Hammer Drill',
      'DCF887 1/4" 3-Speed Impact Driver',
      '2x 20V MAX 5.0Ah Lithium Ion Batteries',
      'Fast Charger + ToughSystem Heavy Box',
      '40-piece DeWalt Bit & Driver Set'
    ],
    rentalTerms: [
      'Safety glasses required during operation',
      'Return with clean battery contacts'
    ],
    isAvailable: true,
    featured: false,
    popularScore: 78,
    createdAt: '2025-01-12'
  },
  {
    id: 'prod-7',
    title: 'Big Agnes Copper Spur HV UL2 Ultralight Bikepack Tent',
    brand: 'Big Agnes',
    model: 'Copper Spur HV UL2',
    category: 'camping',
    categoryLabel: 'Camping & Outdoor',
    tagline: 'Ultralight 3-season 2-person tent, 1.4kg trail weight, awning vestibules',
    description: 'The gold standard in ultralight trekking and camping. Dual doors with expansive awning-style vestibules for gear storage. Perfect for Sajek, Bandarban, and Tanguar Haor trips. Sets up in under 4 minutes with DAC featherlight aluminum poles.',
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&auto=format&fit=crop&q=80'
    ],
    dailyRate: 950, // ৳950 BDT
    weeklyRateDiscount: 15,
    securityDeposit: 5000,
    replacementValue: 62000,
    rating: 4.97,
    reviewCount: 46,
    distanceKm: 3.5,
    location: 'Dhaka, Bangladesh',
    district: 'Uttara (Sector 7)',
    ownerId: 'user-4',
    owner: mockUsers[3],
    isInstantBook: true,
    condition: 'Like New',
    specs: [
      { label: 'Capacity', value: '2 Persons (3-Season)' },
      { label: 'Trail Weight', value: '1.42 kg (3 lbs 2 oz)' },
      { label: 'Floor Area', value: '29 sq ft / 2.7 sq m' },
      { label: 'Poles', value: 'DAC Featherlite NFL and NSL' },
      { label: 'Waterproof', value: '1200mm PU coating silicone-treated nylon' }
    ],
    includedAccessories: [
      'Tent Body & Rainfly with Awning Setup',
      'DAC Aluminum Pole Set & Repair Sleeve',
      '8x Dirt Dagger UL Aluminum Stakes',
      'Custom Big Agnes Footprint Groundsheet',
      'Compression Dry Sack'
    ],
    rentalTerms: [
      'Never pack damp; please shake out dirt before return',
      'No open flames inside or within 2m of tent'
    ],
    isAvailable: true,
    featured: true,
    popularScore: 95,
    createdAt: '2025-01-28'
  },
  {
    id: 'prod-8',
    title: 'Apple Vision Pro 512GB Spatial Computer',
    brand: 'Apple',
    model: 'Vision Pro 512GB',
    category: 'vr',
    categoryLabel: 'Gaming & VR',
    tagline: 'Ultra-high-res 23M pixel micro-OLED displays, 3D Spatial Audio, Eye & Hand Tracking',
    description: 'Transform how you work, watch, and develop with spatial computing. Features dual 4K micro-OLED displays, R1 real-time processing chip, and visionOS 2.0. Sanitized using ISD Lab UV sterilizer before every handover in Chittagong/Dhaka.',
    images: [
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=800&auto=format&fit=crop&q=80'
    ],
    dailyRate: 5500, // ৳5,500 BDT
    weeklyRateDiscount: 20,
    securityDeposit: 35000, // ৳35,000 BDT
    replacementValue: 480000,
    rating: 5.0,
    reviewCount: 53,
    distanceKm: 6.2,
    location: 'Chittagong, Bangladesh',
    district: 'GEC Circle, Chittagong',
    ownerId: 'user-8',
    owner: mockUsers[7],
    isInstantBook: false,
    condition: 'Brand New',
    specs: [
      { label: 'Displays', value: '23 Million Pixels across dual Micro-OLED' },
      { label: 'Chips', value: 'M2 (8-core CPU) + R1 (12ms photon-to-motion)' },
      { label: 'Audio', value: 'Spatial Audio with Dynamic Head Tracking' },
      { label: 'Controls', value: 'Eyes, Hands, and Voice' },
      { label: 'Storage', value: '512GB High-Speed Unified SSD' }
    ],
    includedAccessories: [
      'Solo Knit Band (M) + Dual Loop Band (M)',
      'Light Seal + 2x Light Seal Cushions (W+ and N+)',
      'Apple Vision Pro Battery Pack + USB-C 30W Fast Charger',
      'Front Protective Cover + Polishing Cloth',
      'Spigen Rugged Lock Hard Travel Case'
    ],
    rentalTerms: [
      'Strict ID verification and signed ISD lab escrow agreement',
      'Handover includes 10-minute eye & hand calibration walkthrough'
    ],
    isAvailable: true,
    featured: true,
    popularScore: 100,
    createdAt: '2025-02-15'
  },
  {
    id: 'prod-9',
    title: 'Insta360 X4 8K 360 Action Camera Creator Kit',
    brand: 'Insta360',
    model: 'X4 8K Edition',
    category: 'action-cams',
    categoryLabel: 'Action Cameras',
    tagline: '8K 30fps 360° Capture, 4K 100fps Slow-mo, Invisible Selfie Stick, AI Reframing',
    description: 'Immerse your viewers in hyper-crisp 8K 360-degree footage. Never miss a shot with shoot-first, reframe-later workflow in the Insta360 app. Includes 114cm Invisible Selfie Stick and bullet-time cord.',
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80'
    ],
    dailyRate: 1300, // ৳1,300 BDT
    weeklyRateDiscount: 15,
    securityDeposit: 6000,
    replacementValue: 72000,
    rating: 4.89,
    reviewCount: 37,
    distanceKm: 2.3,
    location: 'Dhaka, Bangladesh',
    district: 'Mirpur 10 (Near Stadium)',
    ownerId: 'user-6',
    owner: mockUsers[5],
    isInstantBook: true,
    condition: 'Like New',
    specs: [
      { label: 'Video Res', value: '8K 30fps / 5.7K 60fps 360°' },
      { label: 'Single Lens Mode', value: '4K 60fps Ultra-Wide MaxView' },
      { label: 'Stabilization', value: 'FlowState + 360° Horizon Lock' },
      { label: 'Battery', value: '2290mAh (up to 135 mins recording)' },
      { label: 'Waterproof', value: '10m (33ft) naked' }
    ],
    includedAccessories: [
      '114cm Invisible Action Selfie Stick',
      'Standard Lens Guards + Premium Glass Guards',
      '2x Insta360 X4 Batteries + Fast Charge Hub',
      'Bullet Time Handle / Mini Tripod',
      'SanDisk Extreme 256GB MicroSD card'
    ],
    rentalTerms: [
      'Keep lens guard attached when not shooting',
      'Clean lenses with microfiber only'
    ],
    isAvailable: true,
    featured: false,
    popularScore: 89,
    createdAt: '2025-01-18'
  },
  {
    id: 'prod-10',
    title: 'Canon EOS R5 C 8K Hybrid Cinema Camera',
    brand: 'Canon',
    model: 'EOS R5 C',
    category: 'cameras',
    categoryLabel: 'Cinema Cameras',
    tagline: '45MP Full-Frame CMOS, Internal 8K 60p RAW Light, Active Cooling Fan',
    description: 'The pinnacle of photo and cinema hybrid shooting. Switch between a 45MP high-res still camera and a dedicated full-blown Cinema EOS platform with uncropped 8K 60p Cinema RAW Light. Paired with RF 24-70mm f/2.8L IS USM lens.',
    images: [
      'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80'
    ],
    dailyRate: 4500, // ৳4,500 BDT
    weeklyRateDiscount: 20,
    securityDeposit: 22000,
    replacementValue: 520000,
    rating: 4.96,
    reviewCount: 36,
    distanceKm: 4.1,
    location: 'Chittagong, Bangladesh',
    district: 'Agrabad C/A, Chittagong',
    ownerId: 'user-10',
    owner: mockUsers[9],
    isInstantBook: false,
    condition: 'Like New',
    specs: [
      { label: 'Sensor', value: '45MP Full-Frame Dual Pixel CMOS AF II' },
      { label: 'Cinema Video', value: '8K 60p Internal RAW Light & 4K 120p' },
      { label: 'Cooling', value: 'Active Internal Cooling Fan for Unlimited Recording' },
      { label: 'Dual Card Slots', value: '1x CFexpress Type B + 1x SD UHS-II' },
      { label: 'Included Lens', value: 'Canon RF 24-70mm f/2.8L IS USM' }
    ],
    includedAccessories: [
      'Canon RF 24-70mm f/2.8L IS USM Lens + Lens Hood',
      '4x Canon LP-E6NH High-Capacity Batteries',
      'ProGrade Digital 512GB CFexpress Type B Card',
      'SmallRig Full Camera Cage with Top Handle',
      'Pelican Air 1525 Wheeled Hard Case'
    ],
    rentalTerms: [
      'Lens element must be clean and free of haze/scratches upon inspection',
      'Strict escrow hold applies'
    ],
    isAvailable: true,
    featured: true,
    popularScore: 97,
    createdAt: '2025-01-22'
  },
  {
    id: 'prod-11',
    title: 'Segway Ninebot KickScooter Max G2 (Double Suspension)',
    brand: 'Segway Ninebot',
    model: 'Max G2',
    category: 'mobility',
    categoryLabel: 'Mobility & Scooters',
    tagline: 'Up to 70km Range, 35 km/h, Double Suspension, Apple Find My Integration',
    description: 'The smoothest, most reliable electric scooter for city commuting in Sylhet or Dhaka. Features hydraulic front suspension, dual rear spring suspension, 10-inch self-sealing tubeless tires, and built-in turn signal indicators.',
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80'
    ],
    dailyRate: 950, // ৳950 BDT
    weeklyRateDiscount: 15,
    securityDeposit: 6000,
    replacementValue: 95000,
    rating: 4.88,
    reviewCount: 28,
    distanceKm: 3.8,
    location: 'Sylhet, Bangladesh',
    district: 'Zindabazar, Sylhet',
    ownerId: 'user-9',
    owner: mockUsers[8],
    isInstantBook: true,
    condition: 'Excellent',
    specs: [
      { label: 'Motor', value: '450W Nominal / 900W Max Peak Power' },
      { label: 'Max Range', value: 'Up to 70 km (Eco Mode)' },
      { label: 'Max Speed', value: '35 km/h (22 mph)' },
      { label: 'Tires', value: '10" Self-Healing Pneumatic Tires with Jelly Layer' },
      { label: 'Tracking', value: 'Apple Find My Network Built-in' }
    ],
    includedAccessories: [
      'Integrated Fast AC Charger Cable',
      'Kryptonite Heavy Duty U-Lock + Cable',
      'Lumos Matrix Smart LED Helmet',
      'Phone Mount Holder installed on handlebar'
    ],
    rentalTerms: [
      'Helmet must be worn at all times',
      'Do not ride in deep waterlogged streets or heavy monsoon rain'
    ],
    isAvailable: true,
    featured: false,
    popularScore: 82,
    createdAt: '2025-01-30'
  },
  {
    id: 'prod-12',
    title: 'RØDE Wireless PRO Dual-Channel Wireless Mic System',
    brand: 'RØDE',
    model: 'Wireless PRO Kit',
    category: 'audio',
    categoryLabel: 'Audio & Instruments',
    tagline: '32-Bit Float On-Board Recording, Timecode Sync, GainAssist, 260m Range',
    description: 'Never clip or ruin audio again. The industry-standard 32-bit float internal backup recording captures every whisper and shout with infinite headroom. Includes two broadcast-grade Lavalier II mics and magnetic mounts.',
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=80'
    ],
    dailyRate: 900, // ৳900 BDT
    weeklyRateDiscount: 10,
    securityDeposit: 4500,
    replacementValue: 48000,
    rating: 4.97,
    reviewCount: 42,
    distanceKm: 2.9,
    location: 'Dhaka, Bangladesh',
    district: 'Shahbagh (DU Campus)',
    ownerId: 'user-12',
    owner: mockUsers[11],
    isInstantBook: true,
    condition: 'Brand New',
    specs: [
      { label: 'Transmission', value: 'Series IV 2.4GHz Digital (260m line of sight)' },
      { label: 'Recording', value: '32-bit float / 24-bit 48kHz on-board (32GB storage)' },
      { label: 'Timecode', value: 'SMPTE standard generator' },
      { label: 'Outputs', value: '3.5mm TRRS + USB-C digital audio' }
    ],
    includedAccessories: [
      '2x Wireless PRO Transmitters + 1x Dual Receiver',
      'Smart Charging Case (charges 2.5x)',
      '2x RØDE Lavalier II Broadcast Lapel Mics',
      'MagClip GO Magnetic clips + Furry windshields',
      'USB-C to Lightning and USB-C to USB-C cables'
    ],
    rentalTerms: [
      'Return all furry windshields and magnetic clips in the case'
    ],
    isAvailable: true,
    featured: false,
    popularScore: 91,
    createdAt: '2025-02-05'
  },
  {
    id: 'prod-13',
    title: 'DJI RS 3 Pro Gimbal Stabilizer Combo + LiDAR Focus',
    brand: 'DJI',
    model: 'RS 3 Pro Combo',
    category: 'cameras',
    categoryLabel: 'Gimbals & Rigs',
    tagline: '4.5kg Payload, Carbon Fiber Arms, Automated Axis Locks, LiDAR Range Finder',
    description: 'Professional cinematic camera stabilizer. Extended carbon fiber arms effortlessly balance RED, Canon C70, and Sony FX6 setups. Includes LiDAR Range Finder for instant autofocus even with manual cinema lenses.',
    images: [
      'https://i0.wp.com/static.bhphoto.com/images/rich_content/desktop/IMG_1773190.jpg?ssl=1'
    ],
    dailyRate: 1600, // ৳1,600 BDT
    weeklyRateDiscount: 20,
    securityDeposit: 8000,
    replacementValue: 135000,
    rating: 4.91,
    reviewCount: 30,
    distanceKm: 5.1,
    location: 'Dhaka, Bangladesh',
    district: 'Badda (Middle Badda)',
    ownerId: 'user-11',
    owner: mockUsers[10],
    isInstantBook: true,
    condition: 'Excellent',
    specs: [
      { label: 'Tested Payload', value: '4.5 kg (10 lbs)' },
      { label: 'Construction', value: 'Uncut carbon fiber axis arms' },
      { label: 'LiDAR Focus', value: '43,200 ranging points up to 14m' },
      { label: 'Battery Grip', value: 'BG30 Grip (12 hours runtime, 24W PD fast charge)' }
    ],
    includedAccessories: [
      'DJI RS 3 Pro Gimbal Body + BG30 Battery Grip',
      'DJI LiDAR Range Finder (RS)',
      'Focus Motor (2022) + Gear Ring Strip',
      'Ronin Image Transmitter (RavenEye)',
      'Extended Grip/Tripod + Briefcase Handle',
      'Waterproof Carrying Case'
    ],
    rentalTerms: [
      'Calibrate balance before powering on motors to prevent motor strain'
    ],
    isAvailable: true,
    featured: false,
    popularScore: 86,
    createdAt: '2025-01-25'
  },
  {
    id: 'prod-14',
    title: 'Meta Quest 3 512GB Mixed Reality Headset + Elite Strap with Battery',
    brand: 'Meta',
    model: 'Quest 3 512GB',
    category: 'vr',
    categoryLabel: 'Gaming & VR',
    tagline: 'Snapdragon XR2 Gen 2, Full-Color 4K+ Infinite Display Pass-through, Touch Plus Controllers',
    description: 'Breakthrough mixed reality gaming and productivity. High-resolution color passthrough blends virtual objects seamlessly with your physical room. Equipped with the official Meta Elite Strap with extra 2-hour battery.',
    images: [
      'https://images.unsplash.com/photo-1698051347480-57b958166420?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    dailyRate: 1100, // ৳1,100 BDT
    weeklyRateDiscount: 15,
    securityDeposit: 6000,
    replacementValue: 75000,
    rating: 4.93,
    reviewCount: 31,
    distanceKm: 4.8,
    location: 'Dhaka, Bangladesh',
    district: 'Puran Dhaka (Lalbagh)',
    ownerId: 'user-16',
    owner: mockUsers[15],
    isInstantBook: true,
    condition: 'Like New',
    specs: [
      { label: 'Display', value: '2064x2208 pixels per eye 4K+ Infinite Display' },
      { label: 'Processor', value: 'Snapdragon XR2 Gen 2 (2x GPU performance)' },
      { label: 'Passthrough', value: 'Dual RGB cameras with depth projector' },
      { label: 'Storage', value: '512GB Internal' }
    ],
    includedAccessories: [
      'Meta Quest 3 Elite Strap with Built-in Battery',
      '2x Touch Plus Controllers with Active Wrist Straps',
      'Silicone Anti-Sweat Facial Interface',
      'Link Cable 5M Fiber Optic for PC VR',
      'Hardshell Travel Case'
    ],
    rentalTerms: [
      'Do not expose optical pancake lenses to direct sunlight'
    ],
    isAvailable: true,
    featured: false,
    popularScore: 89,
    createdAt: '2025-02-08'
  },
  {
    id: 'prod-15',
    title: 'Pioneer DJ DDJ-FLX4 2-Channel DJ Controller',
    brand: 'Pioneer DJ',
    model: 'DDJ-FLX4',
    category: 'audio',
    categoryLabel: 'Audio & Instruments',
    tagline: 'Multi-device compatibility (rekordbox & Serato DJ Lite), Smart Fader & Smart CFX',
    description: 'The ultimate beginner to intermediate DJ controller. Works with Mac, PC, iOS, and Android. Features Smart Fader for automatic BPM & bass adjustment during transitions, performance pads, and microphone input.',
    images: [
      'https://pioneerdjstore.com/cdn/shop/files/DDJ-FLX4_2col-key-feature_3_pc.jpg?v=1707428730&width=480'
    ],
    dailyRate: 1200, // ৳1,200 BDT
    weeklyRateDiscount: 15,
    securityDeposit: 5500,
    replacementValue: 55000,
    rating: 4.91,
    reviewCount: 28,
    distanceKm: 5.9,
    location: 'Rajshahi, Bangladesh',
    district: 'Rajshahi City Center',
    ownerId: 'user-17',
    owner: mockUsers[16],
    isInstantBook: true,
    condition: 'Excellent',
    specs: [
      { label: 'Channels', value: '2-Channel DJ Controller' },
      { label: 'Software', value: 'rekordbox, Serato DJ Lite & djay Pro compatible' },
      { label: 'Jog Wheels', value: 'Responsive capacitive jog wheels with scratch simulation' },
      { label: 'Connectivity', value: '2x USB-C (1x PC/Mac, 1x Power Delivery)' }
    ],
    includedAccessories: [
      'Decksaver Polycarbonate Protective Cover',
      'Padded Pioneer DJ Carrying Bag',
      '2x USB-C to USB-C Cables + 1x USB-A adapter',
      'RCA to 3.5mm Audio Output Cable',
      'Audio-Technica ATH-M50x DJ Headphones'
    ],
    rentalTerms: [
      'Keep liquids away from faders and jog wheels'
    ],
    isAvailable: true,
    featured: false,
    popularScore: 83,
    createdAt: '2025-01-14'
  },
  {
    id: 'prod-16',
    title: 'Trek Marlin 7 Gen 3 Hardtail Mountain Bike (Size M/L)',
    brand: 'Trek',
    model: 'Marlin 7 Gen 3',
    category: 'mobility',
    categoryLabel: 'Mobility & Scooters',
    tagline: 'RockShox Judy fork, Shimano Deore 1x10 drivetrain, Hydraulic disc brakes',
    description: 'Trail-ready hardtail mountain bike perfect for Hatirjheel loop, Purbachal expressway rides, and city commuting. Upgraded geometry with internal dropper post routing, Shimano hydraulic brakes, and Bontrager XR2 tires.',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80'
    ],
    dailyRate: 1100, // ৳1,100 BDT
    weeklyRateDiscount: 20,
    securityDeposit: 6000,
    replacementValue: 110000,
    rating: 4.82,
    reviewCount: 15,
    distanceKm: 4.7,
    location: 'Dhaka, Bangladesh',
    district: 'Motijheel C/A',
    ownerId: 'user-13',
    owner: mockUsers[12],
    isInstantBook: true,
    condition: 'Excellent',
    specs: [
      { label: 'Frame', value: 'Alpha Silver Aluminum, internal routing, 135x5mm thru-skew' },
      { label: 'Fork', value: 'RockShox Judy, 100mm travel, lockout' },
      { label: 'Drivetrain', value: 'Shimano Deore M4100, 1x10 speed' },
      { label: 'Brakes', value: 'Shimano MT200 hydraulic disc' },
      { label: 'Wheel Size', value: '29" (Trek Bontrager Kovee)' }
    ],
    includedAccessories: [
      'Giro Fixture MIPS Mountain Helmet',
      'Abus Bordo 6000 Folding Lock (Security Level 10)',
      'High-Pressure Mini Hand Pump & Repair Multitool',
      'Cygolite Metro Pro 1100 Lumen LED Headlight'
    ],
    rentalTerms: [
      'Do not leave bike unattended outdoors overnight without Abus lock',
      'Inspect tire pressure before trail riding'
    ],
    isAvailable: true,
    featured: false,
    popularScore: 79,
    createdAt: '2025-02-03'
  },
  {
    id: 'prod-17',
    title: 'Starlink Mini Satellite Internet Roam Kit',
    brand: 'Starlink',
    model: 'Starlink Mini Roam',
    category: 'tech',
    categoryLabel: 'Tech & Gadgets',
    tagline: 'Ultra-portable 100+ Mbps satellite internet, built-in Wi-Fi router, DC powered',
    description: 'Stay connected anywhere in Bangladesh—from the hills of Sajek to the deep bay of Cox\'s Bazar and Saint Martin. Fits inside a backpack with antenna and Wi-Fi router integrated into one compact plate. Operates directly on DC 12-48V power banks.',
    images: [
      'https://i.pcmag.com/imagery/comparisons/04heiHqZ19u8fHCzLWZcqhJ-6..v1747265653.jpg'

    ],
    dailyRate: 1500, // ৳1,500 BDT
    weeklyRateDiscount: 15,
    securityDeposit: 9000,
    replacementValue: 95000,
    rating: 4.88,
    reviewCount: 22,
    distanceKm: 3.1,
    location: 'Cox\'s Bazar, Bangladesh',
    district: 'Cox\'s Bazar (Laboni Point)',
    ownerId: 'user-15',
    owner: mockUsers[14],
    isInstantBook: true,
    condition: 'Brand New',
    specs: [
      { label: 'Speed', value: '100 - 180 Mbps Download, 20-35ms Latency' },
      { label: 'Power Draw', value: 'Average 25-40W (USB-C 100W PD compatible)' },
      { label: 'Weight', value: '1.1 kg (2.5 lbs) with kickstand' },
      { label: 'Environmental', value: 'IP67 Weatherproof (-30°C to 50°C)' }
    ],
    includedAccessories: [
      'Starlink Mini Dish with Built-in Wi-Fi 5 Router',
      'Kickstand & Pipe Adapter Mount',
      '15M DC Power Cable + AC Wall Adapter',
      'USB-C 100W to Starlink DC Barrel Adapter Cable',
      'Weather-sealed Tactical Storage Case'
    ],
    rentalTerms: [
      'Requires clear view of open sky; active Global Roam data subscription included'
    ],
    isAvailable: true,
    featured: true,
    popularScore: 94,
    createdAt: '2025-02-12'
  },
  {
    id: 'prod-18',
    title: 'Blackmagic Pocket Cinema Camera 6K G2 Production Kit',
    brand: 'Blackmagic Design',
    model: 'BMPCC 6K G2',
    category: 'cameras',
    categoryLabel: 'Cinema Cameras',
    tagline: 'Super 35 HDR Sensor, 6144 x 3456 Blackmagic RAW 60p, Tilting 1500nit Screen, EF Mount',
    description: 'Hollywood cinema quality in your hands. Super 35 sensor with dual native ISO 400 & 3200 up to 25,600. Records 12-bit Blackmagic RAW straight to external Samsung T7 Shield SSDs. Includes Sigma 18-35mm f/1.8 Art lens.',
    images: [
      'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80'
    ],
    dailyRate: 2900, // ৳2,900 BDT
    weeklyRateDiscount: 20,
    securityDeposit: 14000,
    replacementValue: 320000,
    rating: 4.98,
    reviewCount: 39,
    distanceKm: 2.7,
    location: 'Khulna, Bangladesh',
    district: 'Khulna Sadar',
    ownerId: 'user-18',
    owner: mockUsers[17],
    isInstantBook: false,
    condition: 'Like New',
    specs: [
      { label: 'Sensor', value: 'Super 35 HDR (23.10 x 12.99 mm)' },
      { label: 'Resolution', value: '6144 x 3456 (6K) up to 60 fps BRAW' },
      { label: 'Dynamic Range', value: '13 Stops Generation 5 Color Science' },
      { label: 'Lens Mount', value: 'Active Canon EF Mount' },
      { label: 'Lens Included', value: 'Sigma 18-35mm f/1.8 DC HSM Art Lens' }
    ],
    includedAccessories: [
      'Sigma 18-35mm f/1.8 Art EF Lens',
      'SmallRig BMPCC 6K G2 Cage with Top & Side Handle',
      'SmallRig V-Mount Battery Plate + 99Wh V-Mount Battery',
      '2x Samsung T7 Shield 1TB USB-C SSDs',
      'Pelican Storm iM2400 Case'
    ],
    rentalTerms: [
      'Experience with RAW color grading recommended; DaVinci Resolve Studio workflow'
    ],
    isAvailable: true,
    featured: true,
    popularScore: 93,
    createdAt: '2025-01-26'
  },
  {
    id: 'prod-19',
    title: 'Jackery Explorer 1000 v2 Portable Power Station + 100W SolarSaga',
    brand: 'Jackery',
    model: 'Explorer 1000 v2',
    category: 'camping',
    categoryLabel: 'Camping & Outdoor',
    tagline: '1070Wh LiFePO4 Battery, 1500W Pure Sine Wave AC, 1 Hour Fast Wall Recharge',
    description: 'Keep your cameras, drones, laptops, and mini-fridges powered during outdoor shoots across Sajek, Tanguar Haor, and Nilgiri. Upgraded with long-life LiFePO4 cells (4,000+ cycles to 70%). Whisper-quiet emergency power wherever you go.',
    images: [
      'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80'
    ],
    dailyRate: 1300, // ৳1,300 BDT
    weeklyRateDiscount: 15,
    securityDeposit: 7000,
    replacementValue: 110000,
    rating: 4.87,
    reviewCount: 24,
    distanceKm: 6.8,
    location: 'Dhaka, Bangladesh',
    district: 'Uttara (Sector 11)',
    ownerId: 'user-19',
    owner: mockUsers[18],
    isInstantBook: true,
    condition: 'Excellent',
    specs: [
      { label: 'Capacity', value: '1070Wh (LiFePO4 Chemistry)' },
      { label: 'AC Output', value: '1500W Rated / 3000W Surge (Pure Sine Wave)' },
      { label: 'Recharge Time', value: '1 Hour AC Fast Charge (Emergency Super-charge)' },
      { label: 'Ports', value: '3x AC, 2x USB-C (100W PD), 1x USB-A, 1x Car Port 12V' }
    ],
    includedAccessories: [
      'Jackery SolarSaga 100W Foldable Solar Panel',
      'AC Fast Charging Wall Cable',
      '12V Car Cigarette Lighter Charging Cable',
      'Solar Series Connection Cable',
      'Heavy-duty padded weather carry bag'
    ],
    rentalTerms: [
      'Keep dry; do not expose to moisture or rain without protective tarp'
    ],
    isAvailable: true,
    featured: false,
    popularScore: 85,
    createdAt: '2025-02-02'
  },
  {
    id: 'prod-20',
    title: 'Leica Q3 60MP Full-Frame Compact Camera (Summilux 28mm f/1.7 ASPH)',
    brand: 'Leica',
    model: 'Leica Q3 (Typ 652)',
    category: 'cameras',
    categoryLabel: 'High-End Cameras',
    tagline: '60MP BSI CMOS with Triple Resolution Tech, Summilux 28mm f/1.7 ASPH, 8K Video, Made in Germany',
    description: 'The pinnacle of street photography and timeless craftsmanship in Dhaka. Exceptional 60MP full-frame sensor with built-in macro mode (down to 17cm) and razor-sharp Summilux optics. Rented in custom leather half-case with thumb support.',
    images: [
      'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80'
    ],
    dailyRate: 5800, // ৳5,800 BDT
    weeklyRateDiscount: 20,
    securityDeposit: 38000,
    replacementValue: 750000,
    rating: 5.0,
    reviewCount: 65,
    distanceKm: 3.4,
    location: 'Dhaka, Bangladesh',
    district: 'Gulshan 1 (Avenue)',
    ownerId: 'user-20',
    owner: mockUsers[19],
    isInstantBook: false,
    condition: 'Like New',
    specs: [
      { label: 'Sensor', value: '60MP / 36MP / 18MP BSI CMOS Triple Resolution' },
      { label: 'Lens', value: 'Leica Summilux 28mm f/1.7 ASPH with Integrated Macro' },
      { label: 'Autofocus', value: 'Hybrid AF with Phase Detection & Subject Tracking' },
      { label: 'Viewfinder', value: '5.76M-dot OLED EVF 120fps' },
      { label: 'Build', value: 'Full Magnesium All-Metal Body, IP52 Weather Sealed' }
    ],
    includedAccessories: [
      'Oberwerth Handmade Leather Half-Case & Neck Strap',
      'Match Technical Thumbs Up EP-SQ3 Thumb Rest',
      '3x Leica BP-SCL6 High-Capacity Batteries + Dual Charger',
      'B+W 49mm Master Clear MRC Nano Filter (installed)',
      'Sony Tough 128GB SDXC UHS-II Card (300 MB/s)',
      'Leica Aluminium Lens Hood & Metal Cap'
    ],
    rentalTerms: [
      'Premium ISD Escrow protocol applies',
      'In-person optical inspection and verification required in Gulshan'
    ],
    isAvailable: true,
    featured: true,
    popularScore: 100,
    createdAt: '2025-01-10'
  }
];