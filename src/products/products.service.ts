import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Product, ProductDocument} from "./product.schema";
import {Model} from "mongoose";

export type CreateProductType = {
    imageUrls: typeof Product.prototype.imageUrls,
    price: typeof Product.prototype.price,
    title: typeof Product.prototype.title,
    description: typeof Product.prototype.description
}

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
    }

    async create(createProductType: CreateProductType): Promise<Product> {
        const createdProduct = new this.productModel(createProductType);
        return createdProduct.save();
    }

    delete(id: string) {
        return this.productModel.findByIdAndDelete(id).exec()
    }

    update(id: string, partialProduct: Partial<Product>) {
        return this.productModel.findByIdAndUpdate(id, partialProduct).exec()
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findById(id: string): Promise<Product> {
        return this.productModel.findById(id).exec();
    }
}
