import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { NotNullPipe } from 'src/pipes/NotNullPipe';
import { ProductDTO } from 'src/products/product.model'

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    // @Post()
    // async addProduct(
    //     @Body('title') prodTitle: string,
    //     @Body('description') prodDesc: string,
    //     @Body('price') prodPrice: number,
    // ) {
    //     const generatedId = await this.productsService.insertProduct(
    //         prodTitle,
    //         prodDesc,
    //         prodPrice,
    //     );
    //     return { id: generatedId, message: 'Add successfully!' };
    // }


    @Post()
    async addProduct(
        @Body() ProductDTO: ProductDTO,
    ) {
        const generatedId = await this.productsService.insertProduct(
            ProductDTO
        );
        return { id: generatedId, message: 'Add successfully!' };
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts();
        return {
            data: products,
            message: 'Get all products successfully!'
        };
    }

    @Get(':id')
    getProduct(@Param('id', NotNullPipe) prodId: string) {
        return this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id') // Patch sử dụng để update một phần của resource
    async updateProduct(
        @Param('id', NotNullPipe) prodId: string,
        @Body() ProductDTO: ProductDTO,
    ) {
        await this.productsService.updateProduct(ProductDTO, prodId);
        return { message: 'Update successfully!' };
    }

    @Delete(':id')
    async removeProduct(@Param('id', NotNullPipe) prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return { message: 'Delete successfully!' };
    }
}