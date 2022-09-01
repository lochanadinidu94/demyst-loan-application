import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgres://avnadmin:AVNS_fYs0bOdZQ4QcK9DxIhF@pg-2094b5a0-dinidu-f001.aivencloud.com:18106/demyst_db?sslmode=require',
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
