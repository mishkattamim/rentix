import { ActivityTickerItem } from '../types';

export const mockActivities: ActivityTickerItem[] = [
  {
    id: 'act-1',
    user: 'Anika Rahman',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    action: 'rented',
    item: 'Sony FX3 Cinema Camera',
    price: '৳3,800/day',
    location: 'Dhanmondi, Dhaka',
    timeAgo: '2m ago'
  },
  {
    id: 'act-2',
    user: 'Shakib Ahmed',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    action: 'verified QR handover for',
    item: 'DJI Mini 4 Pro Fly More',
    price: '৳1,800/day',
    location: 'Gulshan 2, Dhaka',
    timeAgo: '6m ago'
  },
  {
    id: 'act-3',
    user: 'Nusrat Jahan',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    action: 'booked',
    item: 'Apple Vision Pro 512GB',
    price: '৳5,500/day',
    location: 'GEC Circle, Chittagong',
    timeAgo: '12m ago'
  },
  {
    id: 'act-4',
    user: 'Zayan Karim',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    action: 'returned in pristine condition',
    item: 'RØDE Wireless PRO Kit',
    price: '৳900/day',
    location: 'Shahbagh, Dhaka',
    timeAgo: '18m ago'
  },
  {
    id: 'act-5',
    user: 'Mehreen Chowdhury',
    userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    action: 'listed new gear',
    item: 'Leica Q3 60MP Compact',
    price: '৳5,800/day',
    location: 'Gulshan 1, Dhaka',
    timeAgo: '25m ago'
  },
  {
    id: 'act-6',
    user: 'Sabrina Mumtaz',
    userAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
    action: 'released ৳5,000 deposit for',
    item: 'Steam Deck OLED 1TB',
    price: '৳850/day',
    location: 'Banani, Dhaka',
    timeAgo: '32m ago'
  }
];

export const mockTestimonials = [
  {
    id: 't-1',
    name: 'Tanvir Hossain',
    role: 'Indie Filmmaker & ISD Researcher',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    district: 'Dhanmondi, Dhaka',
    rating: 5,
    quote: 'Instead of buying a secondary FX3 body for 4.5 lakh BDT, I rented one 1.8km away in Dhanmondi within 20 minutes. The QR escrow handshake gave both of us complete peace of mind.',
    earnedOrSaved: 'Saved ৳85,000 on production budget'
  },
  {
    id: 't-2',
    name: 'Anika Rahman',
    role: 'FPV Drone Specialist',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    district: 'Gulshan, Dhaka',
    rating: 5,
    quote: 'My idle drones used to sit in storage during weekdays. With Rentix, I earn over ৳45,000/month renting to certified creators in Gulshan and Banani. The security deposit system is airtight.',
    earnedOrSaved: 'Earned ৳98,200 this semester'
  },
  {
    id: 't-3',
    name: 'Mehreen Chowdhury',
    role: 'Spatial Computing UX Lead',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    district: 'GEC Circle, Chittagong',
    rating: 5,
    quote: 'Testing Apple Vision Pro and Meta Quest apps across our ISD team in Chittagong was effortless. Rentix turns neighborhood tech enthusiasts into a shared hardware cloud.',
    earnedOrSaved: '63 verified local handovers'
  }
];
