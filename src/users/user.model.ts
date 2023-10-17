import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Matches, IsNotEmpty, IsEmail } from 'class-validator';

// export const UserSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     password: { type: String },
// });

// export interface User extends mongoose.Document {
//     id: string;
//     username: string;
//     password: string;
// }
@Schema()
export class User extends mongoose.Document {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export class UserDTO {
    @IsNotEmpty()
    @IsEmail()
    username: string;

    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g)
    password: string;
}// 