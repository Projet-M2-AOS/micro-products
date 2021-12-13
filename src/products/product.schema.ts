import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, ObjectId} from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @ApiProperty({type: String, format: 'mongo-id',})
    _id: ObjectId

    @Prop([String])
    @ApiProperty({maxItems: 15})
    imageUrls: string[];

    @Prop()
    @ApiProperty({minimum: 0, maximum: 999999})
    price: number;

    @Prop()
    @ApiProperty({minLength: 1, maxLength: 255})
    title: string;

    @Prop()
    @ApiProperty()
    @ApiProperty({minLength: 1, maxLength: 999999})
    description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
