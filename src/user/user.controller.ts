import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserResponseMapper } from './user.response.mapper';
import { UserDetailsResponseDto } from './dto/response/user-details.response.dto';
import { UserUpdateRequestDto } from './dto/request/user-update.request.dto';
import { UserCreateRequestDto } from './dto/request/user-create.request.dto';
import { UsersListResponseDto } from './dto/response/users-list.response.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  async getAllUsers(): Promise<UsersListResponseDto[]> {
    return await this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Create new user' })
  @Post('create')
  async createUserProfile(
    @Body() body: UserCreateRequestDto,
  ): Promise<UserDetailsResponseDto> {
    const result = await this.userService.createUser(body);
    return UserResponseMapper.toDetailsDto(result);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @UseGuards(AuthGuard())
  @Get(':userId')
  async getUserById(
    @Param('userId') userId: string,
  ): Promise<UserDetailsResponseDto> {
    const result = await this.userService.getUserById(userId);
    return UserResponseMapper.toDetailsDto(result);
  }

  @ApiOperation({ summary: 'Update user by id' })
  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() body: UserUpdateRequestDto,
  ): Promise<UserDetailsResponseDto> {
    const result = await this.userService.updateUser(userId, body);
    return UserResponseMapper.toDetailsDto(result);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user by id' })
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.userService.deleteUser(userId);
  }
}
