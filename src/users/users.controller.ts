import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller("users")
export class UsersController {
  constructor(private readonly UserService: UsersService) { }

  @Post("register")
  registerUser(@Body('username') username: string, @Body('password') password) {
    return this.UserService.registerUser(username, password);
  }

  @Post("login")
  loginUsers(@Body('username') username: string, @Body('password') password) {
    return this.UserService.loginUsers(username, password);
  }

}
