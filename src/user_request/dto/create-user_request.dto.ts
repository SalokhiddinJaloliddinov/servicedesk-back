import { IsNumber, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @IsString()
  title: string;

  description: string;

  @IsNumber()
  caller_id: number;
}
