import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ProductsService } from './products/products.service';

// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({ path: '../.env' });

@Module({
  imports: [ProductsModule, UsersModule, MongooseModule.forRoot('mongodb+srv://buinguyennhattan12122002:12122002@cluster0.c4aj1as.mongodb.net/nestjs-db?retryWrites=true&w=majority&appName=AtlasApp')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
