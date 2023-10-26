import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserCreateProfileDto, UserUpdateDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private users = [
    // {
    //   id: '21',
    //   userName: 'Alex',
    //   email: 'alex23@gmail.com',
    //   city: 'Kyiv',
    //   age: 31,
    //   status: true,
    // },
  ];

  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(): Promise<UserCreateProfileDto[]> {
    return this.users;
  }
  async createUser(userData: UserCreateProfileDto) {
    const userEmail = userData.email.trim();
    const findUser = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (findUser) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    try {
      const newUser = this.userRepository.create(userData);
      if (!userData.city) {
        newUser.city = 'Odessa';
      }
      return this.userRepository.save(newUser);
    } catch (err) {
      throw new HttpException('Create user failed', HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(userId: string) {
    const user = this.users.find((item) => item.id === userId);
    if (user) {
      return user;
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateUserField(userId: string, updateData: Partial<UserUpdateDto>) {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updateData };

    return this.users[userIndex];
  }

  async deleteUser(userId: string) {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const deletedUser = this.users.splice(userIndex, 1);

    return deletedUser[0];
  }
}
