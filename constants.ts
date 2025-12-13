import { Listing, Species, Category } from './types';

export const SPECIES_LABELS: Record<Species, string> = {
  CATTLE: 'КРС (Коровы)',
  SHEEP: 'Овцы',
  GOAT: 'Козы',
  HORSE: 'Лошади',
  CAMEL: 'Верблюды',
  OTHER: 'Другое',
};

export const SPECIES_ICONS: Record<Species, string> = {
  CATTLE: '🐄',
  SHEEP: '🐑',
  GOAT: '🐐',
  HORSE: '🐎',
  CAMEL: '🐪',
  OTHER: '🐾',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  LIVESTOCK: 'Живой скот',
  MEAT: 'Мясо',
  DAIRY: 'Молочные продукты',
};

// Initial Mock Data for "Marketplace" feel
export const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    type: 'LIVESTOCK',
    createdAt: Date.now(),
    contact: { name: 'Ерлан', phone: '+7 701 111 22 33', time: '9:00 - 20:00' },
    location: 'Алматинская обл., Жамбылский р-н',
    price: 350000,
    priceUnit: 'голова',
    hasDelivery: true,
    description: 'КРС • Самка • 3 года',
    livestock: {
      species: 'CATTLE',
      breedCategory: 'Корова',
      gender: 'FEMALE',
      age: 3,
      ageUnit: 'YEARS',
      quantity: 5,
      hasVetDocs: true,
      hasTags: true,
      isPregnant: true,
    }
  },
  {
    id: '2',
    type: 'LIVESTOCK',
    createdAt: Date.now() - 100000,
    contact: { name: 'Серик', phone: '+7 777 000 99 88', time: 'Любое' },
    location: 'Туркестан',
    price: 45000,
    priceUnit: 'голова',
    hasDelivery: false,
    description: 'Овцы • Самка • 1.5 года',
    livestock: {
      species: 'SHEEP',
      breedCategory: 'Матка',
      gender: 'FEMALE',
      age: 1.5,
      ageUnit: 'YEARS',
      quantity: 50,
      hasVetDocs: true,
      hasTags: true,
    }
  },
  {
    id: '3',
    type: 'MEAT',
    createdAt: Date.now() - 500000,
    contact: { name: 'Айгуль', phone: '+7 702 333 44 55', time: 'Утро' },
    location: 'Астана',
    price: 2400,
    priceUnit: 'кг',
    hasDelivery: true,
    description: 'Конина • Согым',
    meat: {
      meatType: 'Конина',
      format: 'Туша',
      weight: 180,
      isFrozen: true,
      packaging: 'Без упаковки'
    }
  }
];