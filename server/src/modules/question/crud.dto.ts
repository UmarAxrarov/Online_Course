import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class createDto {
    @ApiProperty({
        type:"string"
    })
    @IsString()
    content:string;
    @ApiProperty({
        type:"boolean"
    })
    @IsBoolean()
    is_correct:boolean;
}