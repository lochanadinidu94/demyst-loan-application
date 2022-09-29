import { Controller, Body, Res, Post } from '@nestjs/common';
import { UserService } from './user.service';

import { UserDto } from './dto/User.dto';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('create-user')
  createNewUser(@Body() userDto: UserDto) {
    return this.UserService.createNewUser(userDto);
  }
}
