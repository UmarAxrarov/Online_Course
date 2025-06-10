import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class cDto {
    @ApiProperty({ type: "string" })
    @IsString()
    @MinLength(3)
    uz_name: string;
    @ApiProperty({ type: "string" })
    @IsString()
    @MinLength(3)
    ru_name: string;
    @ApiProperty({ type: "string" })
    @IsString()
    @MinLength(3)
    ua_name: string;
}