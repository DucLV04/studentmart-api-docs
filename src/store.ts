import { randomUUID } from 'node:crypto';
import type { Listing, User } from './types';

export const users: User[] = [
  {
    id: 'user-demo',
    name: 'Demo Student',
    email: 'demo@studentmart.local',
    password: 'demo1234',
    createdAt: new Date().toISOString(),
  },
];

export const listings: Listing[] = [
  {
    id: 'listing-demo',
    ownerId: 'user-demo',
    title: 'Bàn học gỗ nhỏ',
    description: 'Bàn học còn tốt, phù hợp phòng trọ sinh viên.',
    type: 'SALE',
    category: 'Furniture',
    location: 'KTX Khu B',
    price: 250000,
    status: 'OPEN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const newId = (): string => randomUUID();
