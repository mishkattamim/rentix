import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Product,
  Booking,
  Conversation,
  ChatMessage,
  NotificationItem,
  CategoryType
} from '../types';
import { allInitialUsers, mockUsers, preSeededAdmins } from '../data/mockUsers';
import { mockProducts } from '../data/mockProducts';

interface RegisterData {
  name: string;
  username: string;
  email: string;
  phone: string;
  district: string;
  password: string;
}

interface RentixContextType {
  // Authentication & Session
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginUser: (identifier: string, password?: string) => { success: boolean; message?: string };
  registerUser: (data: RegisterData) => { success: boolean; message?: string; user?: User };
  logoutUser: () => void;
  requireAuth: (callback: () => void, reason?: string) => void;

  // Users & Admin management
  users: User[];
  deleteUser: (userId: string) => void;
  toggleUserVerification: (userId: string) => void;

  // Products
  products: Product[];
  createProduct: (productData: Partial<Product>) => Product;
  deleteProduct: (productId: string) => void;
  toggleProductAvailability: (productId: string) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Bookings & Escrows
  bookings: Booking[];
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status' | 'qrCode' | 'isDepositRefunded' | 'escrowReleaseEstimated'>) => Booking;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;

  // Chat & Messages
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  messages: Record<string, ChatMessage[]>;
  sendMessage: (conversationId: string, text: string) => void;
  startChatWithUser: (productId: string, ownerId: string, initialMessage?: string) => string;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (category: CategoryType) => void;
  distanceRadius: number; // km
  setDistanceRadius: (radius: number) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: 'recommended' | 'price-low' | 'price-high' | 'distance' | 'rating';
  setSortBy: (sort: 'recommended' | 'price-low' | 'price-high' | 'distance' | 'rating') => void;
  viewMode: 'grid' | 'list' | 'map';
  setViewMode: (mode: 'grid' | 'list' | 'map') => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;

  // Modals state
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
  authModalReason: string;
  setAuthModalReason: (reason: string) => void;
  qrModalBooking: Booking | null;
  setQrModalBooking: (booking: Booking | null) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (isOpen: boolean) => void;
}

const RentixContext = createContext<RentixContextType | undefined>(undefined);

// Initial Seed Bookings in BDT
const initialBookings: Booking[] = [
  {
    id: 'bk-101',
    productId: 'prod-2',
    productTitle: 'DJI Mini 4 Pro Fly More Combo + DJI RC 2',
    productImage: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80',
    productCategory: 'drones',
    ownerId: 'user-2',
    renterId: 'user-1',
    startDate: '2025-03-05',
    endDate: '2025-03-07',
    days: 2,
    dailyRate: 1800,
    subtotal: 3600,
    securityDeposit: 9000,
    platformFee: 288,
    insuranceFee: 180,
    totalAmount: 13068,
    handoverMethod: 'pickup',
    pickupLocation: 'Gulshan 2 (Near Circle Hub)',
    qrCode: 'RENTIX-QR-DHAKA-BK101-SECURE',
    status: 'escrow_secured',
    createdAt: '2025-03-01T10:00:00Z',
    escrowReleaseEstimated: '2025-03-08T18:00:00Z',
    isDepositRefunded: false
  },
  {
    id: 'bk-102',
    productId: 'prod-8',
    productTitle: 'Apple Vision Pro 512GB Spatial Computer',
    productImage: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80',
    productCategory: 'vr',
    ownerId: 'user-8',
    renterId: 'user-1',
    startDate: '2025-02-20',
    endDate: '2025-02-22',
    days: 2,
    dailyRate: 5500,
    subtotal: 11000,
    securityDeposit: 35000,
    platformFee: 880,
    insuranceFee: 550,
    totalAmount: 47430,
    handoverMethod: 'pickup',
    pickupLocation: 'GEC Circle, Chittagong',
    qrCode: 'RENTIX-QR-CTG-BK102-COMPLETED',
    status: 'completed',
    createdAt: '2025-02-18T14:30:00Z',
    escrowReleaseEstimated: '2025-02-23T12:00:00Z',
    isDepositRefunded: true
  }
];

