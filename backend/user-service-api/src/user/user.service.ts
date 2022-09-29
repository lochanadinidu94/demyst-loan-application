import { Injectable } from '@nestjs/common';

import { DbConnectionModule } from './db/db-connection.module';
import { UserDto } from './dto/User.dto';

@Injectable()
export class UserService {
  constructor(private dbConnection: DbConnectionModule) {}

  async createNewUser(userDto: UserDto) {
    const user = await this.dbConnection.createNewUser(userDto);
    if (Number(user) > 1) return user;
  }
}
