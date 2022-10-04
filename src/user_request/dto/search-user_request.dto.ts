import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SearchUserRequestDto {
  @IsString()
  @IsOptional()
  page: string;

  @IsString()
  @IsOptional()
  limit: string;

  @IsString()
  @IsOptional()
  isCaller: string;

  @IsString()
  @IsOptional()
  isAgent: string;

  @IsString()
  @IsOptional()
  search: string;
}
