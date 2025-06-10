import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateDto {
    @IsString()
    @MinLength(20)
    title:string;
    @IsString()
    @MinLength(20)
    description:string;
    @IsOptional()
    files: {
        images:any[];
        audios:any[];
    }
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
    enum: ['id'],
  })
  @IsString()
  @IsIn(['id'])
  sortField: string;

  @ApiPropertyOptional({
    description: 'Saralash tartibi',
    example: 'asc',
    enum: ['asc', 'desc'],
  })
  @IsIn(['asc', 'desc'])
  sortOrder: string;
}