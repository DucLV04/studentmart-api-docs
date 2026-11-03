import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { listings, newId } from '../store';
import type { Listing, User } from '../types';
import type { CreateListingDto, UpdateListingDto } from './dto';

@Injectable()
export class ListingsService {
  findAll(filters: { q?: string; type?: string; category?: string; location?: string; maxPrice?: number }) {
    const q = filters.q?.toLowerCase();
    const result = listings.filter((listing) => listing.status === 'OPEN'
      && (!q || `${listing.title} ${listing.description}`.toLowerCase().includes(q))
      && (!filters.type || listing.type === filters.type)
      && (!filters.category || listing.category.toLowerCase() === filters.category.toLowerCase())
      && (!filters.location || listing.location.toLowerCase().includes(filters.location.toLowerCase()))
      && (!filters.maxPrice || (listing.price !== undefined && listing.price <= filters.maxPrice)));
    return { data: result, count: result.length };
  }

  findOne(id: string) {
    const listing = listings.find((candidate) => candidate.id === id);
    if (!listing) throw new NotFoundException('Listing not found');
    return listing;
  }

  create(dto: CreateListingDto, user: User) {
    const now = new Date().toISOString();
    const listing: Listing = { id: newId(), ownerId: user.id, ...dto, status: 'OPEN', createdAt: now, updatedAt: now };
    listings.push(listing);
    return listing;
  }

  update(id: string, dto: UpdateListingDto, user: User) {
    const listing = this.findOne(id);
    if (listing.ownerId !== user.id) throw new ForbiddenException('Only the owner can update this listing');
    Object.assign(listing, dto, { updatedAt: new Date().toISOString() });
    return listing;
  }

  remove(id: string, user: User) {
    const index = listings.findIndex((candidate) => candidate.id === id);
    const listing = this.findOne(id);
    if (listing.ownerId !== user.id) throw new ForbiddenException('Only the owner can delete this listing');
    listings.splice(index, 1);
  }
}
