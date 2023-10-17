import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
}); // Định nghĩa một schema cho collection Product

export interface Product extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    price: number;
} // provider