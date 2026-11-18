import { IsString, MaxLength } from 'class-validator';

export class CreateWorkDto {
  @IsString()
  @MaxLength(500)
  text: string;
}
