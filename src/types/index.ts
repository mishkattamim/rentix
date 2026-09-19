export type CategoryType = 
  | 'all'
  | 'cameras'
  | 'drones'
  | 'action-cams'
  | 'gaming'
  | 'audio'
  | 'tools'
  | 'camping'
  | 'vr'
  | 'mobility'
  | 'tech';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  avatar: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  isSuperhost: boolean;
  location: string;
  district: string;
  memberSince: string;
  completedRentals: number;
  responseRate: number;
  responseTime: string;
  trustScore: number;
  bio: string;
  earnings: number;
  password?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  model: string;
  category: CategoryType;
  categoryLabel: string;
  tagline: string;
  description: string;
  images: string[];
  dailyRate: number; // in BDT (৳)
  weeklyRateDiscount: number;
  securityDeposit: number; // in BDT (৳)
  replacementValue: number; // in BDT (৳)
  rating: number;
  reviewCount: number;
  distanceKm: number;
  location: string;
  district: string;
  ownerId: string;
  owner?: User;
  isInstantBook: boolean;
  condition: 'Brand New' | 'Like New' | 'Excellent' | 'Good';
  specs: ProductSpec[];
  includedAccessories: string[];
  rentalTerms: string[];
  isAvailable: boolean;
  featured?: boolean;
  popularScore: number;
  createdAt: string;
}

export interface Booking {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  productCategory: string;
  ownerId: string;
  renterId: string;
  startDate: string;
  endDate: string;
  days: number;
  dailyRate: number;
  subtotal: number;
  securityDeposit: number;
  platformFee: number;
  insuranceFee: number;
  totalAmount: number;
  handoverMethod: 'pickup' | 'delivery';
  pickupLocation: string;
  qrCode: string;
  status: 'pending_escrow' | 'escrow_secured' | 'active_rental' | 'returned_inspecting' | 'completed' | 'cancelled';
  createdAt: string;
  escrowReleaseEstimated: string;
  isDepositRefunded: boolean;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isSystemEvent?: boolean;
  systemEventType?: 'request_sent' | 'escrow_held' | 'qr_generated' | 'handover_scanned' | 'returned_complete';
  metadata?: {
    bookingId?: string;
    amount?: number;
    qrCode?: string;
    actionLabel?: string;
  };
}

export interface Conversation {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  productPrice: number;
  participantIds: [string, string];
  otherUser: User;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  bookingId?: string;
  bookingStatus?: Booking['status'];
}

export interface Review {
  id: string;
  productId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  comment: string;
  verifiedRental: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'booking' | 'escrow' | 'message' | 'system';
  link?: string;
}

export interface ActivityTickerItem {
  id: string;
  user: string;
  userAvatar: string;
  action: string;
  item: string;
  price: string;
  location: string;
  timeAgo: string;
}
