import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'mnr-001',
    name: 'The Minimalist Trench',
    price: 295,
    category: 'Outerwear',
    image: 'https://picsum.photos/800/1000?random=1',
    description: 'A timeless staple crafted from water-resistant organic cotton. Features a relaxed silhouette perfect for layering.',
    features: ['Organic Cotton', 'Water Resistant', 'Belted Waist']
  },
  {
    id: 'mnr-002',
    name: 'Silk Noir Blouse',
    price: 180,
    category: 'Tops',
    image: 'https://picsum.photos/800/1000?random=2',
    description: '100% Mulberry silk blouse with a deep V-neck and elongated cuffs. The epitome of effortless elegance.',
    features: ['100% Silk', 'French Seams', 'Mother of Pearl Buttons']
  },
  {
    id: 'mnr-003',
    name: 'Pleated Wool Trousers',
    price: 220,
    category: 'Bottoms',
    image: 'https://picsum.photos/800/1000?random=3',
    description: 'High-waisted tailored trousers made from Italian wool. Features sharp pleats and a wide-leg cut.',
    features: ['Italian Wool', 'High-waisted', 'Wide Leg']
  },
  {
    id: 'mnr-004',
    name: 'Structure Leather Tote',
    price: 450,
    category: 'Accessories',
    image: 'https://picsum.photos/800/1000?random=4',
    description: 'Vegetable-tanned leather tote with a rigid structure and gold hardware accents. Fits a 15-inch laptop.',
    features: ['Full Grain Leather', 'Gold Hardware', 'Laptop Compartment']
  },
  {
    id: 'mnr-005',
    name: 'Cashmere Lounge Set',
    price: 380,
    category: 'Loungewear',
    image: 'https://picsum.photos/800/1000?random=5',
    description: 'Ultra-soft cashmere blend crewneck and joggers. Designed for luxurious comfort at home or travel.',
    features: ['Cashmere Blend', 'Ribbed Cuffs', 'Relaxed Fit']
  },
  {
    id: 'mnr-006',
    name: 'Signature Gold Hoops',
    price: 120,
    category: 'Jewelry',
    image: 'https://picsum.photos/800/1000?random=6',
    description: '18k gold vermeil hoops with a unique twisted texture. Lightweight enough for everyday wear.',
    features: ['18k Gold Vermeil', 'Hypoallergenic', 'Lightweight']
  },
];

export const APP_NAME = "MNR Brand Store";
