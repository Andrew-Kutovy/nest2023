import { UserDetailsResponseDto } from './user-details.response.dto';

export class UsersListResponseDto extends UserDetailsResponseDto {
  updatedAt: Date;
}
