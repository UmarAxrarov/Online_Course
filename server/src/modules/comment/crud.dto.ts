import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class createDto {
    @ApiProperty({
        type:"string"
    })
    @IsString()
    @MinLength(1)
    content:string;
}