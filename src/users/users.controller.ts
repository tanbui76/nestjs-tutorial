import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ValidationPipe,
  UsePipes
} from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { UsersService } from './users.service';
import { UserDTO } from './user.model';

@Controller("users")
export class UsersController {
  constructor(private readonly UserService: UsersService) { }

  // @Post("register")
  // @UsePipes(ValidationPipe)
  // registerUser(@Body('username')  username: string, @Body('password') password) {
  //   return this.UserService.registerUser(username, password);
  // }

  @Post("register")
  @UsePipes(ValidationPipe)
  registerUser(@Body() UserDTO: UserDTO) {
    return this.UserService.registerUser(UserDTO);
  }


  @Post("login")
  loginUsers(@Body('username') username: string, @Body('password') password) {
    return this.UserService.loginUsers(username, password);
  }

}
