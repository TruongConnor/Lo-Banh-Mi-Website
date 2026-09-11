export type CategoryType =
  | 'oven'
  | 'banh-mi'
  | 'treat'
  | 'croissant'
  | 'sweet-bread'
  | 'bakery-goods'
  | 'meats-veggies'
  | 'drinks';

export interface PriceSize {
  name: string;
  price: number;
  label?: string;
}

export interface MenuItem {
  id: string;
  category: CategoryType;
  subCategory?: 'savory' | 'sweet' | 'bundle' | 'croissant' | 'sweet-bread' | 'bakery' | 'deli' | 'coffee' | 'drinks';
  name: string;
  vietnameseName?: string;
  subtitle?: string;
  price: number;
  unitText?: string;
  description?: string;
  popular?: boolean;
  signature?: boolean;
  tags?: string[];
  ingredients?: string[];
  flavors?: string[];
  sizes?: PriceSize[];
  addOns?: { name: string; price: number }[];
  scheduleNote?: string;
  image?: string;
  altImages?: string[];
}

export interface BakeryInfo {
  name: string;
  subtitle: string;
  slogan: string;
  subheading: string;
  address: string;
  cityStateZip: string;
  phone: string;
  hours: string;
  closedDay: string;
  bakingSchedule: string;
  socials?: {
    facebook?: string;
    instagram?: string;
  };
}
