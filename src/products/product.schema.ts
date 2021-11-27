import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, ObjectId} from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    _id: ObjectId

    @Prop([String])
    imageUrls: string[];

    @Prop()
    price: number;

    @Prop()
    title: string;

    @Prop()
    description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
