import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateProfileDto, UserUpdateDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/list')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Post('create')
  async createUserProfile(@Body() body: UserCreateProfileDto, @Res() res: any) {
    try {
      const newUser = await this.userService.createUser(body);
      const responseMessage = `User with id: ${newUser.id} created successfully`;
      return res
        .status(HttpStatus.CREATED)
        .json({ message: responseMessage, user: newUser });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'User creation failed', error: error.message });
    }
  }

  @Patch('/:id')
  async updateUserData(
    @Param('id') userId: string,
    @Body() updateData: Partial<UserUpdateDto>,
  ) {
    return this.userService.updateUserField(userId, updateData);
  }

  @Delete(':id')
  async deleteUserAccount(@Param('id') userId: string) {
    try {
      const deletedUser = await this.userService.deleteUser(userId);
      return {
        message: `User with id: ${deletedUser.id} deleted successfully`,
        user: deletedUser,
      };
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
