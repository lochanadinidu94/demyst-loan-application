import { Injectable } from '@nestjs/common';

import { UserDto } from '../dto/User.dto';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class DbConnectionModule {

    async createNewUser(userDto: UserDto){
        try {
            const newUser = await prisma.user.create({
                data: {
                    name: userDto.userName,
                    email: userDto.userEmail,
                    mobile: userDto.userMobile
                },
            });

            return newUser.id;
        } catch (e) {
            console.error(e);
        }
    }
}
