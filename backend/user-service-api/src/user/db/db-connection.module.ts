import { Injectable } from '@nestjs/common';

import { UserDto } from '../dto/User.dto';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgres://avnadmin:AVNS_aIyojgqdaRW8fwFd9Sn@pg-1b871e70-service-4976.aivencloud.com:22640/loan_db?sslmode=require',
    },
  },
});

@Injectable()
export class DbConnectionModule {
  async createNewUser(userDto: UserDto) {
    try {
      const newUser = await prisma.user.create({
        data: {
          name: userDto.userName,
          email: userDto.userEmail,
          mobile: userDto.userMobile,
        },
      });

      return newUser.id;
    } catch (e) {
      console.error(e);
    }
  }
}
