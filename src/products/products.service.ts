import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Product, ProductDocument} from "./product.schema";
import {FilterQuery, Model, ObjectId} from "mongoose";
import {CreateProductDto} from "./dto/create.product.dto";
import {UpdateProductDto} from "./dto/update.product.dto";

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
    }

    async create(createProductType: CreateProductDto): Promise<Product> {
        const createdProduct = new this.productModel(createProductType);
        return createdProduct.save();
    }

    async createMany(createManyProductType: CreateProductDto[]): Promise<Product[]> {
        return this.productModel.insertMany(createManyProductType);
    }

    delete(id: ObjectId) {
        return this.productModel.findByIdAndDelete(id).exec()
    }

    update(id: ObjectId, partialProduct: UpdateProductDto) {
        return this.productModel.findByIdAndUpdate(id, partialProduct).exec()
    }

    async find(filter: FilterQuery<ProductDocument>): Promise<Product[]> {
        return this.productModel.find(filter).exec();
    }

    async findById(id: ObjectId): Promise<Product> {
        return this.productModel.findById(id).exec();
    }
}
