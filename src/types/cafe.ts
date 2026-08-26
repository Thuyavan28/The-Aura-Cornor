export type DietType = 'veg' | 'non-veg' | 'all';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  diet: 'veg' | 'non-veg';
  category: string;
  isBestseller?: boolean;
  description?: string;
  image?: string;
  tags?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  icon?: string;
  items: MenuItem[];
}

export interface ReviewItem {
  id: string;
  author: string;
  role?: string;
  stats?: string;
  rating: number;
  timeAgo: string;
  text: string;
  recommendedItems?: string[];
  avatarUrl?: string;
}

export interface SignaturePick {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  diet: 'veg' | 'non-veg';
  rating: number;
  image: string;
  description: string;
  bestseller: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
