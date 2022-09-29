import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgres://avnadmin:AVNS_aIyojgqdaRW8fwFd9Sn@pg-1b871e70-service-4976.aivencloud.com:22640/loan_db?sslmode=require',
    },
  },
});

import { UpdateApplicationDto } from '../dto/UpdateApplication.dto';

@Injectable()
export class DbConnectionModule {
  async createNewApplicationData() {
    try {
      const newApplication = await prisma.application.create({
        data: {
          userId: '',
          states: 'not-completed',
        },
      });
      return newApplication.id;
    } catch (e) {
      console.error(e);
    }
  }

  async updateApplication(updateApplication: UpdateApplicationDto) {
    try {
      const updatedApplication = await prisma.application.update({
        where: {
          id: Number(updateApplication.id),
        },
        data: {
          userId: updateApplication.userId + '',
        },
      });
      return updatedApplication;
    } catch (e) {
      console.error(e);
    }
  }
}