// Initial Seed Conversations
const initialConversations: Conversation[] = [
  {
    id: 'conv-1',
    productId: 'prod-2',
    productTitle: 'DJI Mini 4 Pro Fly More Combo',
    productImage: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&auto=format&fit=crop&q=80',
    productPrice: 1800,
    participantIds: ['user-1', 'user-2'],
    otherUser: mockUsers[1], // Anika Rahman
    lastMessage: 'All three flight batteries are at 100% and ready for your Sajek shoot!',
    lastMessageTimestamp: '10 mins ago',
    unreadCount: 1,
    bookingId: 'bk-101',
    bookingStatus: 'escrow_secured'
  },
  {
    id: 'conv-2',
    productId: 'prod-8',
    productTitle: 'Apple Vision Pro 512GB',
    productImage: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&auto=format&fit=crop&q=80',
    productPrice: 5500,
    participantIds: ['user-1', 'user-8'],
    otherUser: mockUsers[7], // Mehreen Chowdhury
    lastMessage: 'Security deposit of ৳35,000 has been released back to your bKash/Card.',
    lastMessageTimestamp: '3 days ago',
    unreadCount: 0,
    bookingId: 'bk-102',
    bookingStatus: 'completed'
  },
  {
    id: 'conv-3',
    productId: 'prod-20',
    productTitle: 'Leica Q3 60MP Full-Frame Compact',
    productImage: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=400&auto=format&fit=crop&q=80',
    productPrice: 5800,
    participantIds: ['user-1', 'user-20'],
    otherUser: mockUsers[19], // Raisa Khan
    lastMessage: 'Hi! Yes, the Leica Q3 is available this weekend for pickup in Gulshan 1.',
    lastMessageTimestamp: 'Yesterday',
    unreadCount: 0
  }
];

const initialMessages: Record<string, ChatMessage[]> = {
  'conv-1': [
    {
      id: 'm-101',
      conversationId: 'conv-1',
      senderId: 'user-1',
      senderName: 'Tanvir Hossain',
      senderAvatar: mockUsers[0].avatar,
      text: 'Hi Anika! I have an aerial shoot for a tourism documentary in Sajek this Friday. Are the ND filters included?',
      timestamp: 'Yesterday at 3:15 PM'
    },
    {
      id: 'm-102',
      conversationId: 'conv-1',
      senderId: 'user-2',
      senderName: 'Anika Rahman',
      senderAvatar: mockUsers[1].avatar,
      text: 'Hello Tanvir! Yes, the official DJI ND16/64/256 set is inside the Pelican case.',
      timestamp: 'Yesterday at 3:20 PM'
    },
    {
      id: 'm-103',
      conversationId: 'conv-1',
      senderId: 'system',
      senderName: 'Rentix Escrow System',
      senderAvatar: '',
      text: 'Rental request confirmed. Escrow hold of ৳13,068 (৳3,600 rental + ৳9,000 refundable deposit + fees) is locked safely in ISD Escrow.',
      timestamp: 'Yesterday at 3:25 PM',
      isSystemEvent: true,
      systemEventType: 'escrow_held',
      metadata: {
        bookingId: 'bk-101',
        amount: 13068,
        qrCode: 'RENTIX-QR-DHAKA-BK101-SECURE',
        actionLabel: 'View Handover QR'
      }
    },
    {
      id: 'm-104',
      conversationId: 'conv-1',
      senderId: 'user-2',
      senderName: 'Anika Rahman',
      senderAvatar: mockUsers[1].avatar,
      text: 'All three flight batteries are at 100% and ready for your Sajek shoot!',
      timestamp: '10 mins ago'
    }
  ],
  'conv-2': [
    {
      id: 'm-201',
      conversationId: 'conv-2',
      senderId: 'user-1',
      senderName: 'Tanvir Hossain',
      senderAvatar: mockUsers[0].avatar,
      text: 'Hi Mehreen, returning the Vision Pro today at GEC Circle. Everything worked flawlessly!',
      timestamp: '3 days ago'
    },
    {
      id: 'm-202',
      conversationId: 'conv-2',
      senderId: 'system',
      senderName: 'Rentix Escrow System',
      senderAvatar: '',
      text: 'Return QR scanned and verified. Rental marked as Completed.',
      timestamp: '3 days ago',
      isSystemEvent: true,
      systemEventType: 'returned_complete'
    },
    {
      id: 'm-203',
      conversationId: 'conv-2',
      senderId: 'user-8',
      senderName: 'Mehreen Chowdhury',
      senderAvatar: mockUsers[7].avatar,
      text: 'Security deposit of ৳35,000 has been released back to your bKash/Card.',
      timestamp: '3 days ago'
    }
  ],
  'conv-3': [
    {
      id: 'm-301',
      conversationId: 'conv-3',
      senderId: 'user-1',
      senderName: 'Tanvir Hossain',
      senderAvatar: mockUsers[0].avatar,
      text: 'Hello Raisa! Is the Leica Q3 available for a 2-day street portrait workshop in Old Dhaka?',
      timestamp: 'Yesterday'
    },
    {
      id: 'm-302',
      conversationId: 'conv-3',
      senderId: 'user-20',
      senderName: 'Raisa Khan',
      senderAvatar: mockUsers[19].avatar,
      text: 'Hi! Yes, the Leica Q3 is available this weekend for pickup in Gulshan 1.',
      timestamp: 'Yesterday'
    }
  ]
};

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Escrow Secured',
    message: 'Your payment of ৳13,068 for DJI Mini 4 Pro is held securely in Rentix Escrow.',
    timestamp: '2 hours ago',
    read: false,
    type: 'escrow',
    link: '/messages'
  },
  {
    id: 'notif-2',
    title: 'New Message from Anika Rahman',
    message: '"All three flight batteries are at 100% and ready for your Sajek shoot!"',
    timestamp: '10 mins ago',
    read: false,
    type: 'message',
    link: '/messages'
  },
  {
    id: 'notif-3',
    title: 'Deposit Refunded',
    message: 'Deposit of ৳35,000 for Apple Vision Pro was successfully returned to your account.',
    timestamp: '3 days ago',
    read: true,
    type: 'system',
    link: '/profile'
  }
];

