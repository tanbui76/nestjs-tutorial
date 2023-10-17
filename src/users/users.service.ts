import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';
@Injectable()
export class UsersService {

  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {

  }

  async registerUser(username: string, password: string) {
    const newUser = new this.userModel({
      username,
      password
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async loginUsers(username: string, password: string) {
    const getUser = await this.userModel.findOne({ username: username, password: password });
    if (getUser) {
      return { message: 'Login Successfull' };
    } else {
      return { message: 'Login Failed' };
    }
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    return result;
  }
}
