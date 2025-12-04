
import { Wifi, MapPin, Ticket, UserSquare2, Utensils, Briefcase, Smartphone, Heart, MessageSquare, ShoppingBag, Camera, Coins } from 'lucide-react';

export interface QrTemplate {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: 'Business' | 'Events' | 'Personal' | 'Utilities';
  config: {
    type: 'link' | 'texto' | 'whatsapp' | 'wifi' | 'email' | 'localizacao' | 'vcard';
    content: string;
    color: string;
    frame: string;
    label: string; // Text inside the frame if applicable
  };
}

export const qrTemplates: QrTemplate[] = [
  {
    id: 'wifi-guest',
    name: 'Guest Wi-Fi',
    description: 'Auto-connect guests to your network',
    icon: Wifi,
    category: 'Utilities',
    config: {
      type: 'wifi',
      content: 'WIFI:S:MyGuestNetwork;T:WPA;P:supersecret;;',
      color: '#ea580c', // Orange-600
      frame: 'scan_me',
      label: 'Connect to Wi-Fi'
    }
  },
  {
    id: 'biz-card-modern',
    name: 'vCard Profile',
    description: 'Share contact info instantly',
    icon: UserSquare2,
    category: 'Personal',
    config: {
      type: 'vcard',
      content: 'BEGIN:VCARD\nVERSION:3.0\nN:Silva;Ricardo\nORG:QRFlex SaaS\nTEL:+351999000999\nEMAIL:ricardo@qrflex.com\nEND:VCARD',
      color: '#2563eb', // Blue-600
      frame: 'phone',
      label: 'Save Contact'
    }
  },
  {
    id: 'event-ticket',
    name: 'Event Pass',
    description: 'Check-in ticket for attendees',
    icon: Ticket,
    category: 'Events',
    config: {
      type: 'link',
      content: 'https://qrflex.com/ticket/verify/123456',
      color: '#db2777', // Pink-600
      frame: 'ticket_stub',
      label: 'Admit One'
    }
  },
  {
    id: 'restaurant-menu',
    name: 'Digital Menu',
    description: 'Touchless menu for restaurants',
    icon: Utensils,
    category: 'Business',
    config: {
      type: 'link',
      content: 'https://qrflex.com/menu/bistro-central',
      color: '#16a34a', // Green-600
      frame: 'scan_me',
      label: 'Scan for Menu'
    }
  },
  {
    id: 'feedback-survey',
    name: 'Feedback Survey',
    description: 'Collect customer reviews',
    icon: MessageSquare,
    category: 'Business',
    config: {
      type: 'link',
      content: 'https://forms.google.com/your-form',
      color: '#8b5cf6', // Violet-500
      frame: 'scan_me',
      label: 'Rate Us'
    }
  },
  {
    id: 'store-coupon',
    name: 'Discount Coupon',
    description: 'Summer sale promo code',
    icon: ShoppingBag,
    category: 'Business',
    config: {
      type: 'texto',
      content: 'SUMMER2024',
      color: '#e11d48', // Rose-600
      frame: 'ticket_stub',
      label: '20% OFF'
    }
  },
  {
    id: 'office-location',
    name: 'Office Map',
    description: 'Google Maps direction to HQ',
    icon: MapPin,
    category: 'Business',
    config: {
      type: 'localizacao',
      content: '40.712776,-74.005974',
      color: '#dc2626', // Red-600
      frame: 'marker',
      label: 'Find Us'
    }
  },
  {
    id: 'social-instagram',
    name: 'Instagram',
    description: 'Follow us on social media',
    icon: Camera,
    category: 'Personal',
    config: {
      type: 'link',
      content: 'https://instagram.com/qrflex',
      color: '#d62976', // Instagram Pink
      frame: 'phone',
      label: 'Follow Us'
    }
  },
  {
    id: 'app-download',
    name: 'App Download',
    description: 'Universal link to your app',
    icon: Smartphone,
    category: 'Utilities',
    config: {
      type: 'link',
      content: 'https://qrflex.com/app',
      color: '#0f172a', // Slate-900
      frame: 'phone',
      label: 'Get the App'
    }
  },
  {
    id: 'wedding-invite',
    name: 'Wedding RSVP',
    description: 'Collect RSVPs easily',
    icon: Heart,
    category: 'Events',
    config: {
      type: 'link',
      content: 'https://qrflex.com/rsvp/alex-sam',
      color: '#be185d', // Pink-700
      frame: 'scan_me',
      label: 'RSVP Now'
    }
  },
  {
    id: 'linkedin-profile',
    name: 'LinkedIn',
    description: 'Grow your professional network',
    icon: Briefcase,
    category: 'Personal',
    config: {
      type: 'link',
      content: 'https://linkedin.com/in/username',
      color: '#0a66c2', // LinkedIn Blue
      frame: 'none',
      label: ''
    }
  },
  {
    id: 'crypto-wallet',
    name: 'Crypto Wallet',
    description: 'Receive Bitcoin payments',
    icon: Coins,
    category: 'Utilities',
    config: {
      type: 'texto',
      content: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      color: '#f59e0b', // Amber-500
      frame: 'none',
      label: ''
    }
  }
];
