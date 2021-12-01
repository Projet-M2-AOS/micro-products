import {
    ArrayMaxSize,
    IsArray,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUrl,
    Length,
    Max,
    Min
} from "class-validator";

export class UpdateProductDto {

    @IsOptional()
    @IsArray()
    @ArrayMaxSize(15)
    @IsUrl({each : true})
    imageUrls?: string[]

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(0)
    @Max(999999)
    price?: number

    @IsOptional()
    @IsString()
    @Length(1, 255)
    title?: string

    @IsOptional()
    @IsString()
    @Length(1)
    description?: string
}
