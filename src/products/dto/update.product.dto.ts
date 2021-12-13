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
import {ApiProperty} from "@nestjs/swagger";

export class UpdateProductDto {

    @IsOptional()
    @IsArray()
    @ArrayMaxSize(15)
    @IsUrl({each : true})
    @ApiProperty({required: false, maxItems: 15})
    imageUrls?: string[]

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(0)
    @Max(999999)
    @ApiProperty({required: false, minimum: 0, maximum: 999999})
    price?: number

    @IsOptional()
    @IsString()
    @Length(1, 255)
    @ApiProperty({required: false, minLength: 1, maxLength: 255})
    title?: string

    @IsOptional()
    @IsString()
    @Length(1)
    @ApiProperty({required: false, minLength: 1, maxLength: 999999})
    description?: string
}
