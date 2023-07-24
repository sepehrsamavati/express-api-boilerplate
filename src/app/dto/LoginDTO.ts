import { Type } from "class-transformer";
import { IsString, MaxLength, IsDefined } from "class-validator";

export default class LoginDTO {
    @Type(() => String)
    @IsDefined()
    @IsString()
    @MaxLength(32)
    username!: string;

    @Type(() => String)
    @IsDefined()
    @IsString()
    @MaxLength(64)
    password!: string;
}
