import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserUpdateDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from '../database/entities/user.entity';
import { UserCreateRequestDto } from './dto/request/user-create.request.dto';
import { UsersListResponseDto } from './dto/response/users-list.response.dto';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    @InjectRedisClient() private redisClient: RedisClient,
  ) {}

  public async getAllUsers(): Promise<UsersListResponseDto[]> {
    return this.userRepository.find();
  }

  public async createUser(dto: UserCreateRequestDto): Promise<UserEntity> {
    const findUser = await this.userRepository.findOneBy({
      email: dto.email,
    });
    if (findUser) {
      throw new BadRequestException('User already exist');
    }
    const newUser = this.userRepository.create(dto);
    if (!dto.city) {
      newUser.city = 'Odessa';
    }
    if (!dto.status) {
      newUser.status = false;
    }
    return this.userRepository.save(newUser);
  }

  public async getUserById(userId: string): Promise<UserEntity> {
    return await this.findUserByIdOrException(userId);
  }

  public async updateUser(
    userId: string,
    dto: Partial<UserUpdateDto>,
  ): Promise<UserEntity> {
    const entity = await this.findUserByIdOrException(userId);
    this.userRepository.merge(entity, dto);

    return await this.userRepository.save(entity);
  }

  public async deleteUser(userId: string): Promise<void> {
    const entity = await this.findUserByIdOrException(userId);

    await this.userRepository.remove(entity);
  }

  private async findUserByIdOrException(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnprocessableEntityException('User entity not found');
    } else {
      return user;
    }
  }

  async login(data: any) {
    const findUser = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (!findUser) {
      throw new HttpException(
        'Email or password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = await this.authService.signIn({
      id: findUser.id,
    });

    await this.redisClient.setEx(token, 10000, token);

    return { token };
  }
}
