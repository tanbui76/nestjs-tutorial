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
import { NotNullPipe } from 'src/pipes/NotNullPipe';
import { get } from 'http';
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

  @Get()
  getAllUsers() {
    return this.UserService.getAllUsers();
  }

  @Post("login")
  loginUsers(@Body('username', NotNullPipe) username: string, @Body('password', NotNullPipe) password) {
    return this.UserService.loginUsers(username, password);
  }

}
