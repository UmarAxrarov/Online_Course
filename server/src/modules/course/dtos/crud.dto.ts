import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsEnum, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";
import { Categories } from "src/enum/categories.enum";

export class CreateDto {
  @IsString()
  @MinLength(4)
  title: string;

  @IsString()
  @MinLength(4)
  content: string;

  @IsString()
  @MinLength(4)
  link_or_number: string;
  @IsString()
  // @IsEnum(Categories, { each: true })
  categories_names: string;
  @IsOptional()
  files: {
    images: any[];
    videos: any[];
  };
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
    example: 'like_count',
    enum: ['like_count','id'],
  })
  @IsString()
  @IsIn(['like_count','id'])
  sortField: string;

  @ApiPropertyOptional({
    description: 'Saralash tartibi',
    example: 'asc',
    enum: ['asc', 'desc'],
  })
  @IsIn(['asc', 'desc'])
  sortOrder: string;
}