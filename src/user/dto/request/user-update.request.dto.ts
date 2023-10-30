import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserUpdateRequestDto {
  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString()
  userName?: string;

  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString()
  city?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
