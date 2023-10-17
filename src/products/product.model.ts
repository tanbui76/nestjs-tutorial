import * as mongoose from 'mongoose';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// export const ProductSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String },
//     price: { type: Number, required: true },
// }); // Định nghĩa một schema cho collection Product

// export interface Product extends mongoose.Document {
//     id: string;
//     title: string;
//     description: string;
//     price: number;
// } // provider

@Schema()
export class Product extends mongoose.Document {

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    price: number; // pipe validation buộc là giá trị number và bắt buộc phải có giá trị
}

export const ProductSchema = SchemaFactory.createForClass(Product);// Định nghĩa một schema cho collection Product

export class ProductDTO {

    @IsNotEmpty()
    title: string;

    description: string;

    @IsNotEmpty()
    @IsNumberString()
    price: number; // pipe validation buộc là giá trị number và bắt buộc phải có giá trị
}
