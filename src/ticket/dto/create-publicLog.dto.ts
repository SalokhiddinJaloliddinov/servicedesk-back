import { IsNumber, IsString } from 'class-validator';

export class CreatePublicLogDto {
  @IsNumber()
  key: number;

  @IsString()
  finalclass: string;

  @IsString()
  message: string;
}
