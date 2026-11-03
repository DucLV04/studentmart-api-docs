import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import type { User } from '../types';
import { CreateListingDto, UpdateListingDto } from './dto';
import { ListingsService } from './listings.service';

@ApiTags('Listings')
@Controller('api/listings')
export class ListingsController {
  constructor(private readonly service: ListingsService) {}

  @Get()
  @ApiQuery({ name: 'q', required: false }) @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'category', required: false }) @ApiQuery({ name: 'location', required: false })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  findAll(@Query() query: { q?: string; type?: string; category?: string; location?: string; maxPrice?: string }) {
    return this.service.findAll({ ...query, maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined });
  }

  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Post()
  @ApiBearerAuth() @UseGuards(AuthGuard)
  create(@Body() dto: CreateListingDto, @Req() request: { user: User }) { return this.service.create(dto, request.user); }

  @Patch(':id')
  @ApiBearerAuth() @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateListingDto, @Req() request: { user: User }) { return this.service.update(id, dto, request.user); }

  @Delete(':id')
  @ApiBearerAuth() @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @Req() request: { user: User }) { this.service.remove(id, request.user); }
}
