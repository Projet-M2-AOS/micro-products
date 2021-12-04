import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Product, ProductDocument} from "./product.schema";
import {Model, ObjectId} from "mongoose";
import {CreateProductDto} from "./dto/create.product.dto";

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

    update(id: ObjectId, partialProduct: Partial<Product>) {
        return this.productModel.findByIdAndUpdate(id, partialProduct).exec()
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findById(id: ObjectId): Promise<Product> {
        return this.productModel.findById(id).exec();
    }
}
