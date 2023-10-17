import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IsNotEmpty, IsNumberString } from 'class-validator';

import { Product, ProductDTO } from './product.model';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
    ) { }

    async insertProduct(ProductDTO: ProductDTO) {
        const { title, description, price } = ProductDTO;
        const newProduct = new this.productModel({
            title,
            description,
            price,
        });
        const result = await newProduct.save();
        return result._id;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();

        return products.map(prod => ({
            id: prod._id,
            title: prod.title,
            description: prod.description,
            price: prod.price,
        }));
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        return {
            id: product._id,
            title: product.title,
            description: product.description,
            price: product.price,
        };
    }

    // async updateProduct(
    //     productId: string,
    //     title: string,
    //     desc: string,
    //     price: number,
    // ) {
    //     const updatedProduct = await this.findProduct(productId);
    //     if (title) {
    //         updatedProduct.title = title;
    //     }
    //     if (desc) {
    //         updatedProduct.description = desc;
    //     }
    //     if (price) {
    //         updatedProduct.price = price;
    //     }
    //     updatedProduct.save();
    // }

    async updateProduct(
        ProductDTO: ProductDTO, productId: string,
    ) {

        const { title, description, price } = ProductDTO;
        const updatedProduct = await this.findProduct(productId);
        if (title) {
            updatedProduct.title = title;
        }
        if (description) {
            updatedProduct.description = description;
        }
        if (price) {
            updatedProduct.price = price;
        }
        updatedProduct.save();
    }

    async deleteProduct(prodId: string) {
        const result = await this.productModel.deleteOne({ _id: prodId }).exec();
        console.log(result);

    }

    async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id).exec();
            // console.log(product.to);
        } catch (error) {
            throw new NotFoundException('Could not find product.');
        }
        if (!product) {
            throw new NotFoundException('Could not find product.');
        }
        return product;
    }
}