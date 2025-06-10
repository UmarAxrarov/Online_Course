import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @ApiProperty({
        example:"Toxir",
        required:true,
        type:"string"
    })
    @MinLength(4)
    @IsString()
    name:string;
    @ApiProperty({
        example:"toxir@gmail.com",
        required:true,
        type:"string"
    })
    @IsEmail()
    email:string;
    @ApiProperty({
        example:"toxir0000",
        required:true,
        type:"string"
    })
    @MinLength(6)
    @IsString()
    password:string;
    
}
export class LoginDto {
    @ApiProperty({
        example:"toxir@gmail.com",
        required:true,
        type:"string"
    })
    @IsEmail()
    email:string;
    @ApiProperty({
        example:"toxir0000",
        required:true,
        type:"string"
    })
    @MinLength(6)
    @IsString()
    password:string;
}