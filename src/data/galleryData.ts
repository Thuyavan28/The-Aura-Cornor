export interface GalleryItem {
  id: string;
  title: string;
  handwrittenCaption: string;
  category?: string;
  imageUrl: string;
  date: string;
  time?: string;
  location: string;
  likes: number;
  tags: string[];
  rotation: number; // slight natural tilt in degrees
  backNote: string;
  storyDetails?: string;
  photographer?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Signature Cozy Corner',
    handwrittenCaption: 'Our quiet corner ~ table 04 ☕✨',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    date: 'Oct 14, 2024',
    time: '4:15 PM',
    location: 'Inside Lounge • Table 04',
    likes: 142,
    tags: ['Cozy Corner', 'Warm Glow', 'Peaceful Vibe'],
    rotation: -2.5,
    backNote: 'Where stories unfold over endless warm cups. Natural daylight streaming through the window.',
    storyDetails: 'A peaceful sanctuary designed for slow afternoons, deep conversations, and favorite books.',
    photographer: 'Aura Memories Team',
  },
  {
    id: 'gal-2',
    title: 'Al Fresco Patio Evening Glow',
    handwrittenCaption: 'Golden hour on the terrace 🌿🌙',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    date: 'Nov 02, 2024',
    time: '6:45 PM',
    location: 'Open Patio Deck',
    likes: 189,
    tags: ['Outdoor Patio', 'Fairy Lights', 'Breeze'],
    rotation: 2,
    backNote: 'When the sun dips and the Edison fairy lights flicker on, the evening breeze hits just right.',
    storyDetails: 'Our botanical outdoor courtyard captures the cool Medavakkam breeze and evening vibes.',
    photographer: 'Visitor @ananya_clicks',
  },
  {
    id: 'gal-3',
    title: 'Velvety Handcrafted Latte Art',
    handwrittenCaption: 'Fresh roast & silky swan art 🦢',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    date: 'Nov 18, 2024',
    time: '11:00 AM',
    location: 'Espresso Bar',
    likes: 215,
    tags: ['Artisanal Coffee', 'Swan Latte', 'Arabica'],
    rotation: -1.5,
    backNote: 'Double shot 100% Arabica roasted weekly. Micro-foamed to silky velvety perfection.',
    storyDetails: 'Every cup is pulled with precision and served with handcrafted barista latte art.',
    photographer: 'Barista Vignesh',
  },
  {
    id: 'gal-4',
    title: 'Crispy Gourmet Loaded Fries',
    handwrittenCaption: 'Hot, cheesy & crispy crunch! 🍟🔥',
    imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    date: 'Dec 05, 2024',
    time: '7:20 PM',
    location: 'Aura Diner Table',
    likes: 278,
    tags: ['Bestseller', 'Cheesy Crunch', 'Peri Peri'],
    rotation: 2.8,
    backNote: 'Spiced, smothered in house garlic cheese sauce, crispy toppings & fresh aromatic herbs.',
    storyDetails: 'The crowd favorite. Freshly prepared to order so every single bite stays piping hot and crunchy.',
    photographer: 'Chef Karthik',
  },
  {
    id: 'gal-5',
    title: 'Laughter & Squad Reunion',
    handwrittenCaption: 'Weekend vibes & sweet smiles 🧋✨',
    imageUrl: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
    date: 'Dec 22, 2024',
    time: '8:45 PM',
    location: 'Community Lounge',
    likes: 310,
    tags: ['Squad Moments', 'Friendship', 'Good Times'],
    rotation: -2,
    backNote: '4 hours felt like 15 minutes in this lounge. Cherished memories made together!',
    storyDetails: 'The Aura Corner was created for genuine connections, shared laughs, and unforgettable moments.',
    photographer: 'Guest Share',
  },
  {
    id: 'gal-6',
    title: 'The Neon Aura & Ambient Glow',
    handwrittenCaption: 'Electric cyan midnight glow 💙⚡',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    date: 'Jan 10, 2025',
    time: '9:30 PM',
    location: 'Neon Lounge Wall',
    likes: 264,
    tags: ['Neon Wall', 'Aesthetic', 'Photo Spot'],
    rotation: 1.8,
    backNote: 'Our signature neon backdrop. Tuned for gorgeous aesthetic portrait photos without filters.',
    storyDetails: 'Custom neon typography echoing the calm, electric blue soul of The Aura Corner.',
    photographer: 'Aura Studio',
  },
  {
    id: 'gal-7',
    title: 'Lush Botanical Garden Pathway',
    handwrittenCaption: 'Step into calm from the city 🍃🚪',
    imageUrl: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80',
    date: 'Jan 28, 2025',
    time: '3:00 PM',
    location: 'Garden Entrance',
    likes: 198,
    tags: ['Botanical', 'Green Sanctuary', 'Entrance'],
    rotation: -2.2,
    backNote: 'Lined with monstera, fiddle figs and lush planters. Feel the pace of the day slow down.',
    storyDetails: 'A peaceful botanical walkway guiding you from the Medavakkam bustle into tranquility.',
    photographer: 'Team Aura',
  },
  {
    id: 'gal-8',
    title: 'Signature Brown Sugar Boba Tea',
    handwrittenCaption: 'Chewy pearls & fresh brewed tea 🧋❄️',
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    date: 'Feb 14, 2025',
    time: '5:10 PM',
    location: 'Beverage Bar',
    likes: 242,
    tags: ['Boba Love', 'Brown Sugar', 'Refreshing'],
    rotation: 2.5,
    backNote: 'Cooked fresh every 3 hours for the ultimate bounciness and melt-in-mouth sweetness.',
    storyDetails: 'Infused with organic Ceylon tea, caramelized brown sugar glaze, and velvety milk.',
    photographer: 'Barista Vignesh',
  },
];
