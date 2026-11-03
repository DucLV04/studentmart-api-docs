import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Nguyen Van A' }) @IsString() name!: string;
  @ApiProperty({ example: 'student@example.com' }) @IsEmail() email!: string;
  @ApiProperty({ example: 'secret123', minLength: 6 }) @IsString() @MinLength(6) password!: string;
}

export class LoginDto {
  @ApiProperty({ example: 'demo@studentmart.local' }) @IsEmail() email!: string;
  @ApiProperty({ example: 'demo1234' }) @IsString() password!: string;
}
