import { Expose, Type } from "class-transformer";
import { IsString, MaxLength, IsDefined, IsInt, Max, Min } from "class-validator";

export default class CreateProductDTO {
    @Expose()
    @Type(() => String)
    @IsDefined()
    @IsString()
    @MaxLength(50)
    id!: string;

    @Expose()
    @Type(() => String)
    @IsDefined()
    @IsString()
    @MaxLength(50)
    name!: string;

    @Expose()
    @Type(() => Number)
    @IsDefined()
    @IsInt()
    @Min(0)
    @Max(999)
    price!: number;
}
