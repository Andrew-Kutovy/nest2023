import { UserEntity } from '../database/entities/user.entity';
import { UserDetailsResponseDto } from './dto/response/user-details.response.dto';

export class UserResponseMapper {
  static toDetailsDto(data: UserEntity): UserDetailsResponseDto {
    return {
      id: data.id,
      userName: data.userName,
      email: data.email,
      city: data.city,
      age: data.age,
      status: data.status,
      createdAt: data.createdAt,
    };
  }
}
