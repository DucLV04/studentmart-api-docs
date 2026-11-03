import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import type { ListingStatus, ListingType } from '../types';

export class CreateListingDto {
  @ApiProperty({ example: 'Bàn học gỗ nhỏ' }) @IsString() title!: string;
  @ApiProperty({ example: 'Bàn học còn tốt, phù hợp phòng trọ.' }) @IsString() description!: string;
  @ApiProperty({ enum: ['SALE', 'WANTED', 'EXCHANGE'] }) @IsEnum(['SALE', 'WANTED', 'EXCHANGE']) type!: ListingType;
  @ApiProperty({ example: 'Furniture' }) @IsString() category!: string;
  @ApiProperty({ example: 'KTX Khu B' }) @IsString() location!: string;
  @ApiPropertyOptional({ example: 250000 }) @IsOptional() @IsNumber() @Min(0) price?: number;
}

export class UpdateListingDto {
  @ApiPropertyOptional() @IsOptional() @IsString() title?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() category?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() location?: string;
  @ApiPropertyOptional({ enum: ['OPEN', 'CLOSED', 'COMPLETED'] }) @IsOptional() @IsEnum(['OPEN', 'CLOSED', 'COMPLETED']) status?: ListingStatus;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) price?: number;
}
