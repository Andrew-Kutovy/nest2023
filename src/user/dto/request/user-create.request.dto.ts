import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UserCreateRequestDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  userName: string;

  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  city?: string;

  @IsNumber()
  age: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