export const RentixProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // GUEST BY DEFAULT: currentUser is null unless restored from session
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('rentix_session_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return null; // Guest mode by default!
  });

  // Users Pool: Seeded + Custom Registered Users from localStorage
  const [users, setUsers] = useState<User[]>(() => {
    const custom = localStorage.getItem('rentix_custom_users');
    let customUsers: User[] = [];
    if (custom) {
      try { customUsers = JSON.parse(custom); } catch (e) { console.error(e); }
    }
    return [...allInitialUsers, ...customUsers];
  });

  // Products Pool: Seeded + LocalStorage
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('rentix_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-2', 'prod-8', 'prod-20'];
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('rentix_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('rentix_conversations');
    return saved ? JSON.parse(saved) : initialConversations;
  });

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(() => {
    const saved = localStorage.getItem('rentix_messages');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('rentix_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [distanceRadius, setDistanceRadius] = useState<number>(10);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'distance' | 'rating'>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [selectedDistrict, setSelectedDistrict] = useState('Dhanmondi, Dhaka');

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [authModalReason, setAuthModalReason] = useState('Please log in to continue');
  const [qrModalBooking, setQrModalBooking] = useState<Booking | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Persistence Effects
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rentix_session_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('rentix_session_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('rentix_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rentix_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('rentix_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('rentix_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('rentix_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('rentix_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Auth Functions
  const loginUser = (identifier: string, password?: string): { success: boolean; message?: string } => {
    const cleanId = identifier.trim().toLowerCase();

    // Look up by username or email
    const found = users.find(u =>
      u.username.toLowerCase() === cleanId ||
      u.email.toLowerCase() === cleanId
    );

    if (!found) {
      return { success: false, message: `No account found matching "${identifier}".` };
    }

    // Verify password if provided
    if (password && found.password && found.password !== password) {
      return { success: false, message: 'Incorrect password. Please try again.' };
    }

    setCurrentUser(found);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const registerUser = (data: RegisterData): { success: boolean; message?: string; user?: User } => {
    if (!data.name.trim() || !data.username.trim() || !data.password.trim()) {
      return { success: false, message: 'Please fill in all required fields.' };
    }

    const cleanUsername = data.username.trim().toLowerCase();
    if (users.some(u => u.username.toLowerCase() === cleanUsername)) {
      return { success: false, message: 'Username is already taken. Please choose another.' };
    }

    const newUser: User = {
      id: `user-custom-${Date.now()}`,
      name: data.name.trim(),
      username: cleanUsername,
      email: data.email.trim() || `${cleanUsername}@rentix.com.bd`,
      phone: data.phone.trim() || '+880 1700-000000',
      role: 'user',
      password: data.password,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + (users.length * 100)}?w=200&auto=format&fit=crop&q=80`,
      rating: 5.0,
      reviewCount: 0,
      verified: true,
      isSuperhost: false,
      location: 'Dhaka, Bangladesh',
      district: data.district || 'Dhanmondi, Dhaka',
      memberSince: new Date().getFullYear().toString(),
      completedRentals: 0,
      responseRate: 100,
      responseTime: '< 5 mins',
      trustScore: 95,
      bio: `ISD community member from ${data.district || 'Dhaka'}. Ready to rent and share gear safely on Rentix.`,
      earnings: 0
    };

    // Save to custom users in localStorage
    const existingCustom = localStorage.getItem('rentix_custom_users');
    let customList: User[] = existingCustom ? JSON.parse(existingCustom) : [];
    customList.push(newUser);
    localStorage.setItem('rentix_custom_users', JSON.stringify(customList));

    // Update state
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);

    return { success: true, user: newUser };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('rentix_session_user');
  };

  const requireAuth = (callback: () => void, reason: string = 'Please log in to continue') => {
    if (currentUser) {
      callback();
    } else {
      setAuthModalReason(reason);
      setAuthModalTab('login');
      setIsAuthModalOpen(true);
    }
  };

  // Admin Operations: Delete User (and all their listings)
  const deleteUser = (userId: string) => {
    // Prevent deleting core admin
    if (userId === 'admin-1' || userId === 'admin-2') {
      alert('Cannot delete primary system administrator accounts.');
      return;
    }

    // Remove user
    setUsers(prev => prev.filter(u => u.id !== userId));

    // Remove custom user from localStorage if present
    const existingCustom = localStorage.getItem('rentix_custom_users');
    if (existingCustom) {
      const parsed: User[] = JSON.parse(existingCustom);
      const filtered = parsed.filter(u => u.id !== userId);
      localStorage.setItem('rentix_custom_users', JSON.stringify(filtered));
    }

    // Cascade purge: Delete all products owned by this user!
    setProducts(prev => prev.filter(p => p.ownerId !== userId));

    // If active user was deleted, log them out
    if (currentUser?.id === userId) {
      logoutUser();
    }
  };

  const toggleUserVerification = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, verified: !u.verified };
      }
      return u;
    }));

    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, verified: !prev.verified } : null);
    }
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'qrCode' | 'isDepositRefunded' | 'escrowReleaseEstimated'>): Booking => {
    const newId = `bk-${Date.now().toString().slice(-6)}`;
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const qrCode = `RENTIX-QR-BDT-${newId.toUpperCase()}-${randomCode}-ESCROW`;

    const newBooking: Booking = {
      ...bookingData,
      id: newId,
      status: 'escrow_secured',
      qrCode,
      createdAt: new Date().toISOString(),
      escrowReleaseEstimated: new Date(Date.now() + 86400000 * (bookingData.days + 1)).toISOString(),
      isDepositRefunded: false
    };

    setBookings(prev => [newBooking, ...prev]);

    // Create Notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Booking & Escrow Confirmed',
      message: `Your booking for ${newBooking.productTitle} (৳${newBooking.totalAmount.toLocaleString()}) is secured in Escrow!`,
      timestamp: 'Just now',
      read: false,
      type: 'escrow',
      link: '/profile'
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Automatically create / update chat thread with system escrow card
    const convId = startChatWithUser(newBooking.productId, newBooking.ownerId);

    // Add Escrow system message
    const escrowMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: convId,
      senderId: 'system',
      senderName: 'Rentix Escrow System',
      senderAvatar: '',
      text: `Rental booking confirmed! Escrow amount of ৳${newBooking.totalAmount.toLocaleString()} (৳${newBooking.subtotal.toLocaleString()} rental + ৳${newBooking.securityDeposit.toLocaleString()} deposit) is safely locked. Handover QR code is generated.`,
      timestamp: 'Just now',
      isSystemEvent: true,
      systemEventType: 'escrow_held',
      metadata: {
        bookingId: newBooking.id,
        amount: newBooking.totalAmount,
        qrCode: newBooking.qrCode,
        actionLabel: 'View Handover QR'
      }
    };

    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), escrowMsg]
    }));

    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status,
          isDepositRefunded: status === 'completed' ? true : b.isDepositRefunded
        };
      }
      return b;
    }));

    const conv = conversations.find(c => c.bookingId === bookingId);
    if (conv) {
      let eventText = `Rental status updated: ${status.replace('_', ' ').toUpperCase()}`;
      let eventType: ChatMessage['systemEventType'] = 'handover_scanned';

      if (status === 'active_rental') {
        eventText = 'Handover QR scanned and confirmed! Item is now actively rented out.';
        eventType = 'handover_scanned';
      } else if (status === 'completed') {
        eventText = 'Return QR verified! Item inspected, rental completed, and security deposit refunded.';
        eventType = 'returned_complete';
      }

      const sysMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        conversationId: conv.id,
        senderId: 'system',
        senderName: 'Rentix Escrow System',
        senderAvatar: '',
        text: eventText,
        timestamp: 'Just now',
        isSystemEvent: true,
        systemEventType: eventType,
        metadata: { bookingId }
      };

      setMessages(prev => ({
        ...prev,
        [conv.id]: [...(prev[conv.id] || []), sysMsg]
      }));
    }
  };

  const startChatWithUser = (productId: string, ownerId: string, initialMessage?: string): string => {
    const currentUserId = currentUser?.id || 'guest';
    const existingConv = conversations.find(
      c => c.productId === productId && c.participantIds.includes(ownerId) && c.participantIds.includes(currentUserId)
    );

    if (existingConv) {
      setActiveConversationId(existingConv.id);
      if (initialMessage) {
        sendMessage(existingConv.id, initialMessage);
      }
      return existingConv.id;
    }

    const product = products.find(p => p.id === productId);
    const owner = users.find(u => u.id === ownerId) || mockUsers[0];
    const newConvId = `conv-${Date.now()}`;

    const newConversation: Conversation = {
      id: newConvId,
      productId: productId,
      productTitle: product ? product.title : 'Gadget Rental',
      productImage: product ? product.images[0] : 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
      productPrice: product ? product.dailyRate : 1500,
      participantIds: [currentUserId, ownerId],
      otherUser: owner,
      lastMessage: initialMessage || 'Conversation started',
      lastMessageTimestamp: 'Just now',
      unreadCount: 0
    };

    setConversations(prev => [newConversation, ...prev]);

    const initialMsgs: ChatMessage[] = [];
    if (initialMessage && currentUser) {
      initialMsgs.push({
        id: `msg-${Date.now()}`,
        conversationId: newConvId,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        text: initialMessage,
        timestamp: 'Just now'
      });
    }

    setMessages(prev => ({
      ...prev,
      [newConvId]: initialMsgs
    }));

    setActiveConversationId(newConvId);
    return newConvId;
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim() || !currentUser) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text: text.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg]
    }));

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: text.trim(),
          lastMessageTimestamp: 'Just now'
        };
      }
      return c;
    }));

    const conv = conversations.find(c => c.id === conversationId);
    if (conv && conv.otherUser.id !== currentUser.id) {
      setTimeout(() => {
        const responses = [
          `Hi ${currentUser.name.split(' ')[0]}! Thanks for reaching out. Yes, the item is ready and calibrated!`,
          `Awesome! I can meet you for the QR handshake pickup anytime in ${conv.otherUser.district.split('(')[0]}.`,
          `Sounds great! Let me know if you need any extra batteries, cables, or carrying case.`,
          `Confirmed! The escrow system will generate the handover QR as soon as we finalize.`
        ];
        const randomResp = responses[Math.floor(Math.random() * responses.length)];

        const replyMsg: ChatMessage = {
          id: `msg-reply-${Date.now()}`,
          conversationId,
          senderId: conv.otherUser.id,
          senderName: conv.otherUser.name,
          senderAvatar: conv.otherUser.avatar,
          text: randomResp,
          timestamp: 'Just now'
        };

        setMessages(mPrev => ({
          ...mPrev,
          [conversationId]: [...(mPrev[conversationId] || []), replyMsg]
        }));

        setConversations(cPrev => cPrev.map(c => {
          if (c.id === conversationId) {
            return {
              ...c,
              lastMessage: randomResp,
              lastMessageTimestamp: 'Just now'
            };
          }
          return c;
        }));
      }, 1400);
    }
  };

  const createProduct = (productData: Partial<Product>): Product => {
    const owner = currentUser || mockUsers[0];
    const newId = `prod-${Date.now().toString().slice(-6)}`;
    const newProduct: Product = {
      id: newId,
      title: productData.title || 'Custom Gadget',
      brand: productData.brand || 'Tech Gear',
      model: productData.model || 'Pro Edition',
      category: (productData.category as CategoryType) || 'cameras',
      categoryLabel: productData.categoryLabel || 'Cameras & Rigs',
      tagline: productData.tagline || 'P2P Gear in excellent condition',
      description: productData.description || 'Listed on Rentix Bangladesh P2P Network.',
      images: productData.images && productData.images.length > 0 ? productData.images : [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80'
      ],
      dailyRate: Number(productData.dailyRate) || 1200,
      weeklyRateDiscount: 15,
      securityDeposit: Number(productData.securityDeposit) || 5000,
      replacementValue: Number(productData.replacementValue) || 45000,
      rating: 5.0,
      reviewCount: 0,
      distanceKm: 0.8,
      location: owner.location || 'Dhaka, Bangladesh',
      district: owner.district || 'Dhanmondi, Dhaka',
      ownerId: owner.id,
      owner: owner,
      isInstantBook: productData.isInstantBook ?? true,
      condition: productData.condition || 'Excellent',
      specs: productData.specs || [
        { label: 'Condition', value: 'Verified ISD Inspected' },
        { label: 'Battery Health', value: '100% Full Capacity' }
      ],
      includedAccessories: productData.includedAccessories || ['Hard Protective Case', 'Fast Power Cable', 'Accessories'],
      rentalTerms: [
        'Must present Rentix QR Code at handover in Dhaka',
        'Return clean and in working order'
      ],
      isAvailable: true,
      popularScore: 85,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProducts(prev => [newProduct, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Gear Listed Successfully!',
      message: `Your ${newProduct.title} is now live on the Rentix feed.`,
      timestamp: 'Just now',
      read: false,
      type: 'system',
      link: `/product/${newProduct.id}`
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newProduct;
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const toggleProductAvailability = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, isAvailable: !p.isAvailable };
      }
      return p;
    }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <RentixContext.Provider
      value={{
        currentUser,
        isAuthenticated: currentUser !== null,
        isAdmin: currentUser?.role === 'admin',
        loginUser,
        registerUser,
        logoutUser,
        requireAuth,

        users,
        deleteUser,
        toggleUserVerification,

        products,
        createProduct,
        deleteProduct,
        toggleProductAvailability,

        wishlist,
        toggleWishlist,
        bookings,
        createBooking,
        updateBookingStatus,
        conversations,
        activeConversationId,
        setActiveConversationId,
        messages,
        sendMessage,
        startChatWithUser,
        notifications,
        markNotificationAsRead,
        markAllNotificationsRead,

        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        distanceRadius,
        setDistanceRadius,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        selectedDistrict,
        setSelectedDistrict,

        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        authModalReason,
        setAuthModalReason,
        qrModalBooking,
        setQrModalBooking,
        isLocationModalOpen,
        setIsLocationModalOpen,
      }}
    >
      {children}
    </RentixContext.Provider>
  );
};

export const useRentix = () => {
  const context = useContext(RentixContext);
  if (!context) {
    throw new Error('useRentix must be used within a RentixProvider');
  }
  return context;
};
