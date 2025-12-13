export type Category = 'LIVESTOCK' | 'MEAT' | 'DAIRY';

export type Species = 'CATTLE' | 'SHEEP' | 'GOAT' | 'HORSE' | 'CAMEL' | 'OTHER';
export type Gender = 'MALE' | 'FEMALE';
export type AgeUnit = 'MONTHS' | 'YEARS';

export interface Listing {
  id: string;
  type: Category;
  createdAt: number;
  contact: {
    name: string;
    phone: string;
    time: string;
  };
  location: string;
  price: number;
  priceUnit: string; // 'head', 'kg', 'liter'
  hasDelivery: boolean;
  description?: string; // Auto-generated summary
  
  // Specific fields based on type
  livestock?: {
    species: Species;
    breedCategory: string; // Type/Category
    gender: Gender;
    age: number;
    ageUnit: AgeUnit;
    quantity: number;
    weight?: number; // Average weight
    isPregnant?: boolean;
    withOffspring?: boolean;
    isCastrated?: boolean;
    isBreeding?: boolean; // Plemennoy
    hasVetDocs: boolean;
    hasTags: boolean;
  };
  meat?: {
    meatType: string;
    format: string; // carcass, cut, mince
    weight: number;
    isFrozen: boolean;
    packaging: string;
  };
  dairy?: {
    productType: string;
    volume: number;
    period: 'DAY' | 'WEEK';
    fatContent?: number;
    container: string;
  };
}

export type ViewState = 
  | 'HOME' 
  | 'SELLER_HUB' 
  | 'SELLER_FORM_LIVESTOCK' 
  | 'SELLER_FORM_MEAT' 
  | 'SELLER_FORM_DAIRY' 
  | 'BUYER_HUB' 
  | 'BUYER_LIST' 
  | 'SAVED';

export type FilterState = {
  category: Category;
  species?: Species;
  priceMax?: number;
  location?: string;
};