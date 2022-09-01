import { Injectable } from '@nestjs/common';

import { UserDto } from '../dto/User.dto';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: 'postgres://avnadmin:AVNS_fYs0bOdZQ4QcK9DxIhF@pg-2094b5a0-dinidu-f001.aivencloud.com:18106/demyst_db?sslmode=require',
        },
    },
});

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
