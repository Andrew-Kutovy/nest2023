import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserCreateProfileDto, UserUpdateDto } from "./dto/user.dto";

@Injectable()
export class UserService {
    private users = [
        {
            id:'21',
            userName:'Alex',
            city:'Kyiv',
            age:31,
            status: true
        }
    ];

    constructor() {}

    async getAllUsers(): Promise<UserCreateProfileDto[]>{
        return this.users
    }
    async createUser(userData: UserCreateProfileDto) {
        const id = (new Date().getMilliseconds() + 323).toString()
        const newUser = { id: id, ...userData };
        this.users.push(newUser);

        return newUser;
    }

    async getUserById(userId: string) {
        const user = this.users.find(item => item.id === userId);
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
