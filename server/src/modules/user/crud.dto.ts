import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsIn, IsInt, IsOptional, IsString, Min, MinLength } from "class-validator";
import { ClientRoles } from "src/enum/roles.enum";
export class CreateDto {
    @ApiProperty({
        type:"string",
    })
    @IsEmail()
    email: string;
    @ApiProperty({
        type:"string",
        enum: ClientRoles
    })
    @IsString()
    @IsEnum(ClientRoles)
    role: string;
}
export class findAllDto {
    @ApiProperty({
        type: 'number',
        required: false,
        default: 1,
    })
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    page: number;

    @ApiProperty({
        type: 'number',
        required: false,
        default: 10,
    })
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    limit: number;

    @ApiPropertyOptional({
        description: 'Saralash maydoni',
        example: 'id',
        enum: ['id', 'role'],
    })
    @IsString()
    @IsIn(['id', 'role'])
    sortField: string;

    @ApiPropertyOptional({
        description: 'Saralash tartibi',
        example: 'asc',
        enum: ['asc', 'desc'],
    })
    @IsIn(['asc', 'desc'])
    sortOrder: string;
}
export class UpdateDto {
    @ApiProperty({
        type:"string"
    })
    @IsOptional()
    @IsString()
    @MinLength(4)
    name?: string;
    @ApiProperty({
        type:"string"
    })
    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string;
    @ApiProperty({
        format:"binary"
    })
    @IsString()
    @IsOptional()
    imageUrl?: string;
}