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

export class CreateProductDto {

    @IsNotEmpty()
    @IsArray()
    @ArrayMaxSize(15)
    @IsUrl({each : true})
    imageUrls: string[]

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(0)
    @Max(999999)
    price: number

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    title: string

    @IsNotEmpty()
    @IsString()
    @Length(1)
    description: string
}
