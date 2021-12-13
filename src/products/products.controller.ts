import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode, HttpException,
    HttpStatus,
    Param,
    ParseArrayPipe,
    Post,
    Put
} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {Product} from "./product.schema";
import {CreateProductDto} from "./dto/create.product.dto";
import {UpdateProductDto} from "./dto/update.product.dto";
import {ObjectId} from "mongoose";
import {ParseObjectIdPipe} from "../pipe/parse-mongoose-id.pipe";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('products')
@ApiTags('micro-products')
export class ProductsController {
    constructor(private productsService: ProductsService) {
    }

    @Get()
    @ApiOperation({
        summary: 'Get all products'
    })
    @ApiResponse({status: HttpStatus.OK, type: [Product]})
    getProducts(): Promise<Product[]> {
        return this.productsService.find({})
    }

    @Get(':idProduct')
    @ApiOperation({
        summary: 'Get product by id'
    })
    @ApiParam({
        name: 'idProduct',
        description: 'The id of the product you want to get',
        required: true,
        schema: {
            type: 'string'
        }
    })
    @ApiResponse({status: HttpStatus.OK, type: Product})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Invalid id supplied'})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Product not found'})
    async getProductById(@Param('idProduct', ParseObjectIdPipe) id: ObjectId): Promise<Product> {
        const product = await this.productsService.findById(id)

        if (!product) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }

        return product
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Create products'
    })
    @ApiBody({type: [CreateProductDto]})
    @ApiResponse({status: HttpStatus.OK, type: [Product], description: 'The products created'})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Invalid schema supplied'})
    async createProduct(@Body(new ParseArrayPipe({ items: CreateProductDto })) createProductDto: CreateProductDto[]) {
        try {
            return await this.productsService.createMany(createProductDto)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Put(':idProduct')
    @ApiOperation({
        summary: 'Update one product'
    })
    @ApiParam({
        name: 'idProduct',
        description: 'The id of the list you want to update',
        required: true,
        schema: {
            type: 'string'
        }
    })
    @ApiResponse({status: HttpStatus.OK, type: Product, description: 'The product updated'})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Invalid schema supplied'})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Product not found'})
    async updateProduct(@Param('idProduct', ParseObjectIdPipe) id: ObjectId, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
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
            await this.productsService.update(id, updateProductDto)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }

        return this.productsService.findById(id)
    }

    @Delete(':idProduct')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Delete one product'
    })
    @ApiParam({
        name: 'idProduct',
        description: 'The id of the list you want to delete',
        required: true,
        schema: {
            type: 'string'
        }
    })
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'Successfully deleted'})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Product not found'})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Invalid id supplied'})
    async deleteProduct(@Param('idProduct', ParseObjectIdPipe) id: ObjectId) {
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
