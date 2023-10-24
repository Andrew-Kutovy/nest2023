import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common";
import {UserService} from "./user.service";
import {UserCreateProfileDto} from "./dto/user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/list')
    async getAllUsers() {
        return this.userService.getAllUsers()
    }

    @Post('create')
    async createUserProfile(
        @Body() body: UserCreateProfileDto,
        @Res() res: any
    ) {
        const newUser = this.userService.createUser(body); // Создайте нового пользователя

        return res.status(HttpStatus.CREATED).json(newUser);
    }

    @Get('/:id')
    async getUserById(@Param('id') userId: string){
        return this.userService.getUserById(userId)
    }

    @Patch('/:id')
    async updateUserData(
      @Param('id') userId: string,
      @Body() updateData: Partial<UserCreateProfileDto>
    ){
        return this.userService.updateUserField(userId, updateData)
    }

    @Delete(':id')
    async deleteUserAccount(@Param('id') userId: string){
        const deletedUser = this.userService.deleteUser(userId);

        if (deletedUser) {
            return { message: 'User deleted successfully', user: deletedUser };
        } else {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }
}
