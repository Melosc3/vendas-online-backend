import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';
import { PrismaService } from 'src/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const saltOrRounds = 10;

        const passwordHashed = await hash(createUserDto.password, saltOrRounds);

        const user = {
            id: randomUUID(),
            ...createUserDto,
            password: passwordHashed,
        };

        return this.prisma.user.create({
          data: user
        })
        
    }

    // async getAllUser(): Promise<User []> {
    //     return this.prisma.user.find()
    // }
}
