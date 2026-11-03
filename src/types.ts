export type ListingType = 'SALE' | 'WANTED' | 'EXCHANGE';
export type ListingStatus = 'OPEN' | 'CLOSED' | 'COMPLETED';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Listing {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  type: ListingType;
  category: string;
  location: string;
  price?: number;
  status: ListingStatus;
  createdAt: string;
  updatedAt: string;
}
