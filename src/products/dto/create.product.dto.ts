import {
    ArrayMaxSize,
    IsNotEmpty,
    IsArray,
    IsNumber,
    Min,
    Max,
    Length,
    IsString,
    IsPositive,
    IsUrl
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateProductDto {
    @IsNotEmpty()
    @IsArray()
    @ArrayMaxSize(15)
    @IsUrl({}, {each: true})
    @ApiProperty({maxItems: 15})
    imageUrls: string[]

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(0)
    @Max(999999)
    @ApiProperty({minimum: 0, maximum: 999999})
    price: number

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    @ApiProperty({minLength: 1, maxLength: 255})
    title: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 999999)
    @ApiProperty({minLength: 1, maxLength: 999999})
    description: string
}
