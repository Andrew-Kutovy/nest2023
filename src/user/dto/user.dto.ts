import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateProfileDto {
  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty({ required: true, example: 'userTest@gmail.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, example: 'Lviv' })
  city: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  status: boolean;
}

export class UserUpdateDto {
  userName: string;
  city: string;
  status: boolean;
}
