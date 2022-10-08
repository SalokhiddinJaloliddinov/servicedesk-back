import { IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  class: string;

  @IsString()
  @IsOptional()
  output_fields: string;
}
