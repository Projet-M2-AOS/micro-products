import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode, HttpException,
    HttpStatus,
    Param,
    Post,
    Put
} from '@nestjs/common';
import {CreateProductType, ProductsService} from "./products.service";
import {Product} from "./product.schema";

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {
    }

    @Get()
    getAllProducts(): Promise<Product[]> {
        return this.productsService.findAll()
    }

    @Get(':idProduct')
    async getProductById(@Param('idProduct') id: string): Promise<Product> {
        const product = await this.productsService.findById(id)

        if (!product) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }

        return product
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createProduct(@Body() createdProduct: CreateProductType) {
        try {
            return await this.productsService.create(createdProduct)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Put(':idProduct')
    async updateProduct(@Param('idProduct') id: string, @Body() partialProduct: Partial<Product>): Promise<Product> {
        let product: Product;

        try {
            product = await this.productsService.findById(id)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }

        if (!product) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }

        try {
            await this.productsService.update(id, partialProduct)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }

        return this.productsService.findById(id)
    }

    @Delete(':idProduct')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteProduct(@Param('idProduct') id: string) {
        let product: Product;
        try {
            product = await this.productsService.findById(id)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }


        if (!product) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }

        await this.productsService.delete(id)
    }
}