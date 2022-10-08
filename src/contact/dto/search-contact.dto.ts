import { IsOptional, IsString } from 'class-validator';

export class SearchContactDto {
  @IsString()
  @IsOptional()
  search: string;

  @IsString()
  @IsOptional()
  page: string;

  @IsString()
  @IsOptional()
  limit: string;
}
