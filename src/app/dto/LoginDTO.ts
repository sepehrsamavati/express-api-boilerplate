import { Expose, Type } from "class-transformer";
import { IsString, MaxLength, IsDefined } from "class-validator";

export default class LoginDTO {
    @Expose()
    @Type(() => String)
    @IsDefined()
    @IsString()
    @MaxLength(32)
    username!: string;

    @Expose()
    @Type(() => String)
    @IsDefined()
    @IsString()
    @MaxLength(64)
    password!: string;
}
