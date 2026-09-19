import { Review } from '../types';

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    authorId: 'user-2',
    authorName: 'Anika Rahman',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '3 days ago',
    comment: 'Rented Tanvir\'s Sony FX3 for a 2-day music video shoot in Dhanmondi. The camera arrived in flawless condition with fully charged batteries and fast CFexpress cards. Super smooth QR handshake!',
    verifiedRental: true
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    authorId: 'user-8',
    authorName: 'Mehreen Chowdhury',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '1 week ago',
    comment: 'Top-tier cinema gear in Dhaka! The XLR top handle audio was crystal clear. Tanvir was very accommodating with pickup timing.',
    verifiedRental: true
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    authorId: 'user-4',
    authorName: 'Nusrat Jahan',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '4 days ago',
    comment: 'Anika\'s Mini 4 Pro drone was phenomenal for our Sajek Valley trip. The RC 2 screen is so bright in midday sun! Plus 3 full batteries gave us plenty of flight time.',
    verifiedRental: true
  },
  {
    id: 'rev-4',
    productId: 'prod-8',
    authorId: 'user-1',
    authorName: 'Tanvir Hossain',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Rented the Apple Vision Pro for an interactive client demo in Gulshan. Mehreen spent 10 minutes helping me calibrate the eye tracking. The spatial audio and 4K micro-OLED blew everyone away.',
    verifiedRental: true
  },
  {
    id: 'rev-5',
    productId: 'prod-4',
    authorId: 'user-5',
    authorName: 'Zayan Karim',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '5 days ago',
    comment: 'Steam Deck OLED is super lightweight and the screen is pure vibrant magic. Dock worked right away with the TV in Banani. Highly recommend renting from Shakib!',
    verifiedRental: true
  },
  {
    id: 'rev-6',
    productId: 'prod-20',
    authorId: 'user-10',
    authorName: 'Sabrina Mumtaz',
    authorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '1 week ago',
    comment: 'The Leica Q3 is pure art. Incredible 60MP resolution and the 28mm f/1.7 lens has that creamy Leica rendering for Old Dhaka street portraits. Raisa is a wonderful host.',
    verifiedRental: true
  }
];

export const mockCategories = [
  { id: 'all', label: 'All Gear', icon: '✨', count: 20 },
  { id: 'cameras', label: 'Cameras & Rigs', icon: '📷', count: 5 },
  { id: 'drones', label: 'Drones & Aerial', icon: '🚁', count: 2 },
  { id: 'action-cams', label: 'Action Cams', icon: '🏄‍♂️', count: 2 },
  { id: 'gaming', label: 'Gaming Consoles', icon: '🎮', count: 2 },
  { id: 'vr', label: 'VR & Spatial', icon: '🥽', count: 2 },
  { id: 'audio', label: 'Audio & Music', icon: '🎧', count: 3 },
  { id: 'tools', label: 'Tools & DIY', icon: '🛠️', count: 1 },
  { id: 'camping', label: 'Camping & Power', icon: '🏕️', count: 2 },
  { id: 'mobility', label: 'Bikes & Scooters', icon: '🚲', count: 2 },
  { id: 'tech', label: 'Satellite & Tech', icon: '📡', count: 1 }
];
