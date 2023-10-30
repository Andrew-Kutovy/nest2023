import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserCreateProfileDto {
  @IsString()
  userName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}

export class UserUpdateDto {
  userName: string;
  city: string;
  status: boolean;
}

export class UserCreateResponseDto {
  userName: string;
  email: string;
  city: string;
  age: number;
  status: boolean;
  createdAt: Date;
  id: string;
}

export class UserDeleteResponseDto {
  message: string;
  user?: {
    userName: string;
    email: string;
    city: string;
    age: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
}
